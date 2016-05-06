import {Container} from './container';

export class GeneratorService {
    
    generateContainers(amount: number) {
        let containers = [];
        
        for (let i = 0; i < amount; i++) {
            containers.push(this.createContainer(i));
        }
        
        return containers;
    }
    
    private _containerNames = [
        'Zeus',
        'Hera',
        'Poseidon',
        'Demeter',
        'Ares',
        'Athena',
        'Apollo',
        'Artemis',
        'Hephaestus',
        'Aphrodite'
    ]
    
    private createContainer(index: number) {
        let container: Container = {
            id: 0,
            name: '',
            state: '',
            memory: 0,
            utilization: {
                cpu: 0,
                memory: 0,
                disk: 0
            }
        };
        
        container.id = index;
        container.name = this._containerNames[index % 10];
        // Every fith container starts in stopped state.
        container.state = (index % 5 === 0) ? 'STOPPED' : 'STARTED';
        // Memory range 500MB --> 16GB
        container.memory = this._getRandomInt(536870912, 17179869184);
        // Memory utilization range 50MB --> memory - 200 MB
        container.utilization.memory = this._getRandomInt(52428800, container.memory - 209715200);
        // Disk utilization range 1GB --> 10GB
        container.utilization.disk = this._getRandomInt(1073741824, 10737418240);
        return container;
    }
    
    private _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
}