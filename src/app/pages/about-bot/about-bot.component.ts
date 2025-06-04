import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about-bot',
    templateUrl: './about-bot.component.html',
    styleUrls: ['./about-bot.component.sass'],
    standalone: true,
    imports: [CommonModule]
})
export class AboutBotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
