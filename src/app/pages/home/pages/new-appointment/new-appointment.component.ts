import { Component, inject, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../../../../services/snackbar.service';
import { DoctorService } from '../../../../services/doctor.service';
import { AuthService } from '../../../../services/auth.service';
import { SpecialityService } from '../../../../services/speciality.service';
import { AppointmentService } from '../../../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.scss',
})
export class NewAppointmentComponent {
  private readonly router = inject(Router);
  private readonly snackbarService = inject(SnackbarService);
  private readonly authService = inject(AuthService);
  private readonly doctorService = inject(DoctorService);
  private readonly appointmentService = inject(AppointmentService);
  private readonly specialityService = inject(SpecialityService);

  appointmentForm = new FormGroup({
    doctorId: new FormControl('', [Validators.required]),
    specialityId: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  patientId: any;
  specialities: any;
  doctors: any;

  specialityId = toSignal(
    this.appointmentForm.controls.specialityId.valueChanges,
    {
      initialValue: '',
    }
  );

  public specialityIdChangedEffect = effect(() => {
    const specialityId = this.specialityId();
    if (specialityId !== null && specialityId !== '')
      this.getDoctorsBySpecialityId(specialityId);
  });

  constructor() {
    this.patientId = this.authService.currentUser().patientId;

    this.specialityService.getAll().subscribe({
      next: (res) => {
        this.specialities = res;
      },
    });
  }

  getDoctorsBySpecialityId(specialityId: string) {
    this.doctorService.getAllBySpecialityId(specialityId).subscribe({
      next: (res) => {
        this.doctors = res;
      },
    });
  }

  newAppointment() {
    const appointment = {
      patientId: this.patientId,
      ...this.appointmentForm.value,
    };

    this.appointmentService.create(appointment).subscribe({
      next: () => {
        this.snackbarService.open('Appointment created successfully');
        this.router.navigateByUrl('/patient/appointments');
      },
    });
  }
}
