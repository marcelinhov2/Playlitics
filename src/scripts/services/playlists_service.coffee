class Playlists extends Service
  constructor: (@$q, @localStorageService) ->

  create: (track) ->
    playlist =
      name: ''
      tags: []
      tracks: []

    track.order = 0
    playlist.tracks.push track
    playlist = @calculate_playlist_duration_coolness playlist

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

  get_prev_track: (track, playlist) ->
    return _.find playlist.tracks,
      order: track.order - 1

  get_next_track: (track, playlist) ->
    return _.find playlist.tracks,
      order: track.order + 1

  reorder: (track, playlist, direction) ->
    prev_track = @get_prev_track(track, playlist)
    next_track = @get_next_track(track, playlist)

    if direction is 'up'
      track.order = track.order - 1
      track.order = if track.order < 0 then 0 else track.order
      if prev_track
        prev_track.order = prev_track.order + 1
    else
      track.order = track.order + 1
      track.order = if track.order > ( playlist.tracks.length - 1 ) then ( playlist.tracks.length - 1 ) else track.order
      if next_track
        next_track.order = next_track.order - 1

    @save playlist

  add_track: (track, playlist) ->
    defer = @$q.defer()

    track_exists = _.find playlist.tracks,
      id: track.id

    if track_exists
      defer.resolve "This track already exists in this playlist."
    else
      last_track = _.last(playlist.tracks)
      track.order = last_track.order + 1

      playlist.tracks.push track
      playlist = @calculate_playlist_duration_coolness playlist
      @save playlist
      defer.resolve "Success!"

    return defer.promise

  remove_track: (track, playlist) ->
    defer = @$q.defer()

    playlist.tracks = _.reject playlist.tracks,
      id: track.id

    playlist = @calculate_playlist_duration_coolness playlist
    @save playlist
    defer.resolve "Track removed!"

    return defer.promise

  calculate_playlist_duration_coolness: (playlist) ->
    total_duration = 0
    coolness = 0

    _.each playlist.tracks, (track) ->
      total_duration += track.duration_ms
      coolness += ( track.duration_ms * (track.popularity or 0) ) / total_duration

    playlist.duration = total_duration
    playlist.coolness = parseInt coolness, 10

    return playlist