"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformancesList = void 0;
var core_1 = require("@angular/core");
var PerformancesList = /** @class */ (function () {
    function PerformancesList(service) {
        this.service = service;
        this.performances = [];
        this.total = 0;
        this.page = 1;
        this.pageSize = 6;
        this.viewList = [];
    }
    PerformancesList.prototype.ngOnInit = function () {
        //this.service.getPerformances(this.page, 10)
        //.subscribe((data: PerformanceModel) => {
        //  this.performances = data.performances;
        //  this.total = data.total;
        //},
        //  error => console.log(error)
        //);
        var _this = this;
        this.service.getAll()
            .subscribe(function (data) {
            _this.performances = data;
            _this.total = data.length;
            _this.viewList = data;
        }, function (error) { return console.log(error); });
    };
    PerformancesList.prototype.filterByName = function ($event) {
        this.page = 1;
        this.viewList = this.performances.filter(function (item) {
            return item.name.toLowerCase().indexOf($event.toLowerCase()) != -1;
        });
        this.total = this.viewList.length;
    };
    PerformancesList.prototype.filterByDate = function ($event) {
        this.page = 1;
        this.viewList = this.viewList.filter(function (item) {
            if (!item.performanceDates || !item.performanceDates.length)
                return false;
            for (var i = 0; i < item.performanceDates.length; ++i) {
                var date = new Date(item.performanceDates[i].date.toString());
                if (date.getFullYear() == $event.getFullYear() && date.getMonth() == $event.getMonth() && date.getDate() == $event.getDate())
                    return item;
            }
        });
        this.total = this.viewList.length;
    };
    PerformancesList.prototype.clearFilter = function ($event) {
        this.page = 1;
        this.viewList = this.performances;
        this.total = this.performances.length;
    };
    PerformancesList = __decorate([
        core_1.Component({
            selector: 'performances-list',
            template: "<filter-performance\n                      class=\"col col-md-12\"\n                      (textEv)='filterByName($event)'\n                      (dateEv)='filterByDate($event)'\n                      (clearEv)='clearFilter($event)'>\n             </filter-performance><br/>\n            <performance-item\n                  *ngFor=\"let item of viewList | slice: (page-1) * 6 : (page-1) * 6 + 6\"\n                  class=\"item-container\"\n                  [model]=\"item\">\n             </performance-item>",
            styleUrls: ['performances.component.scss']
        })
    ], PerformancesList);
    return PerformancesList;
}());
exports.PerformancesList = PerformancesList;
//# sourceMappingURL=performances.component.js.map