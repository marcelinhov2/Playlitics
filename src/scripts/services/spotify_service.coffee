class Spotify extends Service
  constructor: (@$q, @$http) ->
  
  search_track: (query) =>
    search_url = "https://api.spotify.com/v1/search?q=#{query}&type=track"

    defer = @$q.defer()

    if query.length
      request = @$http.get search_url
      request.then (result) =>
        defer.resolve result
    else
      defer.resolve {}
    
    return defer.promise