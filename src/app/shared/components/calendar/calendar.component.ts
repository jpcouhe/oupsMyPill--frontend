import { Component, OnInit } from '@angular/core';

import { Observable, pipe, tap, map } from 'rxjs';
import { PilulesService } from 'src/app/pilule/services/pilules.service';

import { FormValueService } from '../../services/form-value.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  formValue$!: any;
  value!: any;
  pilule!: any;
  constructor(
    private formValuesService: FormValueService,
    private pilulesService: PilulesService
  ) {}

  ngOnInit(): void {
    this.getValue();
    this.setCalendar()
    console.log(this.value);
    console.log(this.pilule);
  }

  getValue() {
    this.formValue$ = this.formValuesService.value$
      .pipe(
        tap((value) => {
          this.value = value;
        })
      )
      .subscribe();

    this.pilulesService.pilules$
      .pipe(
        map((pilules) =>
          pilules.filter((pilule) => pilule.name == this.value.pilule)
        ),
        tap((pilule) => {
          this.pilule = pilule;
        })
      )
      .subscribe();
  }


  setCalendar(){
    
    // Si il y un rapport < 5 : Pilule du lendemain
    // Si la date de prise usuelle est < a 12h ou 3h (Fonction du delay[0]) Prise de 2 comprimés dans la même journée
    // Mettre un préservatif pendant 14j

    //Si 1er jours < 7
    //    Entre 7 et 14
    //    Entre 14 et 21
    
    //Cas particulier QLAIRA
  }
}
