class Playlists extends Service
  constructor: (@$q, @localStorageService) ->

  create: (track) ->
    playlist =
      name: ''
      tags: []
      tracks: []

    playlist.tracks.push track
    playlist = @calculate_playlist_duration playlist

    return playlist

  list: ->
    defer = @$q.defer()
    defer.resolve @localStorageService.get 'playlists'

    return defer.promise

  save: (playlist) ->
    defer = @$q.defer()

    @list().then (response) =>

      current_playlists = if response then response else []

      if playlist.id == undefined
        playlist.id = if response then response.length else 0
      else
        others_playlists = _.reject current_playlists,
          id: playlist.id

        current_playlists = others_playlists

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
      playlist = @calculate_playlist_duration playlist
      @save playlist
      defer.resolve "Success!"

    return defer.promise

  calculate_playlist_duration: (playlist) ->
    total_duration = 0

    _.each playlist.tracks, (track) ->
      total_duration = total_duration + track.duration_ms

    playlist.duration = total_duration

    return playlist