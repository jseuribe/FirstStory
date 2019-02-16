import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptinjectorComponent } from './scriptinjector.component';

describe('ScriptinjectorComponent', () => {
  let component: ScriptinjectorComponent;
  let fixture: ComponentFixture<ScriptinjectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptinjectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptinjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
