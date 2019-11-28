import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UiService } from 'src/services/ui.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeRoute = '';
  drawerOpen = false;
  constructor(public auth: AuthService, private uiService: UiService, private router: Router) { }

  ngOnInit() {
    this.uiService.drawerOpen.subscribe(open => this.drawerOpen = open);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

  toggleDrawer() {
    this.uiService.drawerOpen.next(!this.drawerOpen);
  }
}
