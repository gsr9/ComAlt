import { PlaybackSource } from "expo-av/build/AV";

export class Pictogram {
    // public equals(picto: Pictogram): boolean {
    //     if (this.text === picto.text && this.img === picto.img && this.sound === picto.sound) {
    //         return true
    //     }
    //     return false
    // }

    text: string;
    img: any;
    sound: PlaybackSource;
    category: string;
    timesUsed: number

    constructor() {}
}