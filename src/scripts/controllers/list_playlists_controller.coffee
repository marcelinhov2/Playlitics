class ListPlaylists extends Controller
  constructor: (@$scope, @$element, @playlistsService) ->
    do @cache_DOM_elements
    do @set_triggers

    do @get_playlists

  cache_DOM_elements: ->

  set_triggers: ->

  get_playlists: =>
    @playlistsService.list()
      .then (response) =>
        @$scope.playlists = response