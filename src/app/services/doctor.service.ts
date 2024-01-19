import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private httpClient = inject(HttpClient);

  getById(id: string) {
    return this.httpClient.get<any>(API + `doctor/${id}`);
  }

  getAllBySpecialityId(specialityId: string) {
    return this.httpClient.get<any>(API + `doctor/speciality/${specialityId}`);
  }

  updateById(id: string, doctor: any) {
    return this.httpClient.patch<any>(API + `doctor/${id}`, doctor);
  }
}
