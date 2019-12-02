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

export class UpdateProfileRequest implements BaseRequest{
  url: string;
  body: any;

  constructor(email: string, given_name:string,family_name:string, nickname:string ) {
    this.url = '/user';
    this.body = {
      email,
      name,
      given_name,
      family_name,
      nickname,
    };
  }
}

export class RSVPForEventRequest implements BaseRequest {
  url: string;
  body: any;

  constructor(eventID: string) {
    this.url = `/event/${eventID}/rsvp`
    this.body = null;
  }
}

export class UnRSVPForEventRequest implements BaseRequest {
  url: string;
  body: any;

  constructor(eventID: string) {
    this.url = `/event/${eventID}/unrsvp`
    this.body = null;
  }
}

export class CreateEventRequest implements BaseRequest {
  url: string;
  body: any;

  constructor(title: string, description: string, location: string, startDate: string, endDate: string) {
    this.url = '/event';
    this.body = {
      event: {
        title,
        description,
        location,
        startDate,
        endDate, 
      }
    };
  }
}
