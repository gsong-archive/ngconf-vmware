import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';
import {VMS} from './vms.mock';
import {Vm} from './vm';

/**
 * Service for fetching VMs.
 */
export interface IVmService {
    /**
     * Returns an Observable for the VM with the given id.
     *
     * @param id
     *    The id of the VM to return.
     */
    getVm(id: number): Observable<Vm>;
}

@Injectable()
export class VmService implements IVmService {
    
    getVm(id: number): Observable<Vm> {
        let target = VMS.find((vm: Vm) => vm.id === id);

        return Observable.create(observer => {
            if (target) {
                observer.next(target);
            } else {
                observer.error(`No such VM with id ${id}.`);
            }
            observer.complete();
        });
    }    
}
