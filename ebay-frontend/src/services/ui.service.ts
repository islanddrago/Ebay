import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  drawerOpen = new BehaviorSubject<boolean>(false);
  installButtonPrompt = new BehaviorSubject<any>(undefined);

  constructor() {
    // catch beforeinstallprompt event to determine if a install button should be present
    window.addEventListener('beforeinstallprompt', (event) => {
      this.installButtonPrompt.next(event);
    });
  }

  setDrawerOpen(open: boolean) {
    this.drawerOpen.next(open);
  }
}
