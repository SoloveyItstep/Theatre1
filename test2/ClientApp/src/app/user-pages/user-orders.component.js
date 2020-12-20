"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrders = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var UserOrders = /** @class */ (function () {
    function UserOrders(performanceService, router) {
        this.performanceService = performanceService;
        this.router = router;
    }
    UserOrders.prototype.ngOnInit = function () {
        var _this = this;
        this.performanceService.getOrders()
            .subscribe(function (data) { return _this.performances = data; }, function (error) {
            if (error && error.status == 401) {
                _this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: _this.router.url } });
            }
            sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Виникла помилка при отриманні даних',
                text: error.message
            });
        });
    };
    UserOrders.prototype.loadData = function () {
    };
    UserOrders = __decorate([
        core_1.Component({
            selector: 'user-orders',
            templateUrl: 'user-orders.component.html',
            styleUrls: ['user-orders.component.scss']
        })
    ], UserOrders);
    return UserOrders;
}());
exports.UserOrders = UserOrders;
//# sourceMappingURL=user-orders.component.js.map