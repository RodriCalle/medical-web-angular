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
import { AuthService } from '../../../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../../../../services/snackbar.service';
import { PatientService } from '../../../../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.scss',
})
export class PatientProfileComponent {
  doctorForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [Validators.required]),
    documentType: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    lastPassword: new FormControl(''),
    password: new FormControl(''),
  });

  patientId: any;
  patient: any;

  private readonly snackbarService = inject(SnackbarService);
  private readonly authService = inject(AuthService);
  private readonly patientService = inject(PatientService);

  constructor() {
    this.patientId = this.authService.currentUser().patientId;

    this.patientService.getById(this.patientId).subscribe({
      next: (response) => {
        this.patient = response;
        this.doctorForm.patchValue({
          name: this.patient.user.name,
          lastname: this.patient.user.lastname,
          phone: this.patient.user.phone,
          address: this.patient.user.address,
          email: this.patient.user.email,
          documentNumber: this.patient.user.documentNumber,
          documentType: this.patient.user.documentType,
        });
      },
    });
  }

  updateDoctor() {
    const patientUpdate = this.doctorForm.value;

    this.patientService.updateById(this.patientId, patientUpdate).subscribe({
      next: (response) => {
        this.snackbarService.open('Data updated successfully');
      },
    });
  }
}
