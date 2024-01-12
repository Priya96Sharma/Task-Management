import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const task = [
      {
        id: 1,
        title: 'Create Flowchart',
        description: 'Flowchart should contain nodes to represent mini task and arrows to show flow',
        status: 'Pending',
      },
      {
        id: 2,
        title: 'Go To Market',
        description: 'Items to be fetched from market are Bread, Butter etc',
        status: 'Completed',
      },
      {
        id: 3,
        title: 'Create BioData',
        description: 'Items to be fetched from market are Bread, Butter etc',
        status: 'Pedning',
      },
      {
        id: 4,
        title: 'Run For Fun',
        description: 'Run to have fun in exercise',
        status: 'Completed',
      },
      {
        id: 5,
        title: 'Make New Tamplates',
        description: 'Templates needs to be foccussed',
        status: 'Pending',
      },
      {
        id: 6,
        title: 'Order Food',
        description: 'Order Veg Food for all the members of the team',
        status: 'Pending',
      },
      {
        id: 7,
        title: 'Assign New Task',
        description: 'New Tasks to be assigned before end of the day',
        status: 'Completed',
      },
      {
        id: 8,
        title: 'Create Learning Sesions',
        description: 'Learning Session for each and every employee',
        status: 'Pending',
      }
    ];

    return { task };
  }
}
