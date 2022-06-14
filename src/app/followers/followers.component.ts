import {Component, OnInit, Input} from '@angular/core';
import {Follower} from '../follower';
import {FollowerService} from '../follower.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
  providers: [FollowerService],
})
export class FollowersComponent implements OnInit {
  @Input() login: string;
  followers: Follower[] = [];
  selectedFollower?: Follower;

  constructor(private followerService: FollowerService) {
  }

  ngOnInit(): void {
    //this.getFollowers();
  }

  ngAfterViewInit(): void {
    const inputElm = document.getElementById('getFollowers');
    Observable.fromEvent(inputElm, 'click')
      .debounceTime(200)
      .throttleTime(1000)
      .subscribe(res => {
        this.getFollowers();
      });
  }

  onSelect(follower: Follower): void {
    this.selectedFollower = follower;
  }

  getFollowers(): void {
    if (this.login) {
      this.followerService.getFollowers(this.login.trim())
        .subscribe(followers => this.followers = followers);
    }
  }
}
