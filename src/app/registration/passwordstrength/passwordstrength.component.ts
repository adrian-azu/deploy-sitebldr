import { Component, Input, OnChanges, SimpleChange, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';


@Component({
  selector: 'passwordstrength',
  templateUrl: './passwordstrength.component.html',
  styleUrls: ['./passwordstrength.component.css']
})
export class PasswordstrengthComponent implements OnInit, OnChanges {

  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  bar0: string;  
  bar1: string;  
  bar2: string;  
  bar3: string;  
  bar4: string;  
  level:string;
  showlvlColor:string;
  showlvl = false;
  currentlvl;

  private colors = ['#F00', '#cc2900', '#ffcc00', '#2eb82e', '#009933'];

  constructor() { }

  ngOnInit(){
    this.showLevel();
    this.weakLvl();
  }
  
  checkStrength(){
    let weaklvl = /^(?=.*?[a-z])/;
    let fairlvl = /^(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;
    let goodlvl = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/;
    let stronglvl = /^(?=.*?[#?!@$%^&*-])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/;

    let password = this.passwordToCheck;
    if(stronglvl.test(password)===true){
      return this.level = "strong";
    }
    else if(goodlvl.test(password)===true){
      return this.level = "good"
    }

    else if(fairlvl.test(password) === true){
      return this.level="fair";
    }
    else if(weaklvl.test(password) === true){
      return this.level="weak";
    }
    else
      return this.level = null;
  }

  getColor(){
    this.level = this.checkStrength();
    let idx = 0;
    if(this.level === "strong"){
      idx = 4; 
    }
    else if(this.level === "good"){
      idx = 3;
    }
    else if(this.level === "fair"){
      idx = 2;
    }
    else if(this.level === "weak"){
      idx = 1;
    }
    return {  
      idx,
      col: this.colors[idx]
    }; 
  }

  showLevel(){
    let currentlvl = this.checkStrength();
    if (this.currentlvl !== null){
      this.showlvl = true;
    }
    else
    this.showlvl = false;
  }

  weakLvl(){
    this.currentlvl = this.checkStrength();
    if(this.currentlvl === "weak"){
      return true;
    }
    else
      return false;
  }
  
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void{
    this.weakLvl();
    this.showLevel();
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      this.showlvl = true;
      this.currentlvl = this.checkStrength();
      const c = this.getColor();
      this.setBarColors(c.idx, c.col);
      this.showlvlColor = c.col;
    }
    else{
      this.showlvl = false;
      this.currentlvl = null;
    }
  }

  private setBarColors(count, col) {
    for (let n = 0; n < count; n++) {
      this['bar' + n] = col;
    }
  }
}
