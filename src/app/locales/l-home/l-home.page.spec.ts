import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LHomePage } from './l-home.page';

describe('LHomePage', () => {
  let component: LHomePage;
  let fixture: ComponentFixture<LHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
