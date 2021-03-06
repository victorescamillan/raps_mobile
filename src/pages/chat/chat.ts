import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string='';
  messages: object[] = [];
  // _chatSubscription;
  // public db:AngularFireDatabase,
  isNotification: boolean = false;
  constructor(
    private viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {

    // this.username = this.navParams.get('username');
    // this._chatSubscription = db.list('chat').valueChanges().subscribe(data => {
    //   this.messages = data;
    // });
    this.isNotification = navParams.data.isNotification;
  }
  closeFilter(){
    this.viewCtrl.dismiss();
  }
  // sendMessage(){
  //   this.db.list('/chat').push({
  //     username: this.username,
  //     message: this.message
  //   }).then(()=>{
      
  //   });
  //   this.message = '';
  // }
  // ionViewWillLeave(){
  //   console.log('user is about to go.');
  //   this._chatSubscription.unsubscribe();
  //   this.db.list('/chat').push({
  //     specialMessage: true,
  //     message: this.username + ' has left the room'
  //   });
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    // this.db.list('/chat').push({
    //   specialMessage: true,
    //   message: this.username + ' has joined the room'
    // });
  }

}
