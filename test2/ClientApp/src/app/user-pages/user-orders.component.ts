import { Component, OnInit } from '@angular/core';
import { PerformanceService } from './../services/performanceService';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BoockedPerformance } from './../models/boockedPerformance';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-orders',
  templateUrl: 'user-orders.component.html',
  styleUrls: ['user-orders.component.scss']
})
export class UserOrders {

  performances: BoockedPerformance[];

  constructor(private performanceService: PerformanceService, private router: Router) {
  }

  ngOnInit() {
    this.performanceService.getOrders()
      .subscribe((data: BoockedPerformance[]) => this.performances = data,
        error => {
          if (error && error.status == 401) {
            this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: this.router.url } });
          }
          Swal.fire({
            icon: 'error',
            title: 'Виникла помилка при отриманні даних',
            text: error.message
          });
        });
  }

  loadData() {
    
  }
}
