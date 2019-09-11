export interface RequestParams {
  uri: string;
  error: string;
}

export interface Copyright {
  text: string;
  type: "C" | "P";
}

type KVPair = { [key: string]: string };

type ExternalId = KVPair;
type ExternalUrl = KVPair;

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

export interface Artist extends ArtistSimple {
  external_urls: ExternalUrl;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

type ArtistSimple = Omit<Artist, "followers" | "genres" | "popularity">;

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

export interface Track extends TrackSimple {
  album_type: string;
  artists: ArtistSimple[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalId;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_local: boolean;
  restrictions: any;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

type TrackSimple = Omit<Track, "album_type" | "external_ids" | "popularity">;

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

export interface Album extends AlbumSimple {
  album_group?: string;
  album_type: string;
  artists: ArtistSimple[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: ExternalId;
  external_urls: ExternalUrl;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  restrictions: any;
  tracks: TrackSimplePaged;
  type: string;
  uri: string;
}

type AlbumSimple = Omit<
  Album,
  "copyrights" | "external_ids" | "genres" | "label" | "popularity" | "tracks"
>;

export interface AlbumSimplePaged extends Paged {
  items: AlbumSimple;
}

export interface AlbumSearch {
  albums: AlbumSimplePaged;
}

interface BasicAudioFeatures {
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

/**
 * ANALYSIS
 */

export type AudioFeatures = Omit<
  BasicAudioFeatures,
  | "tempo_confidence"
  | "key_confidence"
  | "mode_confidence"
  | "time_signature_confidence"
> & {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
};

interface AudioMeta {
  analyzer_version: string;
  platform: string;
  detailed_status: string;
  status_code: number;
  timestamp: number;
  analysis_time: number;
  input_process: string;
}

type TrackAnalysis = BasicAudioFeatures & {
  num_samples: number;
  duration: number;
  sample_md5: string;
  offset_seconds: number;
  window_seconds: number;
  analysis_sample_rate: number;
  analysis_channels: number;
  end_of_fade_in: number;
  start_of_fade_out: number;
  codestring: string;
  code_version: string;
  echoprintstring: string;
  echoprint_version: number;
  synchstring: string;
  synch_version: number;
  rhythmstring: string;
  rhythm_version: 1;
};

interface Bar {
  start: number;
  duration: number;
  confidence: number;
}

interface Segment extends Bar {
  loudness_start: number;
  loudness_max_time: number;
  pitches: number[];
  timbre: number[];
}

type Section = BasicAudioFeatures[];

export interface AudioAnalysis {
  meta: AudioMeta;
  track: TrackAnalysis;
  bars: Bar[];
  beats: Bar[];
  tatums: Bar[];
  sections: Section[];
  segments: Segment[];
}
