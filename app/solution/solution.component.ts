import {Component, OnInit} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {ContainerService} from '../containers/container.service';


@Component({
    selector: 'my-solution',
    providers: [ContainerService],
    directives: [NgFor],
    template: `
    <h1>Your Solution Here</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
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
          <td>{{container.utilization.memory}}</td>
          <td>{{container.utilization.disk}}</td>
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

  constructor(private _containerService: ContainerService) {}

  ngOnInit() {
    this.containerSubscription = this._containerService.getContainers()
    .subscribe(
      containers => this.containers = containers;
    );
  }

  start(container) {
    return this._containerService.startContainer(container).subscribe();
  }

  stop(container) {
    return this._containerService.stopContainer(container).subscribe();
  }
}