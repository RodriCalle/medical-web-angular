import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private httpClient = inject(HttpClient);

  create(appointment: any) {
    return this.httpClient.post<any>(API + `appointment`, appointment);
  }
}
