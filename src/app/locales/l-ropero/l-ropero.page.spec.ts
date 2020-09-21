import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LRoperoPage } from './l-ropero.page';

describe('LRoperoPage', () => {
  let component: LRoperoPage;
  let fixture: ComponentFixture<LRoperoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LRoperoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LRoperoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
