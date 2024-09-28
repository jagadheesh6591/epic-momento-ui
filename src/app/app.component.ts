import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { EmpDialogComponent } from './employee/dialog/emp-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  standalone: true,
  imports: [AppComponent, RouterModule, HomeComponent, EmpDialogComponent, MatSlideToggleModule, MatSidenavModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'epicmomento';
}
