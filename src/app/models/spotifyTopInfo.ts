export interface SpotifyTopInfo {
    album:        string;
    albumSmallTitle?: string;
    image:        string;
    colors:       Array<number[]>;
    dominant:     number[];
    colorfulness: number;
    songs:        Song[];
}

export interface Song {
    name:    string;
    artists: string;
}
