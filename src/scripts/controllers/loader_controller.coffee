class Loader extends Controller
  constructor: (@$scope, @$rootScope) ->
  	@$rootScope.$watch 'is_loading', (response) =>
  		@$scope.is_loading = response