class Routes extends Config
  constructor: ($routeProvider, $locationProvider) ->
      $routeProvider
      .when '/',
        controller: 'homeController'
        templateUrl: '/partials/views/home.html'
      .when '/playlists',
        controller: 'playlistsController'
        templateUrl: '/partials/views/playlists.html'
      .otherwise
        redirectTo: '/'

      $locationProvider.html5Mode true