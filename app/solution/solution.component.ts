import {Component, OnInit} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';

import {ContainerService} from '../containers/container.service';
import {MemoryFormatPipe} from '../util/memoryFormat.pipe';


@Component({
    selector: 'my-solution',
    providers: [ContainerService],
    directives: [NgFor, NgIf],
    pipes: [MemoryFormatPipe],
    template: `
    <h1>Your Solution Here</h1>
    <button *ngIf="!filtered" name="filter" (click)="filterByMemoryUsage()">
      Show Containers Using > 80% of Memory
    </button>
    <button *ngIf="filtered" name="filter" (click)="unfilter()">
      Show All
    </button>
    <table>
      <thead>
        <tr>
          <th>
            <a *ngIf="sortOrder === 'asc'" (click)="sortById(true)">ID ↓</a>
            <a *ngIf="sortOrder === 'desc'" (click)="sortById()">ID ↑</a>
          </th>
          <th>Name</th>
          <th>State</th>
          <th>CPU</th>
          <th>Memory</th>
          <th>Disk</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="#container of containers">
          <td>{{container.id}}</td>
          <td>{{container.name}}</td>
          <td>{{container.state}}</td>
          <td>{{container.utilization.cpu}}</td>
          <td>{{container.utilization.memory | vmwMemoryFormat}}</td>
          <td>{{container.utilization.disk | vmwMemoryFormat}}</td>
          <td>
            <button name="start" (click)="start(container)">
              Start
            </button>
          </td>
          <td>
            <button name="stop" (click)="stop(container)">
              Stop
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <dl *ngIf="container">
    </dl>
    `,
})
export class SolutionComponent implements OnInit {
  containers;
  containersSubscription;
  filtered = false;
  sortOrder = 'asc';

  constructor(private _containerService: ContainerService) {}

  _subscribe() {
    this.containersSubscription = this._containerService.getContainers()
    .subscribe(
      containers => this.containers = containers;
    );
  }

  ngOnInit() {
    this._subscribe();
  }

  start(container) {
    return this._containerService.startContainer(container).subscribe();
  }

  stop(container) {
    return this._containerService.stopContainer(container).subscribe();
  }

  sortById(reversed=false) {
    let _containers = [...this.containers];
    _containers.sort(compare);
    this.sortOrder = 'asc';

    if (reversed) {
      _containers.reverse();
      this.sortOrder = 'desc';
    }

    this.containers = _containers;
  }

  filterByMemoryUsage() {
    this.containersSubscription.unsubscribe();
    this.containersSubscription = this._containerService.getContainers()
    .subscribe(
      containers => this.containers = containers.filter(
        x => x.utilization.memory / x.memory > 0.8
      )
    );
    this.filtered = true;
  }

  unfilter() {
    this.containersSubscription.unsubscribe();
    this._subscribe();
    this.filtered = false;
  }
}

function compare(a, b) {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}
