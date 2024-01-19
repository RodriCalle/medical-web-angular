import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private httpClient = inject(HttpClient);

  getById(id: string) {
    return this.httpClient.get<any>(API + `patient/${id}`);
  }

  updateById(id: string, patient: any) {
    return this.httpClient.patch<any>(API + `patient/${id}`, patient);
  }
}
