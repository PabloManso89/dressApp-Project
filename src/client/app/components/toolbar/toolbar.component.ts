import {Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() color: ThemePalette
  constructor() { }

  ngOnInit() {
  }

}
