import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable'
import {GeneratorService} from './generator.service';
import {Container} from './container';
import {SimulatorService} from './simulator.service';

/**
 * Service for fetching containers.
 */
export interface IContainerService {
    /**
     * Returns an Observable for the requested containers.
     */
    getContainers(ids: number[]): Observable<Container[]>;
  
}

@Injectable()
export class ContainerService implements IContainerService {

    getContainers(ids: number[]): Observable<Container[]> {
        let containers = this._containers;
        if (ids && ids.length) {
            containers = this._containers.filter(
                (container: Container) => ids.indexOf(container.id) !== -1);
        }

        return Observable.create(observer => {
            observer.next(containers);
            observer.complete();
        });
    } 

    constructor(generator: GeneratorService, simulator: SimulatorService) {
        this._containers = generator.generateContainers(50); 
        simulator.simulateContainerRuntime(this._containers);
    }
    
    private _containers: Container[]

}