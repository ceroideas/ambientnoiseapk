import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoPlatoPage } from './nuevo-plato.page';

describe('NuevoPlatoPage', () => {
  let component: NuevoPlatoPage;
  let fixture: ComponentFixture<NuevoPlatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPlatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoPlatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
