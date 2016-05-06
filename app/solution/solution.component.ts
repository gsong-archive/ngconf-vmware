import {Component, OnInit} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';

import 'rxjs/add/operator/map';

import {ContainerService} from '../containers/container.service';
import {ContainersListComponent} from '../containers/containers.component';
import {VmService} from '../vms/vm.service';


@Component({
    selector: 'my-solution',
    providers: [ContainerService, VmService],
    directives: [ContainersListComponent],
    template: `
    <h1>Your Solution Here</h1>
    <dl *ngIf="vm">
      <dt>Name</dt>
      <dd>{{vm.name}}</dd>
      <dt>IP Address</dt>
      <dd>{{vm.ip}}</dd>
    </dl>
    <img [src]="vm?.screenshot">
    <vmw-containers-list [containers]="containers"></vmw-containers-list>
    `,
})
export class SolutionComponent implements OnInit {
  containers;
  vm;

  constructor(
    private _containerService: ContainerService,
    private _vmService: VmService
  ) {}

  ngOnInit() {
    let vmObs = this._vmService.getVm(1);
    vmObs.subscribe(vm => this.vm = vm);
    vmObs.subscribe(vm => this.getContainers(vm));
  }

  getContainers(vm) {
    this._containerService.getContainers(vm.containers)
    .map(containers => containers.filter(
      container => container.state === 'STARTED'
    ))
    .subscribe(
      containers => this.containers = containers
    )
  }
}
