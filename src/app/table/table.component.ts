import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { MatHorizontalStepper } from '@angular/material';


declare var $;

class person{
  public name;
  public place;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  datarray:any=[];
  moiz:person =new person();
  shameer:person =new person();
  taha:person =new person();
  ali:person =new person();

  constructor() { 
    this.moiz.name="moiz";
    this.moiz.place="fast"

    this.shameer.name="shammer";
    this.shameer.place="plada";

    this.taha.name="taha";
    this.taha.place="nasra"

    this.datarray=[this.moiz,this.shameer,this.taha];
  }

  ngOnInit(): void {
    (document.getElementById('myTable') as HTMLTableElement).id = this.datarray;
    
  }

}
