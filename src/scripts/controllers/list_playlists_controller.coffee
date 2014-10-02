class ListPlaylists extends Controller
  constructor: (@$scope, @$element, @playlistsService) ->
    do @define_template_methods
    do @get_playlists
    
  define_template_methods: ->
    @$scope.remove_from_playlist = @remove_from_playlist
    @$scope.order = @order
    @$scope.disable_up_down = @disable_up_down
    
  get_playlists: =>
    @playlistsService.list()
      .then (response) =>
        @$scope.playlists = response
        @$scope.predicate = '+order';

  remove_from_playlist: (track, playlist) =>
    @playlistsService.remove_track(track, playlist)
      .then (response) =>

  order: (track, playlist, direction) =>
    @playlistsService.reorder(track, playlist, direction)

  disable_up_down: (track, playlist, direction) =>
    prev_track =  @playlistsService.get_prev_track(track, playlist)
    next_track =  @playlistsService.get_next_track(track, playlist)

    if direction is 'up' and prev_track == undefined
      return true

    if direction is 'down' and next_track == undefined
      return true

    return false