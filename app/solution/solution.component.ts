import {Component, OnInit} from 'angular2/core';

import {ContainerService} from '../containers/container.service';


@Component({
    selector: 'my-solution',
    providers: [ContainerService],
    template: `
    <h1>Your Solution Here</h1>
    <dl *ngIf="container">
      <dt>ID</dt>
      <dd>{{container.id}}</dd>
      <dt>Name</dt>
      <dd>{{container.name}}</dd>
      <dt>State</dt>
      <dd>{{container.state}}</dd>
      <dt>CPU</dt>
      <dd>{{container.utilization.cpu}}</dd>
      <dt>Memory</dt>
      <dd>{{container.utilization.memory}}</dd>
      <dt>Disk</dt>
      <dd>{{container.utilization.disk}}</dd>
    </dl>
    <button name="start" (click)="start()">Start</button>
    <button name="stop" (click)="stop()">Stop</button>
    `,
})
export class SolutionComponent implements OnInit {
  container;
  containerSubscription;

  constructor(private _containerService: ContainerService) {}

  ngOnInit() {
    this.containerSubscription = this._containerService.getContainer(1)
    .subscribe(
      container => this.container = container;
    );
  }

  start() {
    this.containerSubscription.unsubscribe();
    this.containerSubscription = this._containerService.startContainer(this.container)
    .subscribe(
      container => this.container = container;
    );
  }

  stop() {
    this.containerSubscription.unsubscribe();
    this.containerSubscription = this._containerService.stopContainer(this.container)
    .subscribe(
      container => this.container = container;
    );
  }
}