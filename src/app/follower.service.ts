import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Follower} from './follower';
import { Http , Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FollowerService {
  constructor(private _http: Http) { }

  getFollowers(login: string): Observable<Follower[]> {
    return this._http.get(`https://api.github.com/users/${login}/followers`)
      .map((response: Response) => <Follower[]>response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    if (error.status === 0) {
      console.error('An error occurred:', error.statusText);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.statusText);
    }
    return Observable.throw(new Error(error.statusText));
  }
}
