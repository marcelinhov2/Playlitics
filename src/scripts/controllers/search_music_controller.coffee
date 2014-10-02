class SearchMusic extends Controller
  typing_timer: 0

  constructor: (@$scope, @$rootScope, @$element, @$timeout, @spotifyService, @playlistsService) ->
    do @cache_DOM_elements
    do @set_triggers

    do @get_playlists
    do @define_template_methods
    
    # do @start_search

  cache_DOM_elements: ->
    @form = @$element.find('form')
    @search_field = @form.find('input[type=text]')

  set_triggers: ->
    @search_field.bind "keyup", @set_timeout
    @$rootScope.$on "updatePlaylists", @get_playlists

  define_template_methods: ->
    @$scope.add_to_playlist = @add_to_playlist
    @$scope.create_playlist = @create_playlist
    @$scope.verify_music = @verify_music

  start_search: ->
    @search @search_field.val()

  set_timeout: (e) =>
    if @searchTimeout? then clearTimeout @searchTimeout

    value = e.currentTarget.value

    @searchTimeout = setTimeout( =>
      @search value
    , 500)
      
  search: (value) =>
    @$rootScope.is_loading = true

    @spotifyService.search_track(value)
      .then (response) =>
        @$scope.tracks = if response.status == 200 then response.data.tracks else {}  
        @$rootScope.is_loading = false

  get_playlists: =>
    @playlistsService.list()
      .then (response) =>
        @$scope.playlists = response

  create_playlist: (track) =>
    @$rootScope.$broadcast "toggleModalPlaylist", track
    
  add_to_playlist: (track, playlist) =>
    @playlistsService.add_track(track, playlist)
      .then (response) =>
        @verify_music track, playlist

  verify_music: (track, playlist) =>
    exists = _.find playlist.tracks,
      id: track.id

    return if exists then true else false
