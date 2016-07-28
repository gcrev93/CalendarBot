module.exports = (function() {
	var iso8601 = {}

	iso8601.iso = function(local, isUTC) {
     var offset = local.getTimezoneOffset() * 60 * 1000
     var utc    = local.getTime() - offset
     var iso    = isUTC && local.toISOString() || new Date(utc).toISOString()
		 return iso.substring(0, iso.length-1)
	}

	iso8601.hhmm = function(now, isUTC) {
		return iso8601.iso(now, isUTC).substring(11,16)
	}

	iso8601.mmdd = function(now, isUTC) {
		return iso8601.iso(now, isUTC).substring(5,10)
	}

	iso8601.datetime = function(now, isUTC) {
		return iso8601.iso(now, isUTC).substring(0, 16)
	}

	iso8601.date = function(now, isUTC) {
		return iso8601.iso(now, isUTC).substring(0, 10)
	}

	iso8601.time = function(now, isUTC) {
		return iso8601.iso(now, isUTC).substring(11, 19)
	}

	return iso8601
})()
