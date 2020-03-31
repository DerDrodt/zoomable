import { Point } from "../types";

export const getPoint = (node: SVGElement, e: Touch | MouseEvent): Point => {
    const svg = node.ownerSVGElement || (node as SVGSVGElement);

    let p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    p = p.matrixTransform(
        (node as SVGGraphicsElement).getScreenCTM()!.inverse(),
    );
    return [p.x, p.y];
};

export const dist = (p1: Point, p2: Point): number => {
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    return dx * dx + dy * dy;
};

export const mousePos = (node: SVGElement, e: MouseEvent): Point => {
    return getPoint(node, e);
};

export const touchPos = (
    node: SVGElement,
    touches: TouchList,
    identifier: number,
) => {
    /* tslint:disable-next-line */
    for (let i = 0; i < touches.length; i++) {
        const t = touches[i];
        if (t.identifier === identifier) {
            return getPoint(node, t);
        }
    }

    return null;
};
