import { UsersComponent } from './pages/home/pages/users/users.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorProfileComponent } from './pages/home/pages/doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './pages/home/pages/patient-profile/patient-profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { isAuthGuard } from './guards/is-auth.guard';
import { isNotAuthGuard } from './guards/is-not-auth.guard';
import { MyMedicalRecordComponent } from './pages/home/pages/my-medical-record/my-medical-record.component';
import { SpecialitiesComponent } from './pages/home/pages/specialities/specialities.component';
import { MyAppointmentsComponent } from './pages/home/pages/my-appointments/my-appointments.component';
import { NewAppointmentComponent } from './pages/home/pages/new-appointment/new-appointment.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    canActivate: [isNotAuthGuard],
    component: LoginComponent,
  },
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    canActivate: [isAuthGuard],
    children: [
      {
        title: 'Admin',
        path: 'admin',
        children: [
          {
            path: 'users',
            title: 'Users',
            component: UsersComponent,
          },
          {
            path: 'specialities',
            title: 'Specialities',
            component: SpecialitiesComponent,
          },
        ],
      },
      {
        title: 'Doctor',
        path: 'doctor',
        children: [
          {
            path: 'profile',
            title: 'My Profile',
            component: DoctorProfileComponent,
          },
        ],
      },
      {
        title: 'Patient',
        path: 'patient',
        children: [
          {
            path: 'profile',
            title: 'My Profile',
            component: PatientProfileComponent,
          },
          {
            path: 'appointments',
            title: 'My Appointments',
            component: MyAppointmentsComponent,
          },
          {
            path: 'new-appointment',
            title: 'New Appointment',
            component: NewAppointmentComponent,
          },
          {
            path: 'medical-record',
            title: 'Medical Record',
            component: MyMedicalRecordComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    title: 'Not Found',
    component: NotFoundComponent,
    canActivate: [isAuthGuard],
  },
];
