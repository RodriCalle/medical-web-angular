import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DoctorService } from '../../../../services/doctor.service';
import { AuthService } from '../../../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { SpecialityService } from '../../../../services/speciality.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent {
  doctorForm = new FormGroup({
    // password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [Validators.required]),
    documentType: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    specialityId: new FormControl('', [Validators.required]),
    lastPassword: new FormControl(''),
    password: new FormControl(''),
  });

  doctorId: any;
  doctor: any;
  specialities: any;

  private readonly snackbarService = inject(SnackbarService);
  private readonly authService = inject(AuthService);
  private readonly doctorService = inject(DoctorService);
  private readonly specialityService = inject(SpecialityService);

  constructor() {
    this.doctorId = this.authService.currentUser().doctorId;

    this.specialityService.getAll().subscribe({
      next: (response) => {
        this.specialities = response;
      },
    });

    this.doctorService.getById(this.doctorId).subscribe({
      next: (response) => {
        this.doctor = response;
        this.doctorForm.patchValue({
          name: this.doctor.user.name,
          lastname: this.doctor.user.lastname,
          phone: this.doctor.user.phone,
          address: this.doctor.user.address,
          email: this.doctor.user.email,
          documentNumber: this.doctor.user.documentNumber,
          documentType: this.doctor.user.documentType,
          specialityId: this.doctor.speciality.id,
        });
      },
    });
  }

  updateDoctor() {
    const doctorUpdate = this.doctorForm.value;

    this.doctorService.updateById(this.doctorId, doctorUpdate).subscribe({
      next: (response) => {
        this.snackbarService.open('Data updated successfully');
      },
    });
  }
}
