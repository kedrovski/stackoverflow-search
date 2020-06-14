import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  constructor(private authGuard: AuthGuard, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let routeData = this.route.snapshot.fragment;
    let accessToken = routeData.split('=')[1];
    if (accessToken) {
      localStorage.setItem('ACCESS_TOKEN_SO', accessToken);
    }
    console.log(accessToken);
  }

  find(query) {
    console.log(query);
    this.router.navigate([`search/result/${query}`]);
  }

}
