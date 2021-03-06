import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';


@IonicPage()
@Component({
  selector: 'page-member-details',
  templateUrl: 'member-details.html',
})
export class MemberDetailsPage {
  @ViewChild('spinner') spinner: ElementRef;
  isLoading: boolean = true;
  details: any;
  partial_details: any;
  member_crews: any;
  current_trips: any;
  past_trips: any;
  vault_video: any;
  hasCrews: boolean = false;
  hasCurrent: boolean = false;
  hasPast: boolean = false;
  hasVideo: boolean = false;
 
  constructor(private platform: Platform, private epxProvider: EpxProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.partial_details = navParams.data.data;
    console.log('parameters',this.partial_details);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberDetailsPage');
    this.loadMemberDetails(this.partial_details.ID);
  }
  ionViewWillEnter(){
    let backAction = this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      backAction();
    },2);
  }
  loadMemberDetails(id) {
    this.epxProvider.getMemberDetails(id).subscribe(data => {
      this.details = data;
     
      var crews = this.details.crews;
      if (crews != null) {
        this.member_crews = Object.keys(crews).map(keys => crews[keys]);
        if(this.member_crews.length > 0){
          this.hasCrews = true;
        }
        console.log('crews: ', this.member_crews);
      }

      var current = this.details.current_trips;
      if (current != null) {
        this.current_trips = Object.keys(current).map(keys => current[keys]);
        console.log('current trips: ', this.current_trips);
        if(this.current_trips.length > 0){
          this.hasCurrent = true;
        }
      }

      var past = this.details.past_trips;
      if (past != null) {
        this.past_trips = Object.keys(past).map(keys => past[keys]);
        console.log('past trips: ', this.past_trips);
        if(this.past_trips.length > 0){
          this.hasPast = true;
        }
      }

      let video = this.details.vault;
      if(video != null){
        this.vault_video = Object.keys(video).map(key => video[key]);
        console.log('vault video: ', this.vault_video);
        if(this.vault_video.length > 0){
          this.hasVideo = true;
        }
      }
      this.isLoading = false;
      console.log('isLoading :',this.isLoading);
    },error =>{
      this.epxProvider.toastMessage('Internal Error!');
      this.isLoading = false;
    });
  }
  //Navigate to Trip Details
  tripDetails(trip) {
    console.log('trip details:', trip);
    let data = {
      ID: trip.ID,
      isInterested: trip.trip_interested.interested,
      sashes_image: trip.sashes_image,
      location: trip.map_info.map_address,
      lat: Number(trip.map_info.map_latitude),
      lng: Number(trip.map_info.map_longitude),
      product_cat: trip.product_cat,
      title: trip.title,
      trip_gallery: trip.trip_gallery,
      full_content: trip.full_content
    }   
    this.navCtrl.push('TripDetailsPage', { data: data });
  }
  //Navigate to Member Details
  memberDetails(member) {
    console.log('member details:', member);
    this.navCtrl.push('MemberDetailsPage', { data: member });
  }
  
  openBrowser(url){
    console.log('company url:',url);
    window.open(url,"_system");
  }
  vaultDetails(vault) {
    this.navCtrl.push('VaultDetailsPage', { data: vault });
  }
}
