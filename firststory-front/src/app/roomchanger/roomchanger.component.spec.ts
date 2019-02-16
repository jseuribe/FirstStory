import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomchangerComponent } from './roomchanger.component';

describe('RoomchangerComponent', () => {
  let component: RoomchangerComponent;
  let fixture: ComponentFixture<RoomchangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomchangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomchangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
