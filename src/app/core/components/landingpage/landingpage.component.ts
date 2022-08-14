import { Component, OnInit } from '@angular/core';

import { FormComponent } from 'src/app/shared/components/form/form.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('salut');
    
  }

  onStart(){
    console.log('salut');
    
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose= false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px"
    dialogConfig.maxWidth='80%'
    this.dialog.open(FormComponent, dialogConfig)
  }

}
