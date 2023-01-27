import {Flipr} from "./Flipr";

export type FliprUser = {
    id: string,
    username: string,
    fliprs: Flipr[],
    likedFliprs: Flipr[],
}
