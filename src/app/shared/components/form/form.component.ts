import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, startWith, map, combineLatest } from 'rxjs';
import { Pilule } from 'src/app/pilule/models/pilules.model';
import { PilulesService } from 'src/app/pilule/services/pilules.service';
import { FormValueService } from '../../services/form-value.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {


  mainForm!:FormGroup

  piluleCtrl!: FormControl
  firstDayCtrl!: FormControl
  usualTimeCtrl!: FormControl
  sexualIntercourse!:FormControl


  contextForm!:FormGroup
  pilules$!: Observable<Pilule[]>

  constructor(private dialog: MatDialog,private router: Router,private formBuilder:FormBuilder, private pilulesService: PilulesService, private formValuesService : FormValueService ) { }

  ngOnInit(): void {
  this.initFormControls()
  this.initMainForm()
  this.initObservable()
  this.pilulesService.getPilulesFromServer()
  }

  private initObservable(){
    const searchPilule$ = this.piluleCtrl.valueChanges.pipe(
      startWith(this.piluleCtrl.value),
      map(value => value.toLowerCase())
    )
   
    this.pilules$ = combineLatest([
      searchPilule$,
      this.pilulesService.pilules$
    ]).pipe(
      map(([search, pilules]) => pilules.filter(pilule => pilule.name
        .toLowerCase()
        .includes(search as string))
    )
    )
  }


  private initMainForm():void{
    this.mainForm = this.formBuilder.group({
      pilule: this.piluleCtrl,
      firstDay: this.firstDayCtrl,
      usualTime: this.usualTimeCtrl,
      sexualIntercourse: this.sexualIntercourse
    })
  }

  private initFormControls(){
    this.piluleCtrl = this.formBuilder.control('', Validators.required)
    this.firstDayCtrl = this.formBuilder.control('', Validators.required)
    this.sexualIntercourse = this.formBuilder.control('', Validators.required)
    this.usualTimeCtrl = this.formBuilder.control('', Validators.required)
  }



  onSubmitForm(){
    this.formValuesService._formValue$.next(this.mainForm.value)
    this.router.navigate(['calendar'])
    this.dialog.closeAll()
  }
}
