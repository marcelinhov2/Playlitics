class ListPlaylistsDirective extends Directive
  constructor: ->
    return {
      restrict: 'E'
      templateUrl: '/partials/directives/list_playlists.html'
      controller: 'listPlaylistsController'
    }