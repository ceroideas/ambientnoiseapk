import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TOfertasPage } from './t-ofertas.page';

describe('TOfertasPage', () => {
  let component: TOfertasPage;
  let fixture: ComponentFixture<TOfertasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TOfertasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TOfertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
