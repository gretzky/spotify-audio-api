"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const qs = require("querystring");
class SpotifyApi {
    constructor(clientId, clientSecret) {
        this.clientStrings = `${clientId}:${clientSecret}`;
        this.buffer = `Basic ${Buffer.from(this.clientStrings).toString("base64")}`;
        this.instance = axios_1.default.create({
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
    throwApiError(msg, err) {
        throw new Error(`[Spotify API] ${msg}: ${err}`);
    }
    /**
     * getToken - request an auth bearer token from spotify
     */
    async getToken() {
        try {
            const response = axios_1.default
                .post("https://accounts.spotify.com/api/token", qs.stringify({ grant_type: "client_credentials" }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: this.buffer
                }
            })
                .then((response) => {
                this.instance.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
            });
            return Promise.resolve(response);
        }
        catch (err) {
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
    async request({ uri, error }, callback) {
        const getRequest = () => this.instance
            .get(uri)
            .then((response) => callback(response.data));
        try {
            const response = this.authHeader
                ? await getRequest()
                : await this.getToken().then(() => getRequest());
            return Promise.resolve(response);
        }
        catch (err) {
            this.throwApiError(error, err);
        }
    }
    /**
     * getAlbum - get data for a given album
     *
     * @param albumId - the id of an album
     * @param callback - function to handle the returned data
     */
    async getAlbum(albumId, callback) {
        await this.request({
            uri: `/albums/${albumId}`,
            error: "Error getting album"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * getAlbumTracks - get tracks for a given album
     *
     * @param albumId - the id of an album
     * @param callback - function to handle the returned data
     */
    async getAlbumTracks(albumId, callback) {
        await this.request({
            uri: `/albums/${albumId}/tracks`,
            error: "Error getting album tracks"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * getArtist - get artist data for a given artist id
     *
     * @param artistId - the id of an artist
     * @param callback - function to handle the returned data
     */
    async getArtist(artistId, callback) {
        await this.request({
            uri: `/artists/${artistId}`,
            error: "Error getting artist"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * getAlbumsForArtist - get albums for a given artist
     *
     * @param artistId - the id of an artist
     * @param callback - function to handle the returned data
     */
    async getAlbumsForArtist(artistId, callback) {
        await this.request({
            uri: `/artists/${artistId}/albums`,
            error: "Error getting artist's albums"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * getRelatedArtists - get artists related to a given artist
     *
     * @param artistId - the id of an artist
     * @param callback - function to handle the returned data
     */
    async getRelatedArtists(artistId, callback) {
        await this.request({
            uri: `/artists/${artistId}/related-artists`,
            error: "Error getting related artists"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * getTrack - get data for a given track
     *
     * @param trackId - the id of a track
     * @param callback - function to handle the returned data
     */
    async getTrack(trackId, callback) {
        await this.request({
            uri: `/track/${trackId}`,
            error: "Error getting track"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * getTrackFeatures - get audio features for a given track
     *
     * @param trackId - the id of a track
     * @param callback - function to handle the returned data
     */
    async getTrackFeatures(trackId, callback) {
        await this.request({
            uri: `/audio-features/${trackId}`,
            error: "Error getting track features"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * getTrackAnalysis - get audio analysis for a given track
     *
     * @param trackId - the id of a track
     * @param callback - function to handle the returned data
     */
    async getTrackAnalysis(trackId, callback) {
        await this.request({
            uri: `/audio-analysis/${trackId}`,
            error: "Error getting track analysis"
        }, (data) => {
            callback(data);
        });
    }
    /**
     * searchQuery - search querystring handler
     *
     * @param query - search query
     * @param type - type of search to perform
     */
    async searchQuery(query, type) {
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
    async searchArtists(query, callback) {
        await this.request({
            uri: `/search?${this.searchQuery(query, "artist")}`,
            error: "Error searching artists"
        }, (data) => {
            callback(data.artists);
        });
    }
    /**
     * searchTracks - search for a track
     *
     * @param query - search query
     * @param callback - function to handle the returned data
     */
    async searchTracks(query, callback) {
        await this.request({
            uri: `/search?${this.searchQuery(query, "track")}`,
            error: "Error searching tracks"
        }, (data) => {
            callback(data.tracks);
        });
    }
    /**
     * searchAlbums - search for an album
     *
     * @param query - search query
     * @param callback - function to handle the returned data
     */
    async searchAlbums(query, callback) {
        await this.request({
            uri: `/search?${this.searchQuery(query, "album")}`,
            error: "Error searching albums"
        }, (data) => {
            callback(data.albums);
        });
    }
}
exports.default = SpotifyApi;
