"use strict";

import {Bubbler} from "./Particle/Bubbler";
import {Container} from "./Container";
import {Drawer} from "./Particle/Drawer";
import {Grabber} from "./Particle/Grabber";
import {IVelocity} from "../Interfaces/IVelocity";
import {ISize} from "../Interfaces/ISize";
import {IOpacity} from "../Interfaces/IOpacity";
import {ICoordinates} from "../Interfaces/ICoordinates";
import {IParticleImage} from "../Interfaces/IParticleImage";
import {Repulser} from "./Particle/Repulser";
import {ShapeType} from "../Enums/ShapeType";
import {Updater} from "./Particle/Updater";
import {Utils} from "./Utils/Utils";
import {PolygonMaskType} from "../Enums/PolygonMaskType";
import {Connecter} from "./Particle/Connecter";
import {IRgb} from "../Interfaces/IRgb";
import {IOptions} from "../Interfaces/Options/IOptions";
import {InteractionManager} from "./Particle/InteractionManager";
import {HoverMode} from "../Enums/Modes/HoverMode";
import {ClickMode} from "../Enums/Modes/ClickMode";
import {RotateDirection} from "../Enums/RotateDirection";
import {ICharacterShape} from "../Interfaces/Options/Particles/Shape/ICharacterShape";

/**
 * The single particle object
 */
export class Particle {
    public angle: number;
    public rotateDirection: RotateDirection;
    public radius: number;
    public readonly text?: string;
    public readonly size: ISize;
    public readonly initialPosition?: ICoordinates;
    public readonly position: ICoordinates;
    public readonly offset: ICoordinates;
    public readonly color: IRgb | undefined;
    public readonly opacity: IOpacity;
    public readonly velocity: IVelocity;
    public readonly shape?: ShapeType;
    public readonly image?: IParticleImage;
    public readonly character?: ICharacterShape;
    public readonly initialVelocity: IVelocity;

    public readonly updater: Updater;
    public readonly bubbler: Bubbler;
    public readonly repulser: Repulser;
    public readonly connecter: Connecter;
    public readonly drawer: Drawer;
    public readonly grabber: Grabber;
    public readonly interactionManager: InteractionManager;
    public readonly container: Container;

    /* --------- tsParticles functions - particles ----------- */
    constructor(container: Container, position?: ICoordinates) {
        this.container = container;
        const options = container.options;
        const color = options.particles.color;

        /* size */
        this.size = {};
        this.angle = options.particles.rotate.random ? Math.random() * 360 : options.particles.rotate.value;

        if (options.particles.rotate.direction == RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);

            if (index > 0) {
                this.rotateDirection = RotateDirection.counterClockwise;
            } else {
                this.rotateDirection = RotateDirection.clockwise;
            }
        } else {
            this.rotateDirection = options.particles.rotate.direction;
        }

        this.radius = (options.particles.size.random ? Math.random() : 1) * container.retina.sizeValue;

        if (options.particles.size.animation.enable) {
            this.size.status = false;
            this.size.velocity = container.retina.sizeAnimationSpeed / 100;

            if (!options.particles.size.animation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }

        if (options.particles.rotate.animation.enable) {
            if (!options.particles.rotate.animation.sync) {
                this.angle = Math.random() * 360;
            }
        }

        /* position */
        this.position = this.calcPosition(this.container, position);

        if (options.polygon.enable && options.polygon.type === PolygonMaskType.inline) {
            this.initialPosition = {
                x: this.position.x,
                y: this.position.y,
            };
        }

        /* parallax */
        this.offset = {
            x: 0,
            y: 0,
        };

        /* check position - avoid overlap */
        if (options.particles.move.collisions) {
            this.checkOverlap(position);
        }

        /* color */
        this.color = Utils.getParticleColor(color);

        /* opacity */
        this.opacity = {
            value: (options.particles.opacity.random ? Math.random() : 1) * options.particles.opacity.value,
        };

        if (options.particles.opacity.animation.enable) {
            this.opacity.status = false;
            this.opacity.velocity = options.particles.opacity.animation.speed / 100;

            if (!options.particles.opacity.animation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }

        /* animation - velocity for speed */
        this.initialVelocity = Particle.calculateVelocity(options);
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };

        /* if shape is image */
        const shapeType = options.particles.shape.type;

        if (shapeType instanceof Array) {
            this.shape = shapeType[Math.floor(Math.random() * shapeType.length)];
        } else {
            this.shape = shapeType;
        }

        if (this.shape === ShapeType.image) {
            const shape = options.particles.shape;
            const index = Math.floor(Math.random() * container.images.length);
            const image = container.images[index];
            const optionsImage = shape.image instanceof Array ? shape.image[index] : shape.image;
            this.image = {
                data: image,
                ratio: optionsImage.width / optionsImage.height,
                replaceColor: optionsImage.replaceColor,
                src: optionsImage.src,
            };

            if (!this.image.ratio) {
                this.image.ratio = 1;
            }
        }

        if (this.shape === ShapeType.char || this.shape === ShapeType.character) {
            if (options.particles.shape.character instanceof Array) {
                const arr = options.particles.shape.character;
                this.character = arr[Math.floor(Math.random() * arr.length)];
            } else {
                this.character = options.particles.shape.character;
            }

            const value = this.character.value;

            if (value instanceof Array) {
                this.text = value[Math.floor(Math.random() * value.length)]
            } else {
                this.text = value;
            }
        }

        this.updater = new Updater(this.container, this);
        this.bubbler = new Bubbler(this.container, this);
        this.repulser = new Repulser(this.container, this);
        this.drawer = new Drawer(this.container, this);
        this.grabber = new Grabber(this.container, this);
        this.connecter = new Connecter(this.container, this);
        this.interactionManager = new InteractionManager(this.container, this);
    }

