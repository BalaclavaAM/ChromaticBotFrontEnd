export interface SpotifyTopInfo {
    album:        string;
    albumSmallTitle?: string;
    image:        string;
    colors:       Array<number[]>;
    dominant:     number[];
    colorfulness: number;
    saturation:   number;
    brightness:   number;
    songs:        Song[];
}

export interface Song {
    name:    string;
    artists: string;
}
