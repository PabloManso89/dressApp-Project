import {Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() color: ThemePalette;
  constructor(
    private _userService: UsersService
  ) { }

  ngOnInit() {
  }

  logout() {
    this._userService.logOutUser();
  }
}
