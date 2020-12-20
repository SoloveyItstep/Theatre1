import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Performance } from './../models/performance'

@Injectable()
export class PerformanceService {
  constructor(private http: HttpClient) { }

  getPerformances(page: number, count: number) {
    var url = '/performance/' + page + '/' + count + '/performances/';
    return this.http.post(url, null);
  }

  getAll() {
    var url = '/performance/all';
    return this.http.post(url, null);
  }

  getItem(id) {
    return this.http.post<Performance>('/performance/getitem/' + id, null);
  }

  bookPerformance(timeId, count) {
    return this.http.post('/performance/book/' + timeId + '/' + count, null);
  }

  edit(item: Performance) {
    return this.http.post('/performance/edit', item);
  }

  getOrders() {
    return this.http.post('/user/getorders/', null);
  }

  //private getHeaders() {
  //  const headers = new HttpHeaders();
  //  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //  headers.append('Access-Control-Allow-Methods', 'GET, POST');
  //  headers.append('Access-Control-Allow-Origin', '*');
  //  return headers;
  //}
}

