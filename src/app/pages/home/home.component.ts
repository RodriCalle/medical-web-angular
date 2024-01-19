import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [NavBarComponent, SideNavComponent],
})
export class HomeComponent {
  isOpen = false;

  toogleSidenav($event: any) {
    this.isOpen = $event;
  }

  changeIcon() {
    this.isOpen = false;
  }
}
