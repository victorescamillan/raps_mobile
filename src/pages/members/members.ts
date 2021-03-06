import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, AlertController, Platform } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CacheService } from 'ionic-cache';
/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
  @ViewChild(Content) content: Content;
  @ViewChild('filter') filter: ElementRef;
  oldScrollTop = 0;
  members: any;
  isLoading: boolean = true;
  isRefresh: boolean = false;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  skillsList: any;
  industryList: any;
  skills: string;
  industry: string;
  isFilter: boolean = false;
  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
    private renderer: Renderer2,
    private events: Events,
    private epxProvider: EpxProvider,
    private cache: CacheService,
    public navCtrl: NavController, public navParams: NavParams) {
    // Keep our cached results when device is offline!
    cache.setOfflineInvalidate(false);
    // this.registerBackButton();
  }
  registerBackButton(){
    let backAction = this.platform.registerBackButtonAction((ev) => {
      console.log("event",ev);
      let x = this.navCtrl.parent.select(0);
      console.log("second",x);
      backAction();
    },2);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
    this.LoadMembers();
    this.loadSkillsIndustry();
  }
  LoadMembers(refresher?) {
    let url = this.epxProvider.member_infinite_url;
    let ttl = this.epxProvider.TTL;
    let delay_type = this.epxProvider.DELAY_TYPE;
    let groupKey = 'member-list';
    this.page = 1;
    let connected = this.epxProvider.isConnected();
    console.log('connected: ', connected);
    if (connected) {
      this.epxProvider.getMembersInfinite(this.page).subscribe(data => { //Get data from url/api
        let members = Observable.of(data.members);
        this.totalPage = data.number_of_page;
        if (refresher) {
          this.cache.loadFromDelayedObservable(url, members, groupKey, ttl, delay_type).subscribe(data => {
            this.members = Object.keys(data).map(key => data[key]);
            refresher.complete();
            this.loadSkillsIndustry();
            this.isFilter = false;
          });
        }
        else {
          this.cache.loadFromDelayedObservable(url, members, groupKey, ttl, delay_type).subscribe(data => {
            this.members = Object.keys(data).map(key => data[key]);
            console.log('members:', members);
          });
        }
        this.isLoading = false;
        this.isRefresh = true;
        this.epxProvider.updateNotification(this.epxProvider.MEMBER_BADGE);
      }, error => {
        console.log(error);
        this.epxProvider.toastMessage('Internal Server Error!')
      });
    }
    else {
      this.epxProvider.getData(url).then(data => {
        if (data != null) {
          let offline_data = Observable.of(data.value);
          console.log('offline data: ', offline_data);
          if (refresher) {
            this.cache.loadFromDelayedObservable(url, offline_data, groupKey, ttl, delay_type).subscribe(data => {
              this.members = data;
              refresher.complete();
            });
          }
          else {
            this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(data => {
              this.members = data;
            });
          }
          this.isLoading = false;
          this.isRefresh = true;
        }
        else {
          console.log('offline data: ', data);
          refresher.complete();
        }
      });
    }

  }
  //Show badge if there is an update
  ionViewDidEnter() {
    this.epxProvider.getData(this.epxProvider.MEMBER_BADGE).then(badge => {
      if (badge != null && badge > 0) {
        this.events.publish(this.epxProvider.MEMBER_BADGE, badge);
      }
    });
  }
  forceReload(refresher) {
    // this.LoadMembers(refresher);
    this.LoadMembers(refresher);
  }
  memberDetails(member) {
    this.navCtrl.push('MemberDetailsPage', { data: member });
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.epxProvider.getMembersInfinite(this.page + 1).subscribe(data => { //Get data from url/api
      let members = data.members;
      let temp = Object.keys(members).map(key => members[key]);
      for (let i = 0; i < temp.length; i++) {
        this.members.push(temp[i]);
      }
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
      this.page++;
    }, error => {
      infiniteScroll.complete();
      this.isLoading = false;
      this.isRefresh = true;
    });
  }
  openBrowser(url) {
    console.log('company url:', url);
    window.open(url, "_system");
  }
  ionSelected() {
    console.log('member selected', this.content.scrollTop);
    let topDistance = this.content.getContentDimensions().scrollTop;
    console.log('scroll top', topDistance);
    if (topDistance > 10) {
      this.content.scrollToTop();
    }
  }
  loadSkillsIndustry() {
    this.skills = '';
    this.industry = '';
    this.epxProvider.getMemberSkillsIndustry().subscribe(res => {
      console.log('getMemberSkillsIndustry', res);
      this.skillsList = res.skills;
      this.industryList = res.industry;
    }, error => {
      console.log('error: ', error);
    });
  }
  filterMembers() {
    if (this.skills === '' && this.industry === '' || this.skills == undefined && this.industry == undefined) {
      this.epxProvider.toastMessage('Please select skills or industry');
      return;
    }
    this.isFilter = true;
    this.isLoading = true;
    this.isRefresh = false;
    this.epxProvider.getMemberFilter(this.skills, this.industry).subscribe(res => {
      console.log('getMemberFilter', res);

      if (res.result === true) {
        let member: string[] = Object.keys(res.members).map(key => res.members[key]);
        this.members = member;
      }
      else {
        this.epxProvider.toastMessage('No results found!');
      }
      this.isLoading = false;
    }, error => {
      console.log('error: ', error);
      this.epxProvider.toastMessage('Internal error.')
      this.isLoading = false;
    })
  }
  onScroll(event) {
    if (event.scrollTop - this.oldScrollTop > 10) {
      this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
        console.log('scroll down',event.scrollTop - this.oldScrollTop)
    }
    else if (event.scrollTop - this.oldScrollTop < 0) {
      this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
      console.log('scroll up',event.scrollTop - this.oldScrollTop)
    }
    this.oldScrollTop = event.scrollTop;
  }
  searchMembers() {
    this.presentPrompt();
  }
  searchMembersByMap() {
    this.navCtrl.push('MemberMapPage');
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Member Search',
      inputs: [
        {
          name: 'name',
          placeholder: 'Input name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.isLoading = true;
            this.isRefresh = false;
            this.isFilter = true;
            if (data.name === '') {
              this.epxProvider.toastMessage('Please input name');
              this.isLoading = false;
              this.isFilter = false;
              return;
            }
            this.epxProvider.getMemberSearch(data.name, this.skills, this.industry).subscribe(res => {
              console.log('search result: ', res);
              if (res.result === true) {
                this.members = Object.keys(res.members).map(key => res.members[key]);
              }
              else {
                this.epxProvider.toastMessage('No results found.');
              }
              this.isLoading = false;
            }, error => {
              this.epxProvider.toastMessage('Internal error.');
              this.isLoading = false;
            });
          }
        }
      ]
    });
    alert.present();
  }
}
