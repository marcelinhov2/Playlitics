class SearchMusicDirective extends Directive
  constructor: ->
    return {
      restrict: 'E'
      templateUrl: '/partials/directives/search_music.html'
      controller: 'searchMusicController'
    }