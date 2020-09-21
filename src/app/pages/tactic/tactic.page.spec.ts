import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TacticPage } from './tactic.page';

describe('TacticPage', () => {
  let component: TacticPage;
  let fixture: ComponentFixture<TacticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TacticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
