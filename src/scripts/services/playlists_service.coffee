class Playlists extends Service
  constructor: (@$q, @localStorageService) ->

  create: () ->

  list: () ->
  	defer = @$q.defer()
  	defer.resolve @localStorageService.get 'playlists'

  	return defer.promise

  save_to: () ->