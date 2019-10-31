import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  drawerOpen = new BehaviorSubject<boolean>(false);

  constructor() { }

  setDrawerOpen(open: boolean) {
    this.drawerOpen.next(open);
  }
}
