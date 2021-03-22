import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockedsPage } from './blockeds.page';

describe('BlockedsPage', () => {
  let component: BlockedsPage;
  let fixture: ComponentFixture<BlockedsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
