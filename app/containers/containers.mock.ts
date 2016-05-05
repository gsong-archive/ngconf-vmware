import {Container} from './container';

export var CONTAINERS: Container[] = [
    {
        id: 1,
        name: 'Zeus',
        state: 'STARTED',
        // 6 GB
        memory: 6442450944,
        utilization: {
            cpu: 0,
            // 2 GB
            memory: 2147483648,
            // 10 GB
            disk: 10737418240,
        }
    }
];