import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { SpecialityService } from '../../../../services/speciality.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { NullPipe } from '../../../../pipes/null.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../../../../services/snackbar.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-specialities',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    NullPipe,
    MatSlideToggleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './specialities.component.html',
  styleUrl: './specialities.component.scss',
})
export class SpecialitiesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private specialityService = inject(SpecialityService);
  private snackbarService = inject(SnackbarService);

  dataSource = new MatTableDataSource<any>([]);

  displayedColumns = [
    'id',
    'name',
    'description',
    'status',
    'createdAt',
    'updatedAt',
  ];

  specialityForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    status: new FormControl(false, [Validators.required]),
  });

  ngOnInit(): void {
    this.getAllSpecialities();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  saveSpeciality() {
    if (this.specialityForm.value.id != null) {
      this.specialityService
        .update(this.specialityForm.value.id, this.specialityForm.value)
        .subscribe({
          next: () => {
            this.getAllSpecialities();
            this.specialityForm.reset();
            this.snackbarService.open('Speciality updated successfully');
          },
        });
    } else {
      this.specialityService.create(this.specialityForm.value).subscribe({
        next: () => {
          this.getAllSpecialities();
          this.snackbarService.open('Speciality created successfully');
          this.cleanSpecialityForm();
        },
      });
    }
  }

  getAllSpecialities() {
    this.specialityService.getAll().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
    });
  }

  clickRowSpeciality(speciality: any) {
    this.specialityForm.patchValue(speciality);
  }

  cleanSpecialityForm() {
    this.specialityForm.reset();
  }
}
