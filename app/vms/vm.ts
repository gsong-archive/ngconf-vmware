/**
 * Basic identifying information for a Virtual Machine, plus the ids
 * of containers it is hosting.
 */
export class Vm {
    /**
     * Unique identifier for the VM
     */
    id: number;

    /**
     * Name of the VM
     */
    name: string;

    /**
     * I.P. address of the VM
     */
    ip: string;

    /**
     * Relative path of the latest screenshot image for the VM
     */
    screenshot: string;

    /**
     * List of IDs of the containers this VM is hosting.
     */
    containers: number[];
}
