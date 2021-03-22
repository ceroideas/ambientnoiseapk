import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagarRPage } from './pagar-r.page';

describe('PagarRPage', () => {
  let component: PagarRPage;
  let fixture: ComponentFixture<PagarRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagarRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
