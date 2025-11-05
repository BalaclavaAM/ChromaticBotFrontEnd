import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-about-bot',
    templateUrl: './about-bot.component.html',
    styleUrls: ['./about-bot.component.sass'],
    standalone: true,
    imports: [CommonModule, TranslateModule]
})
export class AboutBotComponent {

  constructor() { }

}
