import { AxiosInstance } from "axios";
declare class SpotifyApi {
    private clientStrings;
    private buffer;
    private authHeader;
    instance: AxiosInstance;
    constructor(clientId: string, clientSecret: string);
    /**
     * throwApiError - private function to handle errors
     *
     * @param msg - the error message to throw
     * @param err - the err passed from a promise rejection
     */
    private throwApiError;
    /**
     * getToken - request an auth bearer token from spotify
     */
    getToken(): Promise<void>;
    /**
     * request - private function to handle http requests to the spotify api
     *
     * @param uri - endpoint uri to call
     * @param error - error message to show on error
     * @param callback - callback function to handle the return data
     */
    private request;
    /**
     * getAlbum - get data for a given album
     *
     * @param albumId - the id of an album
     * @param callback - function to handle the returned data
     */
    getAlbum(albumId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * getAlbumTracks - get tracks for a given album
     *
     * @param albumId - the id of an album
     * @param callback - function to handle the returned data
     */
    getAlbumTracks(albumId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * getArtist - get artist data for a given artist id
     *
     * @param artistId - the id of an artist
     * @param callback - function to handle the returned data
     */
    getArtist(artistId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * getAlbumsForArtist - get albums for a given artist
     *
     * @param artistId - the id of an artist
     * @param callback - function to handle the returned data
     */
    getAlbumsForArtist(artistId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * getRelatedArtists - get artists related to a given artist
     *
     * @param artistId - the id of an artist
     * @param callback - function to handle the returned data
     */
    getRelatedArtists(artistId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * getTrack - get data for a given track
     *
     * @param trackId - the id of a track
     * @param callback - function to handle the returned data
     */
    getTrack(trackId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * getTrackFeatures - get audio features for a given track
     *
     * @param trackId - the id of a track
     * @param callback - function to handle the returned data
     */
    getTrackFeatures(trackId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * getTrackAnalysis - get audio analysis for a given track
     *
     * @param trackId - the id of a track
     * @param callback - function to handle the returned data
     */
    getTrackAnalysis(trackId: string, callback: (e?: any) => void): Promise<void>;
    /**
     * searchQuery - search querystring handler
     *
     * @param query - search query
     * @param type - type of search to perform
     */
    private searchQuery;
    /**
     * searchArtists - search for an artist
     *
     * @param query - search query
     * @param callback - function to handle the returned data
     */
    searchArtists(query: string, callback: (e?: any) => void): Promise<void>;
    /**
     * searchTracks - search for a track
     *
     * @param query - search query
     * @param callback - function to handle the returned data
     */
    searchTracks(query: string, callback: (e?: any) => void): Promise<void>;
    /**
     * searchAlbums - search for an album
     *
     * @param query - search query
     * @param callback - function to handle the returned data
     */
    searchAlbums(query: string, callback: (e?: any) => void): Promise<void>;
}
export default SpotifyApi;
