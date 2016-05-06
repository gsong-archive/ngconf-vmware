import {Component, Input} from 'angular2/core';
import {Container} from './container';
import {MemoryFormatPipe} from '../util/memoryFormat.pipe';

@Component({
    selector: 'vmw-containers-list',
    template: `
        <table class="vmw-containers-list">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Memory Use</th>
            </tr>
            <tr *ngFor="#container of containers" [style.backgroundColor]="highMemory(container) ? 'lightpink' : 'inherit'">
                <td>{{container.id}}</td>
                <td>{{container.name}}</td>
                <td>{{container.utilization.memory | vmwMemoryFormat}}</td>
            </tr>
        </table>
    `,
    pipes: [MemoryFormatPipe],
    styles: [`
        .vmw-containers-list {
            width: 100%
        }
        
        td {
            text-align: center;
            border-bottom: 1px solid lightgrey;
        }        
    `]
})
export class ContainersListComponent {
    
    @Input()
    containers: Container[];
    
    highMemory(container: Container) {
        return container.utilization.memory > (container.memory * 0.8);
    }
}