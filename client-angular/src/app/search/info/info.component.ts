import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  isAuth = true;
  answersData = {
    title: '',
    answers: {},
    owner: { display_name: '', profile_image: ''},
    body: ''
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) { }

  ngOnInit() {
    let routeParams = this.route.snapshot.params;
    if (routeParams && routeParams.id) {
      console.log(routeParams.id);
      this.apiService.searchAnswers(routeParams.id).then((data: any) => {
        console.log(data);
        this.answersData = data.items[0];
      });
    }
  }

  back() {
    this.location.back();
  }

}
