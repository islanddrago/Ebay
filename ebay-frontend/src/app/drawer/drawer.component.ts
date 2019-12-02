import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/services/ui.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  drawerOpen = false;
  profile: any;
  links = [
    {
      icon: 'lni-home',
      text: 'Upcoming Events',
      url: '/upcoming-events',
    },
    {
      icon: 'lni-calendar',
      text: 'My RSVPs',
      url: '/past-events',
    },
    {
      icon: 'lni-cog',
      text: 'Settings',
      url: '/settings',
    },
  ];

  constructor(public uiService: UiService, private authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.uiService.drawerOpen.subscribe(open => this.drawerOpen = open);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.uiService.drawerOpen.next(false);
      }
    });
    this.authService.userProfile$.subscribe(profile => this.profile = profile);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
  }
}
