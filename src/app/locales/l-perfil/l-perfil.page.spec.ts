import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LPerfilPage } from './l-perfil.page';

describe('LPerfilPage', () => {
  let component: LPerfilPage;
  let fixture: ComponentFixture<LPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPerfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
