class ModalPlaylist extends Controller
  constructor: (@$scope, @$rootScope, @$element, @playlistsService) ->
    do @cache_DOM_elements
    do @set_triggers

    do @define_template_methods

  cache_DOM_elements: ->
    @container = $(@$element.find('#modal_playlist'))

  set_triggers: ->
    @$rootScope.$on "toggleModalPlaylist", @create_playlist

  define_template_methods: ->
    @$scope.save_playlist = @save_playlist
    @$scope.close = @close
      
  create_playlist: (e, track) =>
    @$scope.playlist = @playlistsService.create track

  save_playlist: =>
    @playlistsService.save(@$scope.playlist)
      .then =>
        @$rootScope.$broadcast "updatePlaylists"
        @$scope.playlist = ''

  close: =>
    @$scope.playlist = ''