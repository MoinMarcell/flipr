import {Flipr} from "./Flipr";

export type FliprUser = {
    id?: string,
    username: string,
    password?: string,
    fliprs: Flipr[],
}
