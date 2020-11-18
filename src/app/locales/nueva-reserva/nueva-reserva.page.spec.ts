import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaReservaPage } from './nueva-reserva.page';

describe('NuevaReservaPage', () => {
  let component: NuevaReservaPage;
  let fixture: ComponentFixture<NuevaReservaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaReservaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
