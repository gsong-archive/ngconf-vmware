import {Component, OnInit} from 'angular2/core';

import {ContainerService} from '../containers/container.service';
import {MemoryFormatPipe} from '../util/memoryFormat.pipe';


@Component({
    selector: 'my-solution',
    providers: [ContainerService],
    pipes: [MemoryFormatPipe],
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
      <dd>{{container.utilization.memory | vmwMemoryFormat}}</dd>
      <dt>Disk</dt>
      <dd>{{container.utilization.disk | vmwMemoryFormat}}</dd>
    </dl>
    <button name="start" (click)="start()">Start</button>
    <button name="stop" (click)="stop()">Stop</button>
    `,
})
export class SolutionComponent implements OnInit {
  container;
  _containerSubscription;

  constructor(private _containerService: ContainerService) {}

  ngOnInit() {
    this._subscribe(this._containerService.getContainer(1));
  }

  _subscribe(obs) {
    this._containerSubscription = obs.subscribe(
      container => this.container = container;
    );
  }

  _unsubscribe() {
    this._containerSubscription.unsubscribe();
  }

  start() {
    this._unsubscribe();
    this._subscribe(this._containerService.startContainer(this.container));
  }

  stop() {
    this._unsubscribe();
    this._subscribe(this._containerService.stopContainer(this.container));
  }
}