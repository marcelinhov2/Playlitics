class Playlists extends Service
  constructor: (@$q, @localStorageService) ->

  create: (track) ->
    playlist =
      name: ''
      tags: []
      tracks: []

    playlist.tracks.push track

    return playlist

  list: ->
    defer = @$q.defer()
    defer.resolve @localStorageService.get 'playlists'

    return defer.promise

  save: (playlist) ->
    defer = @$q.defer()

    @list().then (response) =>

      current_playlists = if response then response else []
  
      if !playlist.id
        playlist.id = if response then response.length else 0

      playlist_exists = _.find current_playlists,
        id: playlist.id

      if !playlist_exists
        current_playlists.push playlist
        @localStorageService.set 'playlists', current_playlists

      defer.resolve {}
      return defer.promise

  add_track: (track, playlist) ->
    defer = @$q.defer()

    track_exists = _.find playlist.tracks,
      id: track.id

    if track_exists
      defer.resolve "This track already exists in this playlist."
    else
      playlist.tracks.push track
      @save playlist
      defer.resolve "Success!"

    return defer.promise