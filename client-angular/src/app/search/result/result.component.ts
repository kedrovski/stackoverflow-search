import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  items = [];
  sidebarItems = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private location: Location) { }

  ngOnInit() {
    let routeParams = this.route.snapshot.params;
    if (routeParams && routeParams.query) {
      this.apiService.search(routeParams.query).then((data: any) => {
        this.items = data.items;
        console.log(data);
      });
    }
  }

  searchUserQuestions(userId) {
    this.apiService.searchUserQuestions(userId).then((data: any) => {
      this.sidebarItems = data.items;
    });
  }

  searchTagQuestions(tag) {
    this.apiService.search(tag).then((data: any) => {
      this.sidebarItems = data.items;
    });
  }

  openQuestionInfo(questionId) {
    this.router.navigate([`search/info/${questionId}`]);
  }

  back() {
    this.location.back();
  }
}
