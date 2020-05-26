import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  yValue:number;
  hamburger:true;

  constructor() { }

    onWindowScroll($event){
      this.yValue = window.pageYOffset;
    }

    isItSticky(){
      if(this.yValue === 0){
        return false;
      }
      else
        return true;
    }



  public ngOnInit(): void {
    $(document).ready(function(){
        $(".hamburger-btn .fas-times").hide();

        $(".hamburger-btn .fas-bars").click(function(){
          $(this).hide();
          $(".hamburger-btn .fas-times").show();
          $(".mobile ul").addClass("active");
        });

        $(".hamburger-btn .fas-times").click(function(){
          $(this).hide();
          $(".hamburger-btn .fas-bars").show();
          $(".mobile ul").removeClass("active");
        });
    });
  }
}