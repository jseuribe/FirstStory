import { TestBed } from '@angular/core/testing';

import { RoomchangeService } from './roomchange.service';

describe('RoomchangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomchangeService = TestBed.get(RoomchangeService);
    expect(service).toBeTruthy();
  });
});
