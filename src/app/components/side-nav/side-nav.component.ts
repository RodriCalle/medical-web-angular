import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter();

  private authService = inject(AuthService);

  user: any;

  options = [
    {
      name: 'Perfil - Doctor',
      path: 'doctor/profile',
      icon: 'medical_information',
      role: ['DOCTOR'],
    },
    {
      name: 'Specialities',
      path: 'admin/specialities',
      icon: 'specialities',
      role: ['ADMIN'],
    },
    {
      name: 'Users',
      path: 'admin/users',
      icon: 'users',
      role: ['ADMIN'],
    },
    {
      name: 'Appointments',
      path: 'doctor/appointments',
      icon: 'notes',
      role: ['DOCTOR'],
    },

    {
      name: 'Perfil - Paciente',
      path: 'patient/profile',
      icon: 'personal_injury',
      role: ['PATIENT'],
    },
    {
      name: 'My Appointments',
      path: 'patient/appointments',
      icon: 'notes',
      role: ['PATIENT'],
    },
    {
      name: 'My Medical Record',
      path: 'patient/medical-record',
      icon: 'medical_services',
      role: ['PATIENT'],
    },
    {
      name: 'New Appointment',
      path: 'patient/new-appointment',
      icon: 'notes',
      role: ['PATIENT'],
    },
  ];

  constructor() {
    this.user = this.authService.currentUser();
    console.log(this.user);
  }

  loadOptions() {
    return this.options.filter((option) =>
      option.role.some((allowedRole) => this.user.roles.includes(allowedRole))
    );
  }

  closeSidenav() {
    this.closeMenu.emit(true);
  }
}
