"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
var core_1 = require("@angular/core");
var decode = require("jwt-decode");
var RoleService = /** @class */ (function () {
    function RoleService() {
        this.preKey = 'oidc.user:';
        this.adminRoleName = 'Admin';
        this.authEvent = new core_1.EventEmitter();
        //isAuthorized() {
        //  this.key += window.location.origin + ':test2';
        //  var data = JSON.parse(sessionStorage.getItem(this.key));
        //  if (!data)
        //    return false;
        //  else if (!data.access_token)
        //    return false;
        //  var user = decode(data.access_token);
        //  return !!user
        //}
    }
    RoleService.prototype.hasAdminRole = function () {
        var key = this.preKey + window.location.origin + ':test2';
        var data = JSON.parse(sessionStorage.getItem(key));
        if (!data)
            return false;
        else if (!data.access_token)
            return false;
        var user = decode(data.access_token);
        if (!user || !user.role || !user.role.length || user.role.indexOf(this.adminRoleName) == -1)
            return false;
        return true;
    };
    RoleService.prototype.hasAccess = function () {
        var key = this.preKey + window.location.origin + ':test2';
        var data = JSON.parse(sessionStorage.getItem(key));
        if (!data)
            return false;
        else if (!data.access_token)
            return false;
        return true;
    };
    RoleService = __decorate([
        core_1.Injectable()
    ], RoleService);
    return RoleService;
}());
exports.RoleService = RoleService;
//# sourceMappingURL=roleService.js.map