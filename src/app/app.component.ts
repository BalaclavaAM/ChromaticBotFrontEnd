import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'chromatic-bot';

  constructor (public translate: TranslateService){
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  public switchLenguage(lang: string){
    this.translate.use(lang);
  }
}
