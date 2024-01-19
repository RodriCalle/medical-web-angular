import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  private httpClient = inject(HttpClient);

  getAll() {
    return this.httpClient.get<any>(API + `speciality`);
  }

  create(speciality: any) {
    return this.httpClient.post<any>(API + `speciality`, speciality);
  }

  update(id: number, speciality: any) {
    return this.httpClient.patch<any>(API + `speciality/${id}`, speciality);
  }
}
