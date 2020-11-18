import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaSalaPage } from './nueva-sala.page';

describe('NuevaSalaPage', () => {
  let component: NuevaSalaPage;
  let fixture: ComponentFixture<NuevaSalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaSalaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaSalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
