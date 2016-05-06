import {Component, OnInit} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';

import 'rxjs/add/operator/map';

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
  _containersObservable;
  _containersSubscription;
  containers;
  filtered = false;
  sortOrder = 'asc';

  constructor(private _containerService: ContainerService) {}

  ngOnInit() {
    this._containersObservable = this._containerService.getContainers();
    this._subscribe(this._containersObservable);
  }

  _subscribe(obs) {
    this._containersSubscription = obs.subscribe(
      containers => this.containers = containers;
    );
  }

  _unsubscribe() {
    this._containersSubscription.unsubscribe();
  }

  start(container) {
    return this._containerService.startContainer(container).subscribe();
  }

  stop(container) {
    return this._containerService.stopContainer(container).subscribe();
  }

  sortById(reversed=false) {
    let obs = this._containersObservable.map(containers => {
      let _containers = [...containers];
      _containers.sort(compare);
      this.sortOrder = 'asc';

      if (reversed) {
        _containers.reverse();
        this.sortOrder = 'desc';
      }

      return _containers;
    })
    this._unsubscribe();
    this._subscribe(obs);
  }

  filterByMemoryUsage() {
    let obs = this._containersObservable.map(containers => {
      return containers.filter(x => x.utilization.memory / x.memory > 0.8)
    }
    this._unsubscribe();
    this._subscribe(obs);
    this.filtered = true;
  }

  unfilter() {
    this._unsubscribe();
    this._subscribe(this._containersObservable);
    this.filtered = false;
  }
}

function compare(a, b) {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}
