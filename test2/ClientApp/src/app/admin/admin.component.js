"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEdit = void 0;
var core_1 = require("@angular/core");
var performance_1 = require("./../models/performance");
var CreateEdit = /** @class */ (function () {
    function CreateEdit(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.model = new performance_1.Performance();
    }
    CreateEdit.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            _this.service.getItem(_this.id)
                .subscribe(function (item) {
                for (var i = 0; i < item.performanceDates.length; ++i) {
                    item.performanceDates[i].date = new Date(item.performanceDates[i].date.toString());
                }
                _this.model = item;
            });
        });
    };
    CreateEdit.prototype.editDate = function (ev, id) {
        var arr = ev.split('-');
        for (var i = 0; i < this.model.performanceDates.length; ++i) {
            if (this.model.performanceDates[i].id == id) {
                this.model.performanceDates[i].date = new Date(arr[0], arr[1], arr[2]);
            }
        }
    };
    CreateEdit.prototype.save = function () {
        // валидация введенных данных
        this.service.edit(this.model)
            .subscribe(function (res) { return console.log(res); }, function (err) { return console.log(err); });
    };
    CreateEdit = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: 'admin.component.html',
            styleUrls: ['admin.component.scss']
        })
    ], CreateEdit);
    return CreateEdit;
}());
exports.CreateEdit = CreateEdit;
//# sourceMappingURL=admin.component.js.map