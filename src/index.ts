import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as qs from "querystring";
import * as Types from "./types";

class SpotifyApi {
  private clientStrings: string;
  private buffer: string;
  private authHeader: string | undefined;
  public instance: AxiosInstance;

  constructor(clientId: string, clientSecret: string) {
    this.clientStrings = `${clientId}:${clientSecret}`;
    this.buffer = `Basic ${Buffer.from(this.clientStrings).toString("base64")}`;
    this.instance = axios.create({
      baseURL: "https://api.spotify.com/v1"
    });
    this.authHeader = this.instance.defaults.headers.common["Authorization"];
  }

  /**
   * throwApiError - private function to handle errors
   *
   * @param msg - the error message to throw
   * @param err - the err passed from a promise rejection
   */
  private throwApiError(msg: string, err: any) {
    throw new Error(`[Spotify API] ${msg}: ${err}`);
  }

  /**
   * getToken - request an auth bearer token from spotify
   */
  public async getToken(): Promise<void> {
    try {
      const response = axios
        .post(
          "https://accounts.spotify.com/api/token",
          qs.stringify({ grant_type: "client_credentials" }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: this.buffer
            }
          }
        )
        .then((response: AxiosResponse) => {
          this.instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
        });
      return Promise.resolve(response);
    } catch (err) {
      this.throwApiError("An authorization error occurred", err);
    }
  }

  /**
   * request - private function to handle http requests to the spotify api
   *
   * @param uri - endpoint uri to call
   * @param error - error message to show on error
   * @param callback - callback function to handle the return data
   */
  private async request(
    { uri, error }: Types.RequestParams,
    callback: (e?: any) => void
  ): Promise<void> {
    const getRequest = () =>
      this.instance
        .get(uri)
        .then((response: AxiosResponse) => callback(response.data));

    try {
      const response = this.authHeader
        ? await getRequest()
        : await this.getToken().then(() => getRequest());

      return Promise.resolve(response);
    } catch (err) {
      this.throwApiError(error, err);
    }
  }

  /**
   * getAlbum - get data for a given album
   *
   * @param albumId - the id of an album
   * @param callback - function to handle the returned data
   */
  public async getAlbum(
    albumId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/albums/${albumId}`,
        error: "Error getting album"
      },
      (data: Types.Album) => {
        callback(data);
      }
    );
  }

  /**
   * getAlbumTracks - get tracks for a given album
   *
   * @param albumId - the id of an album
   * @param callback - function to handle the returned data
   */
  public async getAlbumTracks(
    albumId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/albums/${albumId}/tracks`,
        error: "Error getting album tracks"
      },
      (data: Types.TrackPaged) => {
        callback(data);
      }
    );
  }

  /**
   * getArtist - get artist data for a given artist id
   *
   * @param artistId - the id of an artist
   * @param callback - function to handle the returned data
   */
  public async getArtist(
    artistId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/artists/${artistId}`,
        error: "Error getting artist"
      },
      (data: Types.Artist) => {
        callback(data);
      }
    );
  }

  /**
   * getAlbumsForArtist - get albums for a given artist
   *
   * @param artistId - the id of an artist
   * @param callback - function to handle the returned data
   */
  public async getAlbumsForArtist(
    artistId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/artists/${artistId}/albums`,
        error: "Error getting artist's albums"
      },
      (data: Types.AlbumSimplePaged) => {
        callback(data);
      }
    );
  }

  /**
   * getRelatedArtists - get artists related to a given artist
   *
   * @param artistId - the id of an artist
   * @param callback - function to handle the returned data
   */
  public async getRelatedArtists(
    artistId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/artists/${artistId}/related-artists`,
        error: "Error getting related artists"
      },
      (data: Types.RelatedArtists) => {
        callback(data);
      }
    );
  }

  /**
   * getTrack - get data for a given track
   *
   * @param trackId - the id of a track
   * @param callback - function to handle the returned data
   */
  public async getTrack(
    trackId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/tracks/${trackId}`,
        error: "Error getting track"
      },
      (data: Types.Track) => {
        callback(data);
      }
    );
  }

  /**
   * getTrackFeatures - get audio features for a given track
   *
   * @param trackId - the id of a track
   * @param callback - function to handle the returned data
   */
  public async getTrackFeatures(
    trackId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/audio-features/${trackId}`,
        error: "Error getting track features"
      },
      (data: Types.AudioFeatures) => {
        callback(data);
      }
    );
  }

  /**
   * getTrackAnalysis - get audio analysis for a given track
   *
   * @param trackId - the id of a track
   * @param callback - function to handle the returned data
   */
  public async getTrackAnalysis(
    trackId: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/audio-analysis/${trackId}`,
        error: "Error getting track analysis"
      },
      (data: Types.AudioAnalysis) => {
        callback(data);
      }
    );
  }

  /**
   * searchQuery - search querystring handler
   *
   * @param query - search query
   * @param type - type of search to perform
   */
  private async searchQuery(query: string, type: string) {
    return qs.stringify({
      q: query,
      type: type
    });
  }

  /**
   * searchArtists - search for an artist
   *
   * @param query - search query
   * @param callback - function to handle the returned data
   */
  public async searchArtists(
    query: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/search?${this.searchQuery(query, "artist")}`,
        error: "Error searching artists"
      },
      (data: Types.ArtistSearch) => {
        callback(data.artists);
      }
    );
  }

  /**
   * searchTracks - search for a track
   *
   * @param query - search query
   * @param callback - function to handle the returned data
   */
  public async searchTracks(
    query: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/search?${this.searchQuery(query, "track")}`,
        error: "Error searching tracks"
      },
      (data: Types.TrackSearch) => {
        callback(data.tracks);
      }
    );
  }

  /**
   * searchAlbums - search for an album
   *
   * @param query - search query
   * @param callback - function to handle the returned data
   */
  public async searchAlbums(
    query: string,
    callback: (e?: any) => void
  ): Promise<void> {
    await this.request(
      {
        uri: `/search?${this.searchQuery(query, "album")}`,
        error: "Error searching albums"
      },
      (data: Types.AlbumSearch) => {
        callback(data.albums);
      }
    );
  }
}

export default SpotifyApi;
