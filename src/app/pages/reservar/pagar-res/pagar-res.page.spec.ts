import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagarResPage } from './pagar-res.page';

describe('PagarResPage', () => {
  let component: PagarResPage;
  let fixture: ComponentFixture<PagarResPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarResPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagarResPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
