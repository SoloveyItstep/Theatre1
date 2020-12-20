import { Component, OnInit } from '@angular/core';
import { RoleService } from './../services/roleService';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isAuthenticated = false;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.isAuthenticated = this.roleService.hasAccess();
    this.roleService.authEvent.subscribe(item => {
      this.isAuthenticated = item;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
