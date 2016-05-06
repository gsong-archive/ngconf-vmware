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
     * Returns an Observable for all of the containers in the system.
     */
    getContainers(): Observable<Container[]>;
    
    /**
     * Starts the given container and returns an observable of the mutated container.
     *
     * @param container
     *    The container to start.
     */
    startContainer(container: Container): Observable<Container>;

    /**
     * Stops the given container and returns an observable of the mutated container.
     *
     * @param container
     *    The container to stop.
     */
    stopContainer(container: Container): Observable<Container>;    
}

@Injectable()
export class ContainerService implements IContainerService {

    getContainers(): Observable<Container[]> {
        return Observable.create(observer => {
            observer.next(this._containers);
            observer.complete();
        });
    }
    
    startContainer(container: Container): Observable<Container> {
        container.state = 'STARTED';
        return Observable.create(observer => {
            observer.next(container);
            observer.complete();
        });
    }

    stopContainer(container: Container): Observable<Container> {
        container.state = 'STOPPED';
        container.utilization.cpu = 0;
        container.utilization.memory = 0;
        return Observable.create(observer => {
            observer.next(container);
            observer.complete();
        });
    }    

    constructor(generator: GeneratorService, simulator: SimulatorService) {
        this._containers = generator.generateContainers(50); 
        simulator.simulateContainerRuntime(this._containers);
    }
    
    private _containers: Container[]

}

