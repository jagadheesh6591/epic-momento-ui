import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerService } from './service/spinner.service';


@Component({
  selector: 'app-app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './app-spinner.component.html',
  styleUrl: './app-spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSpinnerComponent {

  spinnerService = inject(SpinnerService);
  isLoading = computed(()=>this.spinnerService.progresBar());

  isLoadingeffect = effect( () => {
    console.log('isLoadingeffect', this.isLoading())
  })


}
