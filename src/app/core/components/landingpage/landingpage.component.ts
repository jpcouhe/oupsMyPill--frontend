import { Component, OnInit } from '@angular/core';

import { FormComponent } from 'src/app/shared/components/form/form.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent  {

  constructor(public dialog: MatDialog) { }

  onStart(){
  
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose= false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px"
    dialogConfig.maxWidth='80%'
    this.dialog.open(FormComponent, dialogConfig)
  }

}
