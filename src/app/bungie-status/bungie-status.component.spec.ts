import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BungieStatusComponent } from './bungie-status.component';

describe('BungieStatusComponent', () => {
  let component: BungieStatusComponent;
  let fixture: ComponentFixture<BungieStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BungieStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BungieStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
