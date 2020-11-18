import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerImagenPage } from './ver-imagen.page';

describe('VerImagenPage', () => {
  let component: VerImagenPage;
  let fixture: ComponentFixture<VerImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImagenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
