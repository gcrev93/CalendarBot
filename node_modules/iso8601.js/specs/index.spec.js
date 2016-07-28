var expect  = require('expect.js')
var moment  = require('moment')
var iso8601 = require('../index')

describe('UTC conversion and printing', function() {
  var ltz     = moment()
  var now     = ltz.toDate()
  var utczone = ltz.clone().utc()

  it('Should return date in ISO format: ' + ltz.format('YYYY-MM-DDTHH:mm:ss.SSS'), function() {
    var expected = ltz.format('YYYY-MM-DDTHH:mm:ss.SSS')
    expect(iso8601.iso(now)).to.equal(expected)
  })

  it('Should return date at UTC in ISO format: ' + utczone.format('YYYY-MM-DDTHH:mm:ss.SSS'), function() {
    var expected = utczone.format('YYYY-MM-DDTHH:mm:ss.SSS')
    expect(iso8601.iso(now, true)).to.equal(expected)
  })

  it('Should return HH:mm: ' + ltz.format('HH:mm') , function() {
    var expected = ltz.format('HH:mm')
    expect(iso8601.hhmm(now)).to.equal(expected)
  })

  it('Should return HH:mm at UTC: ' + utczone.format('HH:mm') , function() {
    var expected = utczone.format('HH:mm')
    expect(iso8601.hhmm(now, true)).to.equal(expected)
  })

  it('Should return MM-DD: ' + ltz.format('MM-DD'), function() {
    var expected = ltz.format('MM-DD')
    expect(iso8601.mmdd(now)).to.equal(expected)
  })

  it('Should return MM-DD at UTC: ' + utczone.format('MM-DD'), function() {
    var expected = utczone.format('MM-DD')
    expect(iso8601.mmdd(now, true)).to.equal(expected)
  })

  it('Should return truncated ISO String: ' + ltz.format('YYYY-MM-DDTHH:mm'), function() {
    var expected = ltz.format('YYYY-MM-DDTHH:mm')
    expect(iso8601.datetime(now)).to.equal(expected)
  })

  it('Should return truncated ISO String at UTC: ' + utczone.format('YYYY-MM-DDTHH:mm'), function() {
    var expected = utczone.format('YYYY-MM-DDTHH:mm')
    expect(iso8601.datetime(now, true)).to.equal(expected)
  })

  it('Should return date in ISO format:' + ltz.format('YYYY-MM-DD'), function() {
    var expected = ltz.format('YYYY-MM-DD')
    expect(iso8601.date(now)).to.equal(expected)
  })

  it('Should return date ISO String at UTC: ' + utczone.format('YYYY-MM-DD'), function() {
    var expected = utczone.format('YYYY-MM-DD')
    expect(iso8601.date(now, true)).to.equal(expected)
  })

  it('Should return time in ISO format:' + ltz.format('HH:mm:ss'), function() {
    var expected = ltz.format('HH:mm:ss')
    expect(iso8601.time(now)).to.equal(expected)
  })

  it('Should return time ISO String at UTC: ' + utczone.format('HH:mm:ss'), function() {
    var expected = utczone.format('HH:mm:ss')
    expect(iso8601.time(now, true)).to.equal(expected)
  })
})
