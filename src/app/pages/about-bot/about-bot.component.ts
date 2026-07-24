import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-about-bot',
    templateUrl: './about-bot.component.html',
    styleUrls: ['./about-bot.component.sass'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [TranslatePipe]
})
export class AboutBotComponent {

  constructor() { }

}
