import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable'
import {CONTAINERS} from './containers.mock';
import {Container} from './container';
import {SimulatorService} from './simulator.service';

/**
 * Service for fetching and mutating containers.
 */
export interface IContainerService {

    /**
     * Returns an Observable for the container with the given id.
     *
     * @param id
     *    The id of the container to return.
     */
    getContainer(id: number): Observable<Container>;

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

    getContainer(id: number): Observable<Container> {
        let target = CONTAINERS.find((container: Container) => container.id === id);

        return Observable.create(observer => {
            if (target) {
                observer.next(target);
            } else {
                observer.error(`No such container with id ${id}.`);
            }
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

    constructor(simulator: SimulatorService) {
        simulator.simulateContainerRuntime(CONTAINERS);
    }

}
