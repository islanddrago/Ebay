import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { UiService } from 'src/services/ui.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  drawerOpen = false;
  constructor(public auth: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.uiService.drawerOpen.subscribe(open => this.drawerOpen = open);
  }

  toggleDrawer() {
    this.uiService.drawerOpen.next(!this.drawerOpen);
  }
}
