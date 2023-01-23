import {Comment} from "./Comment";

export type Flipr = {
    id: string,
    content: string,
    author: string,
    dateTime: Date,
    comments: Comment[],
    likes: number,
}
