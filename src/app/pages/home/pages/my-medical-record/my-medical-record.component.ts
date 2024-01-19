import { NullPipe } from './../../../../pipes/null.pipe';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { SnackbarService } from '../../../../services/snackbar.service';
import { AuthService } from '../../../../services/auth.service';
import { PatientService } from '../../../../services/patient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-medical-record',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    LoadingComponent,
    DatePipe,
    NullPipe,
    CurrencyPipe,
    MatPaginatorModule,
  ],
  templateUrl: './my-medical-record.component.html',
  styleUrl: './my-medical-record.component.scss',
})
export class MyMedicalRecordComponent implements OnInit, AfterViewInit {
  private readonly snackbarService = inject(SnackbarService);
  private readonly authService = inject(AuthService);
  private readonly patientService = inject(PatientService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  appointments$!: Observable<any>;
  appointments = new MatTableDataSource<any>();

  loading = signal(false);
  patientId: any = 1;
  patient: any;

  constructor() {
    this.patientId = this.authService.currentUser().patientId;
  }

  ngOnInit() {
    this.patientService.getById(this.patientId).subscribe({
      next: (response) => {
        this.patient = response;
        this.appointments.data = this.patient.appointments;
        this.appointments$ = this.appointments.connect();
        this.loading.set(false);
      },
    });
  }

  ngAfterViewInit() {
    this.appointments.paginator = this.paginator;
  }
}
