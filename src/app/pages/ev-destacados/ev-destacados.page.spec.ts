import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvDestacadosPage } from './ev-destacados.page';

describe('EvDestacadosPage', () => {
  let component: EvDestacadosPage;
  let fixture: ComponentFixture<EvDestacadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvDestacadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvDestacadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
