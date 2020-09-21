import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LOfertasPage } from './l-ofertas.page';

describe('LOfertasPage', () => {
  let component: LOfertasPage;
  let fixture: ComponentFixture<LOfertasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LOfertasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LOfertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
