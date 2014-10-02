(function() {
  var App;

  App = (function() {
    function App() {
      return ['ngResource', 'ngAnimate', 'ngRoute', 'LocalStorageModule'];
    }

    return App;

  })();

  angular.module('app', App());

}).call(this);

(function() {
  var Routes;

  Routes = (function() {
    function Routes($routeProvider, $locationProvider) {
      $routeProvider.when('/', {
        templateUrl: '/partials/views/home.html'
      }).when('/playlists', {
        templateUrl: '/partials/views/playlists.html'
      }).otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
    }

    return Routes;

  })();

  angular.module('app').config(['$routeProvider', '$locationProvider', Routes]);

}).call(this);

(function() {
  var App;

  App = (function() {
    function App($scope, $rootScope, $location) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$location = $location;
    }

    return App;

  })();

  angular.module('app').controller('appController', ['$scope', '$rootScope', '$location', App]);

}).call(this);

(function() {
  var Header;

  Header = (function() {
    function Header($scope, $element, $location) {
      this.$scope = $scope;
      this.$element = $element;
      this.$location = $location;
      this.cache_DOM_elements();
      this.set_triggers();
      this.make_active();
    }

    Header.prototype.cache_DOM_elements = function() {
      return this.links = this.$element.find('#header ul li');
    };

    Header.prototype.set_triggers = function() {
      return this.$scope.$on("$routeChangeStart", (function(_this) {
        return function(next, current) {
          return _this.make_active();
        };
      })(this));
    };

    Header.prototype.make_active = function() {
      this.links.find('a').removeClass('active');
      return this.links.find("a[href$='" + this.$location.$$path + "']").addClass('active');
    };

    return Header;

  })();

  angular.module('app').controller('headerController', ['$scope', '$element', '$location', Header]);

}).call(this);

(function() {
  var ListPlaylists,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ListPlaylists = (function() {
    function ListPlaylists($scope, $element, playlistsService) {
      this.$scope = $scope;
      this.$element = $element;
      this.playlistsService = playlistsService;
      this.disable_up_down = __bind(this.disable_up_down, this);
      this.order = __bind(this.order, this);
      this.remove_from_playlist = __bind(this.remove_from_playlist, this);
      this.get_playlists = __bind(this.get_playlists, this);
      this.define_template_methods();
      this.get_playlists();
    }

    ListPlaylists.prototype.define_template_methods = function() {
      this.$scope.remove_from_playlist = this.remove_from_playlist;
      this.$scope.order = this.order;
      return this.$scope.disable_up_down = this.disable_up_down;
    };

    ListPlaylists.prototype.get_playlists = function() {
      return this.playlistsService.list().then((function(_this) {
        return function(response) {
          _this.$scope.playlists = response;
          return _this.$scope.predicate = '+order';
        };
      })(this));
    };

    ListPlaylists.prototype.remove_from_playlist = function(track, playlist) {
      return this.playlistsService.remove_track(track, playlist).then((function(_this) {
        return function() {
          return _this.get_playlists();
        };
      })(this));
    };

    ListPlaylists.prototype.order = function(track, playlist, direction) {
      return this.playlistsService.reorder(track, playlist, direction);
    };

    ListPlaylists.prototype.disable_up_down = function(track, playlist, direction) {
      var next_track, prev_track;
      prev_track = this.playlistsService.get_prev_track(track, playlist);
      next_track = this.playlistsService.get_next_track(track, playlist);
      if (direction === 'up' && prev_track === void 0) {
        return true;
      }
      if (direction === 'down' && next_track === void 0) {
        return true;
      }
      return false;
    };

    return ListPlaylists;

  })();

  angular.module('app').controller('listPlaylistsController', ['$scope', '$element', 'playlistsService', ListPlaylists]);

}).call(this);

(function() {
  var Loader;

  Loader = (function() {
    function Loader($scope, $rootScope) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$rootScope.$watch('is_loading', (function(_this) {
        return function(response) {
          return _this.$scope.is_loading = response;
        };
      })(this));
    }

    return Loader;

  })();

  angular.module('app').controller('loaderController', ['$scope', '$rootScope', Loader]);

}).call(this);

