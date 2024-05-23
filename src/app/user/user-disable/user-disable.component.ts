import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-disable',
  templateUrl: './user-disable.component.html'
})
export class UserDisableComponent implements OnInit {
  public user: User = new User();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getResource(this.id).subscribe(
      user => this.user = user);
  }

  disable(): void {
    this.userService.disable(this.user.username).subscribe({
      next: (user: User) => {
        alert('User Disabled');
        window.location.href = '/users/' + this.id;
      },
      error: (error) => {
        alert('Error disabling user');
      }
    });
  }
}
