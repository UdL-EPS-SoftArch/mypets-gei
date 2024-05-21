import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../login-basic/user';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getResource(id).subscribe(
      user => {
        this.user = new User(user);
      });
  }

  getCurrentUser(): User {
    return this.authenticationService.getCurrentUser();
  }

  enable(): void {
    this.userService.enable(this.user.username).subscribe({
      next: (user: User) => {
        alert('User Enabled');
        window.location.reload();
      },
      error: (error) => {
        alert('Error enabling user');
      }
    });
  }
}
