import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalaDetallePage } from './sala-detalle.page';

describe('SalaDetallePage', () => {
  let component: SalaDetallePage;
  let fixture: ComponentFixture<SalaDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
