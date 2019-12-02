export interface BaseRequest {
  url: string;
  body: any;
}

export class GetUserDetailsRequest implements BaseRequest {
  url: string;
  body: any;

  constructor(userID: string) {
    this.url = `/user/${userID}`;
    this.body = null;
  }
}

export class GetEventDetailsRequest implements BaseRequest {
  url: string;
  body: any;

  constructor(eventID: string) {
    this.url = `/event/${eventID}`;
    this.body = null;
  }
}

export class GetUpcomingEventsRequest implements BaseRequest {
  url: string;
  body: any;

  constructor() {
    this.url = '/event/upcoming-events';
    this.body = null;
  }
}