    private static calculateVelocity(options: IOptions): IVelocity {
        const baseVelocity = Utils.getParticleBaseVelocity(options);
        const res = {
            horizontal: 0,
            vertical: 0,
        };

        if (options.particles.move.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;

            if (options.particles.move.random) {
                res.horizontal *= Math.random();
                res.vertical *= Math.random();
            }
        } else {
            res.horizontal = baseVelocity.x + Math.random() - 0.5;
            res.vertical = baseVelocity.y + Math.random() - 0.5;
        }

        // const theta = 2.0 * Math.PI * Math.random();

        // res.x = Math.cos(theta);
        // res.y = Math.sin(theta);

        return res;
    }

    public resetVelocity(): void {
        const container = this.container;
        const options = container.options;
        const velocity = Particle.calculateVelocity(options);

        this.velocity.horizontal = velocity.horizontal;
        this.velocity.vertical = velocity.vertical;
    }

    public update(index: number, delta: number): void {
        const container = this.container;
        const options = container.options;

        this.updater.update(delta);

        const hoverMode = options.interactivity.events.onHover.mode;
        const clickMode = options.interactivity.events.onClick.mode;

        /* events */
        if (Utils.isInArray(HoverMode.grab, hoverMode)) {
            this.grabber.grab();
        }

        //  New interactivity `connect` which would just connect the particles on hover

        if (Utils.isInArray(HoverMode.connect, options.interactivity.events.onHover.mode)) {
            for (let j = index + 1; j < container.particles.array.length; j++) {
                const p2 = container.particles.array[j];
                this.connecter.connect(p2);
            }
        }

        if (Utils.isInArray(HoverMode.bubble, hoverMode) || Utils.isInArray(ClickMode.bubble, clickMode)) {
            this.bubbler.bubble();
        }

        if (Utils.isInArray(HoverMode.repulse, hoverMode) || Utils.isInArray(ClickMode.repulse, clickMode)) {
            this.repulser.repulse();
        }
    }

    public interact(p2: Particle): void {
        this.interactionManager.interact(p2);
    }

    public draw(): void {
        this.drawer.draw();
    }

    public isOverlapping(): { collisionFound: boolean, iterations: number } {
        const container = this.container;
        const p = this;
        let collisionFound = false;
        let iterations = 0;

        for (const p2 of container.particles.array.filter((t) => t != p)) {
            iterations++;
            const dist = Utils.getDistanceBetweenCoordinates(p.position, p2.position);

            if (dist <= p.radius + p2.radius) {
                collisionFound = true;
                break;
            }
        }

        return {
            collisionFound: collisionFound,
            iterations: iterations,
        };
    }

    public checkOverlap(position?: ICoordinates): void {
        const container = this.container;
        const p = this;
        const overlapResult = p.isOverlapping();

        if (overlapResult.iterations >= container.particles.array.length) {
            const idx = container.particles.array.indexOf(this);

            if (idx >= 0) {
                // too many particles, removing from the current
                container.particles.array.splice(idx);
            }
        }

        if (overlapResult.collisionFound) {
            p.position.x = position ? position.x : Math.random() * container.canvas.dimension.width;
            p.position.y = position ? position.y : Math.random() * container.canvas.dimension.height;

            p.checkOverlap();
        }
    }

    private calcPosition(container: Container, position?: ICoordinates): ICoordinates {
        const pos = {x: 0, y: 0};

        if (container.polygon.raw && container.polygon.raw.length > 0) {
            if (position) {
                pos.x = position.x;
                pos.y = position.y;
            } else {
                const randomPoint = container.polygon.randomPointInPolygon();

                pos.x = randomPoint.x;
                pos.y = randomPoint.y;
            }
        } else {
            pos.x = position ? position.x : Math.random() * container.canvas.dimension.width;
            pos.y = position ? position.y : Math.random() * container.canvas.dimension.height;

            /* check position  - into the canvas */
            if (pos.x > container.canvas.dimension.width - this.radius * 2) {
                pos.x -= this.radius;
            } else if (pos.x < this.radius * 2) {
                pos.x += this.radius;
            }

            if (pos.y > container.canvas.dimension.height - this.radius * 2) {
                pos.y -= this.radius;
            } else if (pos.y < this.radius * 2) {
                pos.y += this.radius;
            }
        }

        return pos;
    }
}
