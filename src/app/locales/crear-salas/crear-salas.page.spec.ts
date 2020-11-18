import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearSalasPage } from './crear-salas.page';

describe('CrearSalasPage', () => {
  let component: CrearSalasPage;
  let fixture: ComponentFixture<CrearSalasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSalasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearSalasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
