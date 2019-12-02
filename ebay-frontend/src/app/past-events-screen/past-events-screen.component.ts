import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'past-events-screen',
  templateUrl: './past-events-screen.component.html',
  styleUrls: ['./past-events-screen.component.scss']
})
export class PastEventsScreenComponent implements OnInit {
  profile: User;

  constructor(private identityService: IdentityService) { }

  ngOnInit() {
    this.identityService.loggedInUser.subscribe((user: User) => this.profile = user);
  }
}
