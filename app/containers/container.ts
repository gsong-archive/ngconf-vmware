/**
 * Basic information and runtime statistics for a container.
 */
export class Container {
    /**
     * Unique identifier for the container
     */
    id: number;

    /**
     * Name of the container
     */
    name: string;

    /**
     * State of the container. May be 'STOPPED'
     * or 'STARTED'.
     */
    state: string;

    /**
     * Maximum accessible RAM for the container in Bytes.
     */
    memory: number;

    /**
     * Runtime utilization stats.
     */
    utilization: Utilization;
}

/**
 * Runtime statistics for a container.
 */
export class Utilization {
    /**
     * Percentage CPU utilized
     */
    cpu: number;

    /**
     * Amount of RAM being consumed in Bytes
     */
    memory: number;

    /**
     * Amount of disk being consumed in Bytes
     */
    disk: number;
}
