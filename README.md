# spotify-audio-api

Spotify Web API wrapper to return audio metadata. This wrapper uses the [client credentials](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow) auth flow, so only non-user related endpoints can be called.

## usage

```bash
$ yarn add spotify-audio-api
```

Instantiate the class with your client ID and client secret provided from the Spotify developer dashboard:

```js
const clientId = 'fsd9f89shfsf2j'
const clientSecret = 'qf9asfsdgh9osgh9sa2'

const spotify = new SpotifyAPI(clientId, clientSecret)
```

This wrapper provides an [axios](https://github.com/axios/axios) instance with the Spotify API url as the base url.

You can retrieve an auth token with the `getToken()` method. This method fetches an auth token and sets it as the `Authorization` header in the axios instance.

```js
spotify.getToken()

spotify.instance.get(`/artists/3TVXtAsR1Inumwj472S9r4`).then((response) => console.log(response.data))
```

### API

#### `getToken()`

Makes a `POST` request to the Spotify API and sets the returned token in an axios instance.

### `getAlbum(albumId, callback)`

[Get info for a single album](https://developer.spotify.com/documentation/web-api/reference/albums/get-album/).

**Params**

- `albumId`: spotify ID of an album
- `callback`: function to handle the returned data

### `getAlbumTracks(albumId, callback)`

[Get info on an album's tracks](https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/).

**Params**

- `albumId`: spotify ID of an album
- `callback`: function to handle the returned data

### `getArtist(artistId, callback)`

[Get info on a single artist](https://developer.spotify.com/documentation/web-api/reference/artists/get-artist/).

**Params**

- `artistId`: spotify ID of an artist
- `callback`: function to handle the returned data

### `getAlbumsForArtist(artistId, callback)`

[Get an artist's albums](https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/).

**Params**

- `artistId`: spotify ID of an artist
- `callback`: function to handle the returned data

### `getRelatedArtists(artistId, callback)`

[Get artists related to an artist.](https://developer.spotify.com/documentation/web-api/reference/artists/get-related-artists/)

**Params**

- `artistId`: spotify ID of an artist
- `callback`: function to handle the returned data

### `getTrack(trackId, callback)`

[Get info on a single track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/).

**Params**

- `trackId`: spotify ID of a track
- `callback`: function to handle the returned data

### `getTrackFeatures(trackId, callback)`

[Get audio features for a single track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/)/

**Params**

- `trackId`: spotify ID of a track
- `callback`: function to handle the returned data

### `getTrackAnalysis(trackId, callback)

[Get audio analysis for a single track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/).

**Params**

- `trackId`: spotify ID of a track
- `callback`: function to handle the returned data

### `searchArtists(query, callback)`

[Search for an artist](https://developer.spotify.com/documentation/web-api/reference/search/search/).

**Params**

- `query`: Search query string
- `callback`: function to handle the returned data

### `searchTracks(query, callback)`

[Search for a track](https://developer.spotify.com/documentation/web-api/reference/search/search/).

**Params**

- `query`: Search query string
- `callback`: function to handle the returned data

### `searchAlbums(query, callback)`

[Search for an album](https://developer.spotify.com/documentation/web-api/reference/search/search/)/

**Params**

- `query`: Search query string
- `callback`: function to handle the returned data

---
built with [skeletor](https://github.com/gretzky/skeletor) 💀