(function() {
  var ModalPlaylist,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ModalPlaylist = (function() {
    function ModalPlaylist($scope, $rootScope, $element, playlistsService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$element = $element;
      this.playlistsService = playlistsService;
      this.close = __bind(this.close, this);
      this.save_playlist = __bind(this.save_playlist, this);
      this.create_playlist = __bind(this.create_playlist, this);
      this.cache_DOM_elements();
      this.set_triggers();
      this.define_template_methods();
    }

    ModalPlaylist.prototype.cache_DOM_elements = function() {
      return this.container = $(this.$element.find('#modal_playlist'));
    };

    ModalPlaylist.prototype.set_triggers = function() {
      return this.$rootScope.$on("toggleModalPlaylist", this.create_playlist);
    };

    ModalPlaylist.prototype.define_template_methods = function() {
      this.$scope.save_playlist = this.save_playlist;
      return this.$scope.close = this.close;
    };

    ModalPlaylist.prototype.create_playlist = function(e, track) {
      return this.$scope.playlist = this.playlistsService.create(track);
    };

    ModalPlaylist.prototype.save_playlist = function() {
      return this.playlistsService.save(this.$scope.playlist).then((function(_this) {
        return function() {
          _this.$rootScope.$broadcast("updatePlaylists");
          return _this.$scope.playlist = '';
        };
      })(this));
    };

    ModalPlaylist.prototype.close = function() {
      return this.$scope.playlist = '';
    };

    return ModalPlaylist;

  })();

  angular.module('app').controller('modalPlaylistController', ['$scope', '$rootScope', '$element', 'playlistsService', ModalPlaylist]);

}).call(this);

(function() {
  var SearchMusic,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SearchMusic = (function() {
    SearchMusic.prototype.typing_timer = 0;

    function SearchMusic($scope, $rootScope, $element, $timeout, spotifyService, playlistsService) {
      this.$scope = $scope;
      this.$rootScope = $rootScope;
      this.$element = $element;
      this.$timeout = $timeout;
      this.spotifyService = spotifyService;
      this.playlistsService = playlistsService;
      this.verify_music = __bind(this.verify_music, this);
      this.add_to_playlist = __bind(this.add_to_playlist, this);
      this.create_playlist = __bind(this.create_playlist, this);
      this.get_playlists = __bind(this.get_playlists, this);
      this.search = __bind(this.search, this);
      this.set_timeout = __bind(this.set_timeout, this);
      this.cache_DOM_elements();
      this.set_triggers();
      this.get_playlists();
      this.define_template_methods();
    }

    SearchMusic.prototype.cache_DOM_elements = function() {
      this.form = this.$element.find('form');
      return this.search_field = this.form.find('input[type=text]');
    };

    SearchMusic.prototype.set_triggers = function() {
      this.search_field.bind("keyup", this.set_timeout);
      return this.$rootScope.$on("updatePlaylists", this.get_playlists);
    };

    SearchMusic.prototype.define_template_methods = function() {
      this.$scope.add_to_playlist = this.add_to_playlist;
      this.$scope.create_playlist = this.create_playlist;
      return this.$scope.verify_music = this.verify_music;
    };

    SearchMusic.prototype.start_search = function() {
      return this.search(this.search_field.val());
    };

    SearchMusic.prototype.set_timeout = function(e) {
      var value;
      if (this.searchTimeout != null) {
        clearTimeout(this.searchTimeout);
      }
      value = e.currentTarget.value;
      return this.searchTimeout = setTimeout((function(_this) {
        return function() {
          return _this.search(value);
        };
      })(this), 500);
    };

    SearchMusic.prototype.search = function(value) {
      this.$rootScope.is_loading = true;
      return this.spotifyService.search_track(value).then((function(_this) {
        return function(response) {
          _this.$scope.tracks = response.status === 200 ? response.data.tracks : {};
          return _this.$rootScope.is_loading = false;
        };
      })(this));
    };

    SearchMusic.prototype.get_playlists = function() {
      return this.playlistsService.list().then((function(_this) {
        return function(response) {
          return _this.$scope.playlists = response;
        };
      })(this));
    };

    SearchMusic.prototype.create_playlist = function(track) {
      return this.$rootScope.$broadcast("toggleModalPlaylist", track);
    };

    SearchMusic.prototype.add_to_playlist = function(track, playlist) {
      return this.playlistsService.add_track(track, playlist).then((function(_this) {
        return function(response) {
          return _this.verify_music(track, playlist);
        };
      })(this));
    };

    SearchMusic.prototype.verify_music = function(track, playlist) {
      var exists;
      exists = _.find(playlist.tracks, {
        id: track.id
      });
      if (exists) {
        return true;
      } else {
        return false;
      }
    };

    return SearchMusic;

  })();

  angular.module('app').controller('searchMusicController', ['$scope', '$rootScope', '$element', '$timeout', 'spotifyService', 'playlistsService', SearchMusic]);

}).call(this);

(function() {
  var FooterDirective;

  FooterDirective = (function() {
    function FooterDirective() {
      return {
        restrict: 'E',
        templateUrl: '/partials/directives/footer.html'
      };
    }

    return FooterDirective;

  })();

  angular.module('app').directive('footerDirective', [FooterDirective]);

}).call(this);

(function() {
  var HeaderDirective;

  HeaderDirective = (function() {
    function HeaderDirective() {
      return {
        restrict: 'E',
        templateUrl: '/partials/directives/header.html',
        controller: 'headerController'
      };
    }

    return HeaderDirective;

  })();

  angular.module('app').directive('headerDirective', [HeaderDirective]);

}).call(this);

(function() {
  var ListPlaylistsDirective;

  ListPlaylistsDirective = (function() {
    function ListPlaylistsDirective() {
      return {
        restrict: 'E',
        templateUrl: '/partials/directives/list_playlists.html',
        controller: 'listPlaylistsController'
      };
    }

    return ListPlaylistsDirective;

  })();

  angular.module('app').directive('listPlaylistsDirective', [ListPlaylistsDirective]);

}).call(this);

(function() {
  var LoaderDirective;

  LoaderDirective = (function() {
    function LoaderDirective() {
      return {
        restrict: 'E',
        templateUrl: '/partials/directives/loader.html',
        controller: 'loaderController'
      };
    }

    return LoaderDirective;

  })();

  angular.module('app').directive('loaderDirective', [LoaderDirective]);

}).call(this);

(function() {
  var ModalPlaylistDirective;

  ModalPlaylistDirective = (function() {
    function ModalPlaylistDirective() {
      return {
        restrict: 'E',
        templateUrl: '/partials/directives/modal_playlist.html',
        controller: 'modalPlaylistController'
      };
    }

    return ModalPlaylistDirective;

  })();

  angular.module('app').directive('modalPlaylistDirective', [ModalPlaylistDirective]);

}).call(this);

(function() {
  var SearchMusicDirective;

  SearchMusicDirective = (function() {
    function SearchMusicDirective() {
      return {
        restrict: 'E',
        templateUrl: '/partials/directives/search_music.html',
        controller: 'searchMusicController'
      };
    }

    return SearchMusicDirective;

  })();

  angular.module('app').directive('searchMusicDirective', [SearchMusicDirective]);

}).call(this);

(function() {
  var TimeConversion;

  TimeConversion = (function() {
    function TimeConversion() {
      return function(millseconds) {
        var days, hours, minutes, seconds, timeString;
        seconds = Math.floor(millseconds / 1000);
        days = Math.floor(seconds / 86400);
        hours = Math.floor((seconds % 86400) / 3600);
        minutes = Math.floor(((seconds % 86400) % 3600) / 60);
        timeString = "";
        if (days > 0) {
          timeString += (days > 1 ? days + " days " : days + " day ");
        }
        if (hours > 0) {
          timeString += (hours > 1 ? hours + " hours " : hours + " hour ");
        }
        if (minutes >= 0) {
          timeString += (minutes > 1 ? minutes + " minutes " : minutes + " minute ");
        }
        return timeString;
      };
    }

    return TimeConversion;

  })();

  angular.module('app').filter('timeConversion', [TimeConversion]);

}).call(this);

