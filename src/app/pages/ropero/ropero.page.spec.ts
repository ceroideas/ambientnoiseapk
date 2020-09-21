import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoperoPage } from './ropero.page';

describe('RoperoPage', () => {
  let component: RoperoPage;
  let fixture: ComponentFixture<RoperoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoperoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoperoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
