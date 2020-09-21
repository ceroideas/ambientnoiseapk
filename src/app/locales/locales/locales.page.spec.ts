import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalesPage } from './locales.page';

describe('LocalesPage', () => {
  let component: LocalesPage;
  let fixture: ComponentFixture<LocalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
