"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceService = void 0;
var core_1 = require("@angular/core");
var PerformanceService = /** @class */ (function () {
    function PerformanceService(http) {
        this.http = http;
    }
    PerformanceService.prototype.getPerformances = function (page, count) {
        var url = '/performance/' + page + '/' + count + '/performances/';
        return this.http.post(url, null);
    };
    PerformanceService.prototype.getAll = function () {
        var url = '/performance/all';
        return this.http.post(url, null);
    };
    PerformanceService.prototype.getItem = function (id) {
        return this.http.post('/performance/getitem/' + id, null);
    };
    PerformanceService.prototype.bookPerformance = function (timeId, count) {
        return this.http.post('/performance/book/' + timeId + '/' + count, null);
    };
    PerformanceService.prototype.edit = function (item) {
        return this.http.post('/performance/edit', item);
    };
    PerformanceService.prototype.getOrders = function () {
        return this.http.post('/user/getorders/', null);
    };
    PerformanceService = __decorate([
        core_1.Injectable()
    ], PerformanceService);
    return PerformanceService;
}());
exports.PerformanceService = PerformanceService;
//# sourceMappingURL=performanceService.js.map