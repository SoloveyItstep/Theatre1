import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Performance } from './../models/performance';
import { PerformanceService } from './../services/performanceService';
import { AuthorizeService } from './../../api-authorization/authorize.service';
import { RoleService } from './../services/roleService';
import Swal from 'sweetalert2';

@Component({
  selector: 'performance-detail',
  templateUrl: 'performance.details.component.html',
  styleUrls: ['performance.details.component.scss']
})
export class PerformanceDetail implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private service: PerformanceService,
              private authService: AuthorizeService,
              private roleService: RoleService,
              private router: Router) { }
  model: Performance;
  id: string;
  times: { time: string, id: string, count: number, price: number }[] = [];
  hasAccess: boolean = false;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.service.getItem(this.id)
        .subscribe(item => this.initModel(item));
    });
    this.hasAccess = this.roleService.hasAdminRole();
  }

  private initModel(item: Performance) {
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
    };
  }

  book(timeId, count) {
    if (count <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Помилка',
        text: 'Кількість білетів повинна бути більше нуля'
      });
      return;
    }
    //if (this.authService.isAuthenticated()) {
      this.service.bookPerformance(timeId, count)
        .subscribe((result) => {
          console.log(result)
          Swal.fire({
            icon: 'success',
            title: 'Успішо заброньовано',
            text: 'Успішно заброньовано білети у кількості - ' + count
          });
        },
          error => {
            if (error && error.status == 401) {
              this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: this.router.url } });
            }
            console.log(error);
          }
        );
  }

  edit(id) {
    this.router.navigate(['/admin', id]);
  }
}
