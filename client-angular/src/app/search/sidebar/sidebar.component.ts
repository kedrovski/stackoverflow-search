import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  isAuth = false;
  isVisible = false;

  @Input('items')
  sidebarItems = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes) {
    this.isVisible = changes.sidebarItems.currentValue.length > 0;
  }

  closeSidebar() {
    this.isVisible = !this.isVisible;
  }
}