(function() {
  var Playlists;

  Playlists = (function() {
    function Playlists($q, localStorageService) {
      this.$q = $q;
      this.localStorageService = localStorageService;
    }

    Playlists.prototype.create = function(track) {
      var playlist;
      playlist = {
        name: '',
        tags: [],
        tracks: []
      };
      track.order = 0;
      playlist.tracks.push(track);
      playlist = this.calculate_playlist_duration_coolness(playlist);
      return playlist;
    };

    Playlists.prototype.list = function() {
      var defer;
      defer = this.$q.defer();
      defer.resolve(this.localStorageService.get('playlists'));
      return defer.promise;
    };

    Playlists.prototype.save = function(playlist) {
      var defer;
      defer = this.$q.defer();
      return this.list().then((function(_this) {
        return function(response) {
          var current_playlists, others_playlists;
          current_playlists = response ? response : [];
          if (playlist.id === void 0) {
            playlist.id = new Date().getTime();
          } else {
            others_playlists = _.reject(current_playlists, {
              id: playlist.id
            });
            current_playlists = others_playlists;
          }
          current_playlists.push(playlist);
          _this.localStorageService.set('playlists', current_playlists);
          defer.resolve({});
          return defer.promise;
        };
      })(this));
    };

    Playlists.prototype["delete"] = function(playlist) {
      var defer;
      defer = this.$q.defer();
      return this.list().then((function(_this) {
        return function(response) {
          var current_playlists, playlists;
          current_playlists = response ? response : [];
          playlists = _.reject(current_playlists, {
            id: playlist.id
          });
          current_playlists = playlists;
          _this.localStorageService.set('playlists', current_playlists);
          defer.resolve({});
          return defer.promise;
        };
      })(this));
    };

    Playlists.prototype.get_prev_track = function(track, playlist) {
      return _.find(playlist.tracks, {
        order: track.order - 1
      });
    };

    Playlists.prototype.get_next_track = function(track, playlist) {
      return _.find(playlist.tracks, {
        order: track.order + 1
      });
    };

    Playlists.prototype.reorder = function(track, playlist, direction) {
      var next_track, prev_track;
      prev_track = this.get_prev_track(track, playlist);
      next_track = this.get_next_track(track, playlist);
      if (direction === 'up') {
        track.order = track.order - 1;
        track.order = track.order < 0 ? 0 : track.order;
        if (prev_track) {
          prev_track.order = prev_track.order + 1;
        }
      } else {
        track.order = track.order + 1;
        track.order = track.order > (playlist.tracks.length - 1) ? playlist.tracks.length - 1 : track.order;
        if (next_track) {
          next_track.order = next_track.order - 1;
        }
      }
      return this.save(playlist);
    };

    Playlists.prototype.add_track = function(track, playlist) {
      var defer, last_track, track_exists;
      defer = this.$q.defer();
      track_exists = _.find(playlist.tracks, {
        id: track.id
      });
      if (track_exists) {
        defer.resolve("This track already exists in this playlist.");
      } else {
        last_track = _.last(playlist.tracks);
        track.order = last_track.order + 1;
        playlist.tracks.push(track);
        playlist = this.calculate_playlist_duration_coolness(playlist);
        this.save(playlist);
        defer.resolve("Success!");
      }
      return defer.promise;
    };

    Playlists.prototype.remove_track = function(track, playlist) {
      var defer;
      defer = this.$q.defer();
      playlist.tracks = _.reject(playlist.tracks, {
        id: track.id
      });
      playlist = this.calculate_playlist_duration_coolness(playlist);
      if (playlist.tracks.length) {
        this.save(playlist).then(function() {
          return defer.resolve("Track removed!");
        });
      } else {
        this["delete"](playlist).then(function() {
          return defer.resolve("Track removed and Playlist deleted!");
        });
      }
      return defer.promise;
    };

    Playlists.prototype.calculate_playlist_duration_coolness = function(playlist) {
      var coolness, total_duration;
      total_duration = 0;
      coolness = 0;
      _.each(playlist.tracks, function(track) {
        total_duration += track.duration_ms;
        return coolness += (track.duration_ms * (track.popularity || 0)) / total_duration;
      });
      playlist.duration = total_duration;
      playlist.coolness = parseInt(coolness, 10);
      return playlist;
    };

    return Playlists;

  })();

  angular.module('app').service('playlistsService', ['$q', 'localStorageService', Playlists]);

}).call(this);

(function() {
  var Spotify,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Spotify = (function() {
    function Spotify($q, $http) {
      this.$q = $q;
      this.$http = $http;
      this.search_track = __bind(this.search_track, this);
    }

    Spotify.prototype.search_track = function(query) {
      var defer, request, search_url;
      search_url = "https://api.spotify.com/v1/search?q=" + query + "&type=track";
      defer = this.$q.defer();
      if (query.length) {
        request = this.$http.get(search_url);
        request.then((function(_this) {
          return function(result) {
            return defer.resolve(result);
          };
        })(this));
      } else {
        defer.resolve({});
      }
      return defer.promise;
    };

    return Spotify;

  })();

  angular.module('app').service('spotifyService', ['$q', '$http', Spotify]);

}).call(this);
