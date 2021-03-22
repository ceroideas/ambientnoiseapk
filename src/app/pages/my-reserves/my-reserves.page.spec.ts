import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyReservesPage } from './my-reserves.page';

describe('MyReservesPage', () => {
  let component: MyReservesPage;
  let fixture: ComponentFixture<MyReservesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReservesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyReservesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
