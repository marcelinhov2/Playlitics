class Routes extends Config
  constructor: ($routeProvider, $locationProvider) ->
      $routeProvider
      .when '/',
        templateUrl: '/partials/views/home.html'
      .when '/playlists',
        templateUrl: '/partials/views/playlists.html'
      .otherwise
        redirectTo: '/'

      $locationProvider.html5Mode true