import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NotificationService} from '../service/notification.service';
import {User} from '../user/User';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ProfileComponent>,
              private notiService: NotificationService,
              private userService: UserService) { }

  user: User = new User();
  msg: string[] = [];
  ngOnInit() {
    console.log(this.data);
    this.userService.getUserById(this.data.userId).subscribe(value => {
      this.user = value;
      console.log(value);
    });
  }

  update() {
    this.msg.push('Backend need to be implemented');
    // this.dialogRef.close();
    this.userService.updateUser(this.user).subscribe(value => {
      console.log(value);
    });
  }
}
