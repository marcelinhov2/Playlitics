class Header extends Controller
  constructor: (@$scope, @$element, @$location) ->
    do @cache_DOM_elements
    do @set_triggers

    do @make_active

  cache_DOM_elements: ->
    @links = @$element.find('#header ul li')

  set_triggers: ->
    @$scope.$on "$routeChangeStart", (next, current) =>
      do @make_active

  make_active: ->
    @links.find('a').removeClass('active')
    @links.find("a[href$='#{@$location.$$path}']").addClass 'active'