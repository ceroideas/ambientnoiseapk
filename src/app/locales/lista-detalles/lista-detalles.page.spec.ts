import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaDetallesPage } from './lista-detalles.page';

describe('ListaDetallesPage', () => {
  let component: ListaDetallesPage;
  let fixture: ComponentFixture<ListaDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
