class LoaderDirective extends Directive
  constructor: ->
    return {
      restrict: 'E'
      templateUrl: '/partials/directives/loader.html'
      controller: 'loaderController'
    }