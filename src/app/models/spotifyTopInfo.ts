export interface SpotifyTopInfo {
    album:    string;
    image:    string;
    colors:   Array<number[]>;
    dominant: number[];
    songs?:   Song[];
}

export interface Song {
    name:    string;
    artists: string;
}
