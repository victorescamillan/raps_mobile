import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EpxProvider } from '../../providers/epx/epx';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the MemberDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-details',
  templateUrl: 'member-details.html',
})
export class MemberDetailsPage {
  isLoading:boolean = true;
  details: any;

  constructor(private epxProvider: EpxProvider,public navCtrl: NavController, public navParams: NavParams) {
    console.log('details: ', navParams.data);
    var param = navParams.data.data;
    this.loadMemberDetails(param.member_id);
  }
  loadMemberDetails(id) {
    this.epxProvider.getMemberDetails(id).subscribe(data => {
      this.details = data;
      console.log('member details:', this.details);
      this.isLoading = false;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberDetailsPage');
  }

}
