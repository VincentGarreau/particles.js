import {RecursivePartial} from "../../Types/RecursivePartial";

export interface IOptionLoader<T> {
    load(data?: RecursivePartial<T>): void;
}
