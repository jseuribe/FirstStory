import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomobjectComponent } from './roomobject.component';

describe('RoomobjectComponent', () => {
  let component: RoomobjectComponent;
  let fixture: ComponentFixture<RoomobjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomobjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
