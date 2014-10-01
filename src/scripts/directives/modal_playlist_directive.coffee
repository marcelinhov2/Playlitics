class ModalPlaylistDirective extends Directive
  constructor: ->
    return {
      restrict: 'E'
      templateUrl: '/partials/directives/modal_playlist.html'
      controller: 'modalPlaylistController'
    }