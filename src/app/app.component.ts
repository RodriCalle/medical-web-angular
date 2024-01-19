import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './interfaces/auth-status';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    LoginComponent,
    HomeComponent,
  ],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // public finishedAuthCheck = computed<boolean>(() => {
  //   console.log(this.authService.authStatus());
  //   if (this.authService.authStatus() === AuthStatus.checking) {
  //     return false;
  //   }
  //   return true;
  // });

  public authStatusChangedEffect = effect(() => {
    // console.log('authStatus: ', this.authService.authStatus());

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        break;
      case AuthStatus.authenticated:
        this.router.navigate(['']);
        break;
      case AuthStatus.notAuthenticated:
        this.router.navigate(['/login']);
        break;
    }
  });
}
