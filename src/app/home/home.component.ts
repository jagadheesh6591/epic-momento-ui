import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import { AppSpinnerComponent } from "./spinner/app-spinner.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIcon, AppSpinnerComponent, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  open = false;

  toggleSidebar() {
    return !this.open;
  }

  isExpanded = true;

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

}
 