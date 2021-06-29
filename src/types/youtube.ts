export interface VideoData {
    id: string;
    title: string;
    author: string;
    url: string;
    thumbnails: Thumbnail[];
    formats: Format[]
}

export interface Thumbnail {
    url: string;
    size: string
}

export interface Format {
    type: FormatType
    quality: string;
    container: string;
    codecs: string;
    url: string;
    bitrate: string
}

export enum FormatType {
    main, audio, video
}