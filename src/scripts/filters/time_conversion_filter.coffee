class TimeConversion extends Filter
  constructor: ->
  	return (millseconds) ->
	    seconds = Math.floor(millseconds / 1000)
	    days = Math.floor(seconds / 86400)
	    hours = Math.floor((seconds % 86400) / 3600)
	    minutes = Math.floor(((seconds % 86400) % 3600) / 60)
	    timeString = ""
	    timeString += (if (days > 1) then (days + " days ") else (days + " day "))  if days > 0
	    timeString += (if (hours > 1) then (hours + " hours ") else (hours + " hour "))  if hours > 0
	    timeString += (if (minutes > 1) then (minutes + " minutes ") else (minutes + " minute "))  if minutes >= 0
	    timeString