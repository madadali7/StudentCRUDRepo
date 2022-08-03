import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit {


  constructor(private router: Router) { }

  

  ngOnInit(): void {
   setTimeout(()=>{
    this.changePage();
   },
   1000)
  }

  changePage(){
    this.router.navigateByUrl('/login')
  }

}
