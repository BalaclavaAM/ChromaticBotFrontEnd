import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBotComponent } from './about-bot.component';

describe('AboutBotComponent', () => {
  let component: AboutBotComponent;
  let fixture: ComponentFixture<AboutBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutBotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
