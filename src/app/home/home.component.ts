import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  constructor(private router: Router) { }

  ngOnInit() {
    function myFunction() {
      this.loading=true;
    }

  }

}

