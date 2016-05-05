import {Injectable} from 'angular2/core';
import {Container} from './container';

@Injectable()
export class SimulatorService {
    
    public simulateContainerRuntime(containers: Container[]) {
        setInterval(() => containers.map((container) => this._updateContainerCPU(container)), 1000);
        setInterval(() => containers.map((container) => this._updateContainerMemory(container)), 4000);
        setInterval(() => containers.map((container) => this._updateContainerDisk(container)), 7000);
    }
    
    private _updateContainerCPU(container: Container) {
        if (container.state === 'STOPPED') {
            // Stopped containers don't have live updates.
            return;
        }        
        container.utilization.cpu = this._getNextCpuStat();
    }
    
    private _updateContainerMemory(container: Container) {
        if (container.state === 'STOPPED') {
            // Stopped containers don't have live updates.
            return;
        }          
        container.utilization.memory = this._getNextMemoryStat(container);
    }
    
    private _updateContainerDisk(container: Container) {
        if (container.state === 'STOPPED') {
            // Stopped containers don't have live updates.
            return;
        }
        container.utilization.disk = this._getNextDiskStat(container);
    }        
    
    private _getNextCpuStat() {
        return this._getRandomInt(0, 101);
    }
    
    private _getNextMemoryStat(container: Container) {
        // .25 MB
        const MIN_INCREASE = 262144;
        // 10 MB
        const MAX_INCREASE = 10485760;
        
        let increase = this._getRandomInt(MIN_INCREASE, MAX_INCREASE);
        
        return Math.min(increase + container.utilization.memory, container.memory);
    }
    
    private _getNextDiskStat(container: Container) {
        // 10 MB
        const MIN_INCREASE = 10485760;
        // 250 MB
        const MAX_INCREASE = 262144000;
        
        let increase = this._getRandomInt(MIN_INCREASE, MAX_INCREASE);
        
        return increase + container.utilization.disk;
    }

    private _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }    
}