import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  progresBar = signal(false);
  
  show(): void {
    this.progresBar.set(true);
  }

  // Hide the spinner
  hide(): void {
    this.progresBar.set(false);
  }


}
