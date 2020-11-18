import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisReservasPage } from './mis-reservas.page';

describe('MisReservasPage', () => {
  let component: MisReservasPage;
  let fixture: ComponentFixture<MisReservasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisReservasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisReservasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
