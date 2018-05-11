webpackJsonp([2],{

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VaultPageModule", function() { return VaultPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vault__ = __webpack_require__(508);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VaultPageModule = (function () {
    function VaultPageModule() {
    }
    VaultPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vault__["a" /* VaultPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vault__["a" /* VaultPage */]),
            ],
        })
    ], VaultPageModule);
    return VaultPageModule;
}());

//# sourceMappingURL=vault.module.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VaultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VaultPage = (function () {
    function VaultPage(platform, alertCtrl, renderer, events, loadingCtrl, epxProvider, cache, navCtrl) {
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.renderer = renderer;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.epxProvider = epxProvider;
        this.cache = cache;
        this.navCtrl = navCtrl;
        this.oldScrollTop = 0;
        this.isLoading = true;
        this.isRefresh = false;
        this.page = 1;
        this.perPage = 0;
        this.totalData = 0;
        this.totalPage = 0;
        this.skills = '';
        this.category = '';
        this.isFilter = false;
        // Keep our cached results when device is offline!
        cache.setOfflineInvalidate(false);
    }
    VaultPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.backAction = this.platform.registerBackButtonAction(function () {
            _this.navCtrl.parent.select(0);
            _this.backAction();
        }, 2);
    };
    VaultPage.prototype.ionViewWillLeave = function () {
        this.backAction();
    };
    VaultPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VaultPage');
        this.LoadVault();
        this.loadSkillsCategory();
    };
    VaultPage.prototype.vaultDetails = function (vault) {
        this.navCtrl.push('VaultDetailsPage', { data: vault });
    };
    VaultPage.prototype.LoadVault = function (refresher) {
        var _this = this;
        var url = this.epxProvider.vault_infinite_url;
        var ttl = this.epxProvider.TTL;
        var delay_type = this.epxProvider.DELAY_TYPE;
        var groupKey = 'vault-list';
        this.page = 1;
        var connected = this.epxProvider.isConnected();
        console.log('connected: ', connected);
        if (connected) {
            this.epxProvider.getVaultInfinite(this.epxProvider.PAGE_SIZE, this.page).subscribe(function (data) {
                var vault = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.vaults);
                _this.totalPage = data.number_of_page;
                console.log('vault list', vault);
                if (refresher) {
                    _this.cache.loadFromDelayedObservable(url, vault, groupKey, ttl, delay_type).subscribe(function (data) {
                        _this.vaultList = Object.keys(data).map(function (key) { return data[key]; });
                        refresher.complete();
                        _this.loadSkillsCategory();
                        _this.isFilter = false;
                    });
                }
                else {
                    _this.cache.loadFromObservable(url, vault, groupKey).subscribe(function (data) {
                        _this.vaultList = Object.keys(data).map(function (key) { return data[key]; });
                    });
                }
                _this.isLoading = false;
                _this.isRefresh = true;
                _this.epxProvider.updateNotification(_this.epxProvider.VAULT_BADGE);
            }, function (error) {
                console.log(error);
                _this.epxProvider.toastMessage('Internal Server Error!');
            });
        }
        else {
            this.epxProvider.getData(url).then(function (data) {
                if (data != null) {
                    var offline_data = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(data.value);
                    console.log('offline data: ', offline_data);
                    if (refresher) {
                        _this.cache.loadFromDelayedObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.vaultList = data;
                            refresher.complete();
                        });
                    }
                    else {
                        _this.cache.loadFromObservable(url, offline_data, groupKey).subscribe(function (data) {
                            _this.vaultList = data;
                        });
                    }
                    _this.isLoading = false;
                    _this.isRefresh = true;
                }
                else {
                    console.log('offline data: ', data);
                }
            });
        }
    };
    //Show badge if there is an update
    VaultPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.epxProvider.getData(this.epxProvider.VAULT_BADGE).then(function (badge) {
            if (badge != null && badge > 0) {
                _this.events.publish(_this.epxProvider.VAULT_BADGE, badge);
            }
        });
    };
    //Pull to refresh page
    VaultPage.prototype.forceReload = function (refresher) {
        this.LoadVault(refresher);
    };
    VaultPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        this.epxProvider.getVaultInfinite(this.epxProvider.PAGE_SIZE, this.page + 1).subscribe(function (data) {
            var vault = data.vaults;
            var temp = Object.keys(vault).map(function (key) { return vault[key]; });
            for (var i = 0; i < temp.length; i++) {
                _this.vaultList.push(temp[i]);
            }
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
            _this.page++;
            console.log('current page: ', _this.page);
        }, function (error) {
            infiniteScroll.complete();
            _this.isLoading = false;
            _this.isRefresh = true;
        });
    };
    VaultPage.prototype.ionSelected = function () {
        console.log('vault selected');
        var topDistance = this.content.getContentDimensions().scrollTop;
        console.log('scroll top', topDistance);
        if (topDistance > 10) {
            this.content.scrollToTop();
        }
    };
    VaultPage.prototype.loadSkillsCategory = function () {
        var _this = this;
        this.skills = '';
        this.category = '';
        this.epxProvider.getVaultSkillsCategory().subscribe(function (res) {
            console.log('initSkillsCategory', res);
            _this.skillsList = res.skills;
            _this.categoryList = res.category;
        });
    };
    VaultPage.prototype.filterVault = function () {
        var _this = this;
        if (this.skills === '' && this.category === '' || this.skills == undefined && this.category == undefined) {
            this.epxProvider.toastMessage('Please select skills or category');
            return;
        }
        this.isFilter = true;
        this.isLoading = true;
        this.isRefresh = false;
        this.epxProvider.getVaultFilters(this.skills, this.category).subscribe(function (res) {
            console.log('getVaultFilters', res);
            if (res.result === true) {
                var vault = Object.keys(res.data).map(function (key) { return res.data[key]; });
                _this.vaultList = vault;
            }
            else {
                _this.epxProvider.toastMessage('No results found!');
            }
            _this.isLoading = false;
        }, function (error) {
            console.log('error: ', error);
            _this.epxProvider.toastMessage('Internal error.');
            _this.isLoading = false;
        });
    };
    VaultPage.prototype.onScroll = function (event) {
        if (event.scrollTop <= 0) {
            this.renderer.removeClass(this.filter.nativeElement, 'overlay');
        }
        else if (event.scrollTop - this.oldScrollTop > 10) {
            this.renderer.addClass(this.filter.nativeElement, 'overlay');
            this.renderer.addClass(this.filter.nativeElement, 'hide-filter');
        }
        else if (event.scrollTop - this.oldScrollTop < 0) {
            this.renderer.removeClass(this.filter.nativeElement, 'hide-filter');
        }
        this.oldScrollTop = event.scrollTop;
    };
    VaultPage.prototype.searchVault = function () {
        this.presentPrompt();
    };
    VaultPage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Vault Search',
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function (data) {
                        _this.isLoading = true;
                        _this.isRefresh = false;
                        _this.isFilter = true;
                        if (data.name === '') {
                            _this.epxProvider.toastMessage('Please input name');
                            _this.isLoading = false;
                            _this.isFilter = false;
                            return;
                        }
                        _this.epxProvider.getVaultSearch(data.name).subscribe(function (res) {
                            console.log('search result: ', res);
                            if (res.result === true) {
                                _this.vaultList = Object.keys(res.data).map(function (key) { return res.data[key]; });
                            }
                            else {
                                _this.epxProvider.toastMessage('No results found.');
                            }
                            _this.isLoading = false;
                        }, function (error) {
                            _this.epxProvider.toastMessage('Internal error.');
                            _this.isLoading = false;
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], VaultPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('filter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], VaultPage.prototype, "filter", void 0);
    VaultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-vault',template:/*ion-inline-start:"D:\epx_app\src\pages\vault\vault.html"*/'<!--\n  Generated template for the VaultPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>THE VAULT</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only color="light" (click)="searchVault()">\n        <ion-icon isActive="true" name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content (ionScroll)="onScroll($event)">\n  <ion-refresher (ionRefresh)="forceReload($event)">\n    <ion-refresher-content>\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <div class="filter" #filter>\n    <ion-row>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Skills\n          </ion-label>\n          <ion-select [(ngModel)]="skills">\n            <!-- <ion-option disabled value="">Region</ion-option> -->\n            <ion-option *ngFor="let item of skillsList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-5>\n        <ion-item>\n          <ion-label>\n            Category\n          </ion-label>\n          <ion-select [(ngModel)]="category">\n            <!-- <ion-option disabled value="">Trip Type</ion-option> -->\n            <ion-option *ngFor="let item of categoryList">{{item}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col col-2>\n        <button ion-button outline color="light" class="btn-search" (click)="filterVault()">\n          <!-- <ion-icon name="search"></ion-icon> -->\n          Go\n        </button>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <div id="indicator" class="{{isLoading && !isRefresh ? \'show-indicator\' : \'hide-indicator\'}}">\n    <ion-spinner name="crescent"></ion-spinner>\n  </div>\n\n\n  <ion-card *ngFor="let vault of vaultList">\n    <div class="vault-image">\n      <img [src]="vault.thumbnail" (click)="vaultDetails(vault)" class="{{vault.vault_type == \'video\' ? \'video\' : \'pdf\'}}">\n    </div>\n    <ion-card-content>\n      <h3 class="content-text xl-text strong blue pre-line" [innerHtml]="vault.title | uppercase">\n      </h3>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="{{vault.author_avatar}}">\n        </ion-avatar>\n        <h2>\n          <strong class="black">{{vault.author}}</strong> |\n          <span class="gray">{{vault.length}}</span>\n        </h2>\n        <p>{{vault.posted | date : \'MMMM d, y\'}}</p>\n      </ion-item>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="page < totalPage && !isFilter">\n    <ion-infinite-scroll-content loadingText="Loading more vaults..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"D:\epx_app\src\pages\vault\vault.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_epx_epx__["a" /* EpxProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
    ], VaultPage);
    return VaultPage;
}());

//# sourceMappingURL=vault.js.map

/***/ })

});
//# sourceMappingURL=2.js.map