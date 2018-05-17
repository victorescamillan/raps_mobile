webpackJsonp([16],{

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(495);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuPageModule = (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenuPage = (function () {
    function MenuPage(events, appVersion, platform, alertCtrl, epxProvider, navCtrl, navParams) {
        var _this = this;
        this.events = events;
        this.appVersion = appVersion;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.epxProvider = epxProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.rootPage = 'TabsPage';
        this.mentorBadge = 0;
        this.assistBadge = 0;
        this.pages = [
            { title: 'Business', pageName: 'BusinessPage', tabComponent: 'BusinessPage', index: 0, icon: 'briefcase', badge: 0 },
            { title: 'Member Assist', pageName: 'AssistPage', tabComponent: 'AssistPage', index: 1, icon: 'hand', badge: this.mentorBadge },
            { title: 'Mentor Match', pageName: 'MentorPage', tabComponent: 'MentorPage', index: 2, icon: 'phone-portrait', badge: this.assistBadge },
            { title: 'Settings', pageName: 'SettingsPage', tabComponent: 'SettingsPage', index: 3, icon: 'settings', badge: 0 },
        ];
        this.epxProvider.getData('member_details').then(function (res) {
            _this.name = res.name;
            _this.role = res.role;
            _this.avatar_url = res.avatar;
            if (platform.is('cordova')) {
                appVersion.getVersionNumber().then(function (res) {
                    _this.version = res;
                    console.log('version', res);
                });
            }
            _this.details = res;
        });
    }
    MenuPage.prototype.memberDetails = function () {
        this.navCtrl.push('MemberDetailsPage', { data: this.details });
    };
    MenuPage.prototype.openPage = function (p) {
        var _this = this;
        this.navCtrl.push(p.pageName);
        var backAction = this.platform.registerBackButtonAction(function () {
            _this.navCtrl.pop();
            backAction();
        }, 2);
    };
    MenuPage.prototype.logoutUser = function () {
        this.epxProvider.clearUser();
        this.events.publish(this.epxProvider.IS_LOGIN_NOTIFICATION, 'false');
        this.navCtrl.setRoot('LoginPage');
    };
    MenuPage.prototype.showPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Do you want to continue logout?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Okay',
                    handler: function (data) {
                        _this.logoutUser();
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]) === "function" && _a || Object)
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"D:\epx_app\src\pages\menu\menu.html"*/'<ion-menu [content]="content" side="left">\n  <ion-header class="menu-header">\n    <!-- <ion-navbar>\n      <ion-title>menu</ion-title>\n    </ion-navbar> -->\n    <!-- <div class="user-info">\n      {{name}}\n    </div> -->\n  </ion-header>\n  <ion-content class="menu-content">\n    <div class="menu-icon">\n      <img src="./assets/imgs/epx_logo_colored.png" />\n    </div>\n    <div class="version">\n      <p>Version {{version}}</p>\n    </div>\n    <div class="user-avatar">\n      <img class="avatar" [src]="avatar_url" (click)="memberDetails()">\n    </div>\n    <div class="user-info">\n      <div class="info-content">\n          <p>{{name}}</p>\n          <p id="member-role">{{role | uppercase}} <span>(Member Type)</span></p>\n      </div>\n    </div>\n    <ion-list>\n      <ion-item menuClose *ngFor="let p of pages" (click)="openPage(p)">\n        <ion-icon name="{{p.icon}}" item-start></ion-icon>\n        {{p.title}}\n        <span class="{{p.badge > 0 ? \'badge-show\' : \'badge-hide\'}}">{{p.badge}}</span>\n      </ion-item>\n      <ion-item (click)="showPrompt()">\n        <ion-icon name="md-exit" item-start></ion-icon>\n        Logout\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav> -->\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"D:\epx_app\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__["a" /* AppVersion */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_version__["a" /* AppVersion */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _h || Object])
    ], MenuPage);
    return MenuPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=16.js.map