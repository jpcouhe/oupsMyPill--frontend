import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pilule } from '../models/pilules.model';

@Injectable({
  providedIn: 'root',
})
export class PilulesService {
  constructor(private http: HttpClient) {}

  private _pilules$ = new BehaviorSubject<Pilule[]>([]);
  get pilules$(): Observable<Pilule[]> {
    return this._pilules$.asObservable();
  }

  getPilulesFromServer() {
    this.http
      .get<Pilule[]>(`${environment.apiUrl}/Pilules`)
      .pipe(
        tap((pilules) => {
          this._pilules$.next(pilules);
        })
      )
      .subscribe();
  }

}
