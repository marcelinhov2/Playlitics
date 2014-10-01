class SearchMusic extends Controller
  typing_timer: 0

  constructor: (@$scope, @$element, @$timeout, @spotifyService, @localStorageService) ->
    do @cache_DOM_elements
    do @set_triggers

    do @define_template_methods

  cache_DOM_elements: ->
    @form = @$element.find('form')
    @search_field = @form.find('input[type=text]')

  set_triggers: ->
    @search_field.bind "keyup", @set_timeout

  define_template_methods: ->
    @$scope.add_to_playlist = @add_to_playlist

  set_timeout: (e) =>
    if @searchTimeout? then clearTimeout @searchTimeout

    value = e.currentTarget.value

    @searchTimeout = setTimeout( =>
      @search value
    , 250)
      
  search: (value) =>
    @spotifyService.search_track(value)
      .then (response) =>
        @$scope.tracks = if response.status == 200 then response.data.tracks else {}  

  add_to_playlist: (track) =>
    console.log track
    console.log @localStorageService