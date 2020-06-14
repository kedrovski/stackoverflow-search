import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jQuery from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_ENDPOINT_MAIN = 'http://localhost:3010/api';
  API_STACK_OVERFLOW = 'https://api.stackexchange.com';

  constructor(private httpClient: HttpClient) { }

  public login(email, password) {
    return this.httpClient.post(`${this.API_ENDPOINT_MAIN}/authenticate`, { email: email, password: password });
  }

  public isAuth() {
    return this.httpClient.post(`${this.API_ENDPOINT_MAIN}/checkToken`, { });
  }

  public signup(email, password, confirmPassword, name) {
    return this.httpClient.post(`${this.API_ENDPOINT_MAIN}/signup`, { email: email, password: password, confirmPassword: confirmPassword, name: name });
  }

  public restore(email) {
    return this.httpClient.post(`${this.API_ENDPOINT_MAIN}/restorepass`, { email: email });
  }

  public search(query, page = 1, pagesize = 100) {
    return new Promise((resolve, reject) => {
      jQuery.get(`${this.API_STACK_OVERFLOW}/2.2/search/advanced?page=${page}&pagesize=${pagesize}&order=desc&sort=activity&q=${query}&site=stackoverflow&key=${localStorage.getItem('key')}&access_token=${localStorage.getItem('ACCESS_TOKEN_SO')}`, (data, status) => {
        if (status === 'success') {
          resolve(data);
        } else {
          reject('Error');
        }
      });
    });
  }

  public searchUserQuestions(userId, page = 1, pagesize = 100) {
    return new Promise((resolve, reject) => {
      jQuery.get(`${this.API_STACK_OVERFLOW}/2.2/search/advanced?page=${page}&pagesize=${pagesize}&order=desc&sort=votes&q=&user=${userId}&site=stackoverflow&key=${localStorage.getItem('key')}&access_token=${localStorage.getItem('ACCESS_TOKEN_SO')}`, (data, status) => {
        if (status === 'success') {
          resolve(data);
        } else {
          reject('Error');
        }
      });
    });
  }

  public searchAnswers(questionId) {
    return new Promise((resolve, reject) => {
      jQuery.get(`${this.API_STACK_OVERFLOW}/2.2/questions/${questionId}?&site=stackoverflow&filter=%21T%2AhPUiv_%28m%28r2TmxR1&key=${localStorage.getItem('key')}&access_token=${localStorage.getItem('ACCESS_TOKEN_SO')}`, (data, status) => {
        if (status === 'success') {
          resolve(data);
        } else {
          reject('Error');
        }
      });
    });
  }
}
