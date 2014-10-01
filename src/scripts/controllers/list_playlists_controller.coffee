class ListPlaylists extends Controller
  constructor: (@$scope, @$element, @playlistsService) ->
    do @cache_DOM_elements
    do @set_triggers

    do @define_template_methods

    do @get_playlists
    
  cache_DOM_elements: ->

  set_triggers: ->

  define_template_methods: ->
    @$scope.remove_from_playlist = @remove_from_playlist
    @$scope.order = @order
    
  get_playlists: =>
    @playlistsService.list()
      .then (response) =>
        @$scope.playlists = response
        @$scope.predicate = '+order';

  remove_from_playlist: (track, playlist) =>
    @playlistsService.remove_track(track, playlist)
      .then (response) =>
        alert response

  order: (track, playlist, direction) =>
    @playlistsService.reorder(track, playlist, direction)