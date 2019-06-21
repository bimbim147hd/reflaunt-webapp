import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  openNav() {
    document.getElementById('howSell').style.width = '100%';
    document.getElementById('howSell').style.zIndex = '9';
  }

  closeNav() {
    document.getElementById('howSell').style.width = '0%';
  }
}
