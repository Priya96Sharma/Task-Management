import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(TaskService);
  });

  it("should have 2 entries in db", () => {
    var array = []
    service.getAllTasks().subscribe((res: any) => {
      array = res;
      expect(array.length).toBeGreaterThanOrEqual(2);
    });
  });
});
