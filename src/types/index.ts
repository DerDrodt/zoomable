export interface Transform {
    x: number;
    y: number;
    k: number;
}

export type Point = [number, number];

export type Extent = [Point, Point];

export interface GoToEvent extends CustomEvent {
    detail: any;
}
