import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject, tap, map, first } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#b9c559',
    secondary: '#888C46',
  },
};

import { PilulesService } from 'src/app/pilule/services/pilules.service';

import { FormValueService } from '../../services/form-value.service';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  // MISE EN FORME DES DONNES

  formValue$!: any;
  value!: any;
  pilule!: any;
  showAlert!: string;
  alert!: boolean;
  urgencyAdvice!: boolean;

  // MISE EN FORME CALENDRIER

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    private formValuesService: FormValueService,
    private pilulesService: PilulesService
  ) {}

  ngOnInit(): void {
    this.getValue();
    this.setCalendar();
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

  setCalendar() {
    const firstDay = new Date(this.value.firstDay);
    console.log(firstDay)
    const usualTimeDate = new Date(this.value.usualTime);
    const now = new Date();
    const delay = now.getTime() - usualTimeDate.getTime();
    console.log(usualTimeDate)
    console.log(now)
    console.log(delay)
    let remainingPill: number;
    if (this.pilule[0]['stop'] == '7') {
      remainingPill =
        21 * 24 * 60 * 60 * 1000 - (now.getTime() - firstDay.getTime());
    } else {
      remainingPill =
        21 * 24 * 60 * 60 * 1000 - (now.getTime() - firstDay.getTime());
    }

    // -------------------------------------------
    // Si il y un rapport < 5 : Pilule du lendemain
    if (this.value.sexualIntercourse === 'yes') {
      this.urgencyAdvice = true;
      this.events.push({
        start: startOfDay(new Date()),
        title: 'Prendre la pilule du lendemain',
        color: { ...colors['red'] },
        actions: this.actions,
      });
    }

    //-------------------------------------------------------------------------------------
    // Si la date de prise usuelle est < a 12h ou 3h (Fonction du delay[0]) Prise de 2 comprimés dans la même journée

    const autorizedDelay = this.pilule[0]['timeLimit'] * 1000 * 60 * 60;

    if (delay < autorizedDelay) {
      this.events.push(
        {
          start: startOfDay(new Date()),
          title: 'Prendre le comprimé oublié',
          color: { ...colors['yellow'] },
          actions: this.actions,
        },
        {
          start: startOfDay(new Date()),
          end: addDays(new Date(), remainingPill / (1000 * 60 * 60 * 24)),
          title: 'Prendre la pilule normalement',
          color: { ...colors['green'] },
          actions: this.actions,
        }
      );
    } else {
      // Oubli dans la 1ère ou la 2ème semaine
      if (remainingPill > 7 * 24 * 60 * 60 * 1000) {
        // Utiliser une méthode barrière à chaque apport jusqu'aux prochaine règles dans la limite de 14 jours
        // Continuer normalement votre plaquette en prenant les comprimés à l'heure habituelle

        this.events.push(
          {
            start: startOfDay(new Date()),
            end: addDays(new Date(), 7),
            title:
              'Mettre un préservatif à chaque rapport jusquaux prochaine règles dans la limite de 14 jours',
            color: { ...colors['blue'] },
            actions: this.actions,
          },
          {
            start: startOfDay(new Date()),
            end: addDays(new Date(), remainingPill / (1000 * 60 * 60 * 24)),
            title: 'Prendre la pilule normalement',
            color: { ...colors['green'] },
            actions: this.actions,
          }
        );
      } else {
        // Oubli dans la 3ème ou 4ème semaine
        // Pour les pilules de 21 comprimés : Ne pas respecter la période sans comprimé

        if (this.pilule[0]['stop'] == '0') {
          this.alert = true;
        }
        this.events.push({
          start: startOfDay(new Date()),
          end: addDays(new Date(), remainingPill / (1000 * 60 * 60 * 24) + 21),
          title: 'Prendre la pilule normalement',
          color: { ...colors['blue'] },
          actions: this.actions,
        });
      }
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
