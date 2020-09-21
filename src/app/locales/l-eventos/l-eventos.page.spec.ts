import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LEventosPage } from './l-eventos.page';

describe('LEventosPage', () => {
  let component: LEventosPage;
  let fixture: ComponentFixture<LEventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LEventosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
