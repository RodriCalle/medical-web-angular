import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Output() toogle = new EventEmitter();
  @Input() isMenuOpen = false;

  private authService = inject(AuthService);

  user: any;

  constructor() {
    this.user = this.authService.currentUser();
  }

  toogleSidenav() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toogle.emit(this.isMenuOpen);
  }

  logout() {
    this.authService.logout();
  }
}
