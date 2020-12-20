"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceDetail = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var PerformanceDetail = /** @class */ (function () {
    function PerformanceDetail(activatedRoute, service, authService, roleService, router) {
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.authService = authService;
        this.roleService = roleService;
        this.router = router;
        this.times = [];
        this.hasAccess = false;
    }
    PerformanceDetail.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getItem(_this.id)
                .subscribe(function (item) { return _this.initModel(item); });
        });
        this.hasAccess = this.roleService.hasAdminRole();
    };
    PerformanceDetail.prototype.initModel = function (item) {
        this.model = item;
        for (var i = 0; i < this.model.performanceDates.length; ++i) {
            var date = new Date(this.model.performanceDates[i].date.toString());
            for (var j = 0; j < this.model.performanceDates[i].performanceTimes.length; ++j) {
                var time = new Date(this.model.performanceDates[i].performanceTimes[j].time.toString());
                var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
                var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
                var hours = (time.getHours() < 10 ? '0' : '') + time.getHours();
                var minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
                var tm = { time: '', id: '', count: 0, price: 0 };
                tm.price = this.model.performanceDates[i].performanceTimes[j].price;
                tm.time = '' + date.getFullYear() + '.' + month + '.' + day + ' ' + hours + ':' + minutes;
                tm.id = this.model.performanceDates[i].performanceTimes[j].id;
                this.times.push(tm);
            }
        }
        ;
    };
    PerformanceDetail.prototype.book = function (timeId, count) {
        var _this = this;
        if (count <= 0) {
            sweetalert2_1.default.fire({
                icon: 'error',
                title: 'Помилка',
                text: 'Кількість білетів повинна бути більше нуля'
            });
            return;
        }
        //if (this.authService.isAuthenticated()) {
        this.service.bookPerformance(timeId, count)
            .subscribe(function (result) {
            console.log(result);
            sweetalert2_1.default.fire({
                icon: 'success',
                title: 'Успішо заброньовано',
                text: 'Успішно заброньовано білети у кількості - ' + count
            });
        }, function (error) {
            if (error && error.status == 401) {
                _this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: _this.router.url } });
            }
            console.log(error);
        });
    };
    PerformanceDetail.prototype.edit = function (id) {
        this.router.navigate(['/admin', id]);
    };
    PerformanceDetail = __decorate([
        core_1.Component({
            selector: 'performance-detail',
            templateUrl: 'performance.details.component.html',
            styleUrls: ['performance.details.component.scss']
        })
    ], PerformanceDetail);
    return PerformanceDetail;
}());
exports.PerformanceDetail = PerformanceDetail;
//# sourceMappingURL=performance.details.component.js.map