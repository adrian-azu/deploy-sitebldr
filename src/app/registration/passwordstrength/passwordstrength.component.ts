import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'passwordstrength',
  templateUrl: './passwordstrength.component.html',
  styleUrls: ['./passwordstrength.component.css']
})
export class PasswordstrengthComponent implements OnChanges {

  constructor() { }

  @Input() passwordToCheck: string;  
  @Input() barLabel: string;
  bar0: string;  
  bar1: string;  
  bar2: string;  
  bar3: string;  
  bar4: string;  
  level:string;
  showlvlColor:string;

  //private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];
  private colors = ['#F00', '#cc2900', '#ffcc00', '#2eb82e', '#009933'];

  
  checkStrength(){
    let fairlvl = /^(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;
    let goodlvl = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/;
    let stronglvl = /^(?=.*?[#?!@$%^&*-])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/;

    let password = this.passwordToCheck;
    if(password === null){
      return;
    }
    if(stronglvl.test(password)===true){
      return this.level = "strong";
    }

    else if(goodlvl.test(password)===true){
      return this.level = "good"
    }

    else if(fairlvl.test(password) === true){
      return this.level="fair";
    }

    else{
      return this.level="weak";
    }
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

  showlvl=false;
  showLevel(){
    if (this.currentlvl !== null){
      this.showlvl = true;
    }
    else
    this.showlvl = false;
  }
  

  currentlvl;  
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void{
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
