import { Profile } from './Profile';
export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  category: string;
  city: string;
  venue: string;
  hostUserName: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees: Profile[];
  image?: string;
}

export class Activity implements Activity {
  constructor(init?: ActivityFormvalues) {
    Object.assign(this, init)
  }
}

export class ActivityFormvalues {
  id?: string = undefined;
  title: string = '';
  description: string = '';
  date: Date | null = null;
  category: string = '';
  city: string = '';
  venue: string = '';

  constructor(activity?: ActivityFormvalues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.city = activity.city;
      this.venue = activity.venue;
    }
  }
}