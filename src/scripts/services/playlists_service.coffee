class Playlists extends Service
  playlist:
    name: ''
    tags: []
    tracks: []

  constructor: (@$q, @localStorageService) ->

  create: (track) ->
    playlists = @localStorageService.get('playlists')
    @playlist.tracks.push track

    return @playlist

  list: ->
    defer = @$q.defer()
    defer.resolve @localStorageService.get 'playlists'

    return defer.promise

  save: (playlist) ->
    defer = @$q.defer()

    @list().then (response) =>

      current_playlists = if response then response else []
      playlist.id = if response then response.length else 0

      current_playlists.push playlist

      @localStorageService.set 'playlists', current_playlists

      defer.resolve {}

      return defer.promise