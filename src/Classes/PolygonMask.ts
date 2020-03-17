"use strict";

import {Container} from "./Container";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {Particle} from "./Particle";
import {PolygonMaskInlineArrangement} from "../Enums/PolygonMaskInlineArrangement";

type SvgAbsoluteCoordinatesTypes =
    | SVGPathSegArcAbs
    | SVGPathSegCurvetoCubicAbs
    | SVGPathSegCurvetoCubicSmoothAbs
    | SVGPathSegCurvetoQuadraticAbs
    | SVGPathSegCurvetoQuadraticSmoothAbs
    | SVGPathSegLinetoAbs
    | SVGPathSegMovetoAbs;

type SvgRelativeCoordinatesTypes =
    | SVGPathSegArcRel
    | SVGPathSegCurvetoCubicRel
    | SVGPathSegCurvetoCubicSmoothRel
    | SVGPathSegCurvetoQuadraticRel
    | SVGPathSegCurvetoQuadraticSmoothRel
    | SVGPathSegLinetoRel
    | SVGPathSegMovetoRel;

/**
 * Polygon Mask manager
 */
export class PolygonMask {
    public redrawTimeout?: number;
    public raw?: ICoordinates[];
    public svg?: SVGSVGElement;
    public path?: SVGPathElement;

    private readonly container: Container;
    private readonly path2DSupported: boolean;
    private polygonPath?: Path2D;
    private polygonPathLength: number;
    private width: number;
    private height: number;
    private offset?: ICoordinates;

    constructor(container: Container) {
        this.container = container;
        this.width = 0;
        this.height = 0;
        this.polygonPathLength = 0;
        this.path2DSupported = window.hasOwnProperty("Path2D");
    }

    public checkInsidePolygon(position: ICoordinates | undefined | null): boolean {
        const container = this.container;
        const options = container.options;

        if (!options.polygon.enable ||
            options.polygon.type === PolygonMaskType.none ||
            options.polygon.type === PolygonMaskType.inline) {
            return true;
        }

        // https://github.com/substack/point-in-polygon
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        if (!this.raw) {
            console.error('No polygon found, you need to specify SVG url in config.');
            return true;
        }

        const x = position ? position.x : Math.random() * container.canvas.dimension.width;
        const y = position ? position.y : Math.random() * container.canvas.dimension.height;
        let inside = false;

        if (this.path2DSupported && this.polygonPath && position) {
            inside = container.canvas.isPointInPath(this.polygonPath, position);
        } else {
            for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
                const xi = this.raw[i].x;
                const yi = this.raw[i].y;
                const xj = this.raw[j].x;
                const yj = this.raw[j].y;
                const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

                if (intersect) {
                    inside = !inside;
                }
            }
        }

        if (options.polygon.type === PolygonMaskType.inside) {
            return inside;
        } else if (options.polygon.type === PolygonMaskType.outside) {
            return !inside;
        }

        return false;
    }

    public randomPointInPolygon(): ICoordinates {
        const container = this.container;
        const options = container.options;

        let position: ICoordinates;

        if (options.polygon.type === PolygonMaskType.inline) {
            switch (options.polygon.inline.arrangement) {
                case PolygonMaskInlineArrangement.randomPoint:
                    position = this.getRandomPointOnPolygonPath();
                    break;
                case PolygonMaskInlineArrangement.randomLength:
                    position = this.getRandomPointOnPolygonPathByLength();
                    break;
                case PolygonMaskInlineArrangement.equidistant:
                    position = this.getEquidistantPointOnPolygonPathByIndex(container.particles.array.length);
                    break;
                case PolygonMaskInlineArrangement.onePerPoint:
                default:
                    position = this.getPoingOnPolygonPathByIndex(
                        container.particles.array.length
                    );
            }
        } else {
            position = {
                x: Math.random() * container.canvas.dimension.width,
                y: Math.random() * container.canvas.dimension.height,
            };
        }

        if (this.checkInsidePolygon(position)) {
            return position;
        } else {
            return this.randomPointInPolygon();
        }
    }

    /**
     * Depends on SVGPathSeg API polyfill https://github.com/progers/pathseg for Chrome
     * Deprecate SVGPathElement.getPathSegAtLength removed in:
     * Chrome for desktop release 62
     * Chrome for Android release 62
     * Android WebView release 62
     * Opera release 49
     * Opera for Android release 49
     */
    public async parseSvgPathToPolygon(svgUrl?: string): Promise<ICoordinates[] | undefined> {
        const container = this.container;
        const options = container.options;
        const url = svgUrl || options.polygon.url;

        // Load SVG from file on server
        if (!this.path || !this.svg) {
            const req = await fetch(url);
            if (req.ok) {
                const xml = await req.text();

                const parser = new DOMParser();

                const doc = parser.parseFromString(xml, "image/svg+xml");

                this.svg = doc.getElementsByTagName("svg")[0];
                this.path = doc.getElementsByTagName("path")[0];

                if (this.path) {
                    this.polygonPathLength = this.path.getTotalLength();
                }

                this.createPath2D();
            } else {
                console.error("tsParticles Error - during polygon mask download");
                return;
            }
        }

        const scale = options.polygon.scale;

        this.width = parseFloat(this.svg.getAttribute("width") || "0") * scale;
        this.height = parseFloat(this.svg.getAttribute("height") || "0") * scale;

        /* centering of the polygon mask */
        this.offset = {
            x: container.canvas.dimension.width / 2 - this.width / 2,
            y: container.canvas.dimension.height / 2 - this.height / 2,
        };

        const len = this.path.pathSegList.numberOfItems;
        const polygonRaw: ICoordinates[] = [];
        const p = {
            x: 0,
            y: 0,
        };

        for (let i = 0; i < len; i++) {
            const segment: SVGPathSeg = this.path.pathSegList.getItem(i);

            switch (segment.pathSegType) {
                //
                // Absolute
                //
                case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
                case window.SVGPathSeg.PATHSEG_LINETO_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                case window.SVGPathSeg.PATHSEG_ARC_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
                    const absSeg = segment as SvgAbsoluteCoordinatesTypes;

                    p.x = absSeg.x;
                    p.y = absSeg.y;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                    p.x = (segment as SVGPathSegLinetoHorizontalAbs).x;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                    p.y = (segment as SVGPathSegLinetoVerticalAbs).y;
                    break;

                //
                // Relative
                //
                case window.SVGPathSeg.PATHSEG_LINETO_REL:
                case window.SVGPathSeg.PATHSEG_MOVETO_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                case window.SVGPathSeg.PATHSEG_ARC_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
                    const relSeg = segment as SvgRelativeCoordinatesTypes;

                    p.x += relSeg.x;
                    p.y += relSeg.y;
                    break;

                case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                    p.x += (segment as SVGPathSegLinetoHorizontalRel).x;
                    break;
                case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                    p.y += (segment as SVGPathSegLinetoVerticalRel).y;
                    break;

                case window.SVGPathSeg.PATHSEG_UNKNOWN:
                case window.SVGPathSeg.PATHSEG_CLOSEPATH:
                    continue; // Skip the closing path (and the UNKNOWN)
            }

            polygonRaw.push({
                x: p.x * scale + this.offset.x,
                y: p.y * scale + this.offset.y,
            });
        }

        return polygonRaw;
    }

    public drawPolygon(): void {
        const container = this.container;

        if (this.raw) {
            container.canvas.drawPolygonMask(this.raw);
        }
    }

    public drawPointsOnPolygonPath(): void {
        const container = this.container;

        if (this.raw) {
            for (const item of this.raw) {
                const position = {
                    x: item.x,
                    y: item.y,
                };
                const particle = new Particle(container, position);

                container.particles.array.push(particle);
            }
        }
    }

    private getRandomPointOnPolygonPath(): ICoordinates {
        if (!this.raw || !this.raw.length) throw new Error(`No polygon data loaded.`);

        const coords = this.raw[Math.floor(Math.random() * this.raw.length)];

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private getRandomPointOnPolygonPathByLength(): ICoordinates {
        const container = this.container;
        const options = container.options;

        if (!this.raw || !this.raw.length || !this.path) throw new Error(`No polygon data loaded.`);

        const distance = Math.floor(Math.random() * this.polygonPathLength) + 1;
        const point = this.path.getPointAtLength(distance);

        return {
            x: point.x * options.polygon.scale + (this.offset?.x || 0),
            y: point.y * options.polygon.scale + (this.offset?.y || 0),
        };
    }

    private getEquidistantPointOnPolygonPathByIndex(index: number): ICoordinates {
        const container = this.container;
        const options = container.options;

        if (!this.raw || !this.raw.length || !this.path) throw new Error(`No polygon data loaded.`);

        const distance = (this.polygonPathLength / options.particles.number.value) * index;
        const point = this.path.getPointAtLength(distance);

        return {
            x: point.x * options.polygon.scale + (this.offset?.x || 0),
            y: point.y * options.polygon.scale + (this.offset?.y || 0),
        };
    }

    private getPoingOnPolygonPathByIndex(index: number): ICoordinates {
        if (!this.raw || !this.raw.length) throw new Error(`No polygon data loaded.`);

        const coords = this.raw[index % this.raw.length];

        return {
            x: coords.x,
            y: coords.y,
        };
    }

    private createPath2D(): void {
        if (!this.path2DSupported || !this.raw) {
            return;
        }

        this.polygonPath = new Path2D();
        this.polygonPath.moveTo(this.raw[0].x, this.raw[0].y);

        this.raw.forEach((pos, i) => {
            if (i > 0) {
                this.polygonPath?.lineTo(pos.x, pos.y);
            }
        });

        this.polygonPath.closePath();
    }
}
