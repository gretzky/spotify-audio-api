export interface RequestParams {
    uri: string;
    error: string;
}
export interface Copyright {
    text: string;
    type: "C" | "P";
}
declare type KVPair = {
    [key: string]: string;
};
declare type ExternalId = KVPair;
declare type ExternalUrl = KVPair;
export interface Followers {
    href: string;
    total: number;
}
export interface Image {
    height: number;
    url: string;
    width: number;
}
export interface Paged {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}
/**
 * ARTIST
 */
export interface ArtistSimple {
    external_urls: ExternalUrl;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}
export interface Artist extends ArtistSimple {
    followers: Followers;
    genres: string[];
    popularity: number;
}
export interface ArtistSimplePaged extends Paged {
    items: ArtistSimple[];
}
export interface ArtistSearch {
    artists: ArtistSimplePaged;
}
export interface RelatedArtists {
    artists: ArtistSimple[];
}
/**
 * TRACK
 */
export interface TrackSimple {
    artists: ArtistSimple[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrl;
    href: string;
    id: string;
    is_local: boolean;
    restrictions: any;
    name: string;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}
export interface Track extends TrackSimple {
    album_type: string;
    external_ids: ExternalId;
    popularity: number;
}
export interface TrackSimplePaged extends Paged {
    items: TrackSimple;
}
export interface TrackPaged extends Paged {
    items: Track;
}
export interface TrackSearch {
    tracks: TrackSimplePaged;
}
/**
 * ALBUM
 */
export interface AlbumSimple {
    album_group?: string;
    album_type: string;
    artists: ArtistSimple[];
    available_markets: string[];
    external_urls: ExternalUrl;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: any;
    type: string;
    uri: string;
}
export interface Album extends AlbumSimple {
    copyrights: Copyright[];
    external_ids: ExternalId;
    genres: string[];
    label: string;
    popularity: number;
    tracks: TrackSimplePaged;
}
export interface AlbumSimplePaged extends Paged {
    items: AlbumSimple;
}
export interface AlbumSearch {
    albums: AlbumSimplePaged;
}
/**
 * ANALYSIS
 */
export interface AudioFeatures {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: string;
    uri: string;
    valence: number;
}
interface AudioMeta {
    analyzer_version: string;
    platform: string;
    detailed_status: string;
    status_code: number;
    timestamp: number;
    analysis_time: number;
    input_process: string;
}
interface TrackAnalysis {
    num_samples: number;
    duration: number;
    sample_md5: string;
    offset_seconds: number;
    window_seconds: number;
    analysis_sample_rate: number;
    analysis_channels: number;
    end_of_fade_in: number;
    start_of_fade_out: number;
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    codestring: string;
    code_version: string;
    echoprintstring: string;
    echoprint_version: number;
    synchstring: string;
    synch_version: number;
    rhythmstring: string;
    rhythm_version: 1;
}
interface Bar {
    start: number;
    duration: number;
    confidence: number;
}
interface Section extends Bar {
    loudness: number;
    tempo: number;
    tempo_confidence: number;
    key: number;
    key_confidence: number;
    mode: number;
    mode_confidence: number;
    time_signature: number;
    time_signature_confidence: number;
}
interface Segment extends Bar {
    loudness_start: number;
    loudness_max_time: number;
    pitches: number[];
    timbre: number[];
}
export interface AudioAnalysis {
    meta: AudioMeta;
    track: TrackAnalysis;
    bars: Bar[];
    beats: Bar[];
    tatums: Bar[];
    sections: Section[];
    segments: Segment[];
}
export {};
