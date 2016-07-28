# iso8601
[![Circle CI](https://circleci.com/gh/coinpit/iso8601.svg?style=shield)](https://circleci.com/gh/coinpit/iso8601)
## Convert time to UTC and print

### Usage
```javascript
var iso8601 = require('iso8601.js')
iso8601.iso(new Date()) // get date at local time in ISO8601 format
```
#### All methods take an optional boolean second argument which uses UTC time instead of local time
```javascript
iso8601.iso(new Date(), true) // get date at UTC in ISO8601 format
```
### Get Date in ISO 8601 format
```javascript
console.log(iso8601.iso(new Date()))
```
#### Returns
```
2016-01-09T18:16:50.803
```
### Get hours:minutes
```javascript
console.log(iso8601.hhmm(new Date()))
```
#### Returns
```
18:16
```
### Get month and date as MM-DD
```javascript
console.log(iso8601.mmdd(new Date()))
```
#### Returns
```
01-09
```
### Get short ISO 8601 string
```javascript
console.log(iso8601.datetime(new Date()))
```
#### Returns
```
2016-01-09T18:16
```
### Get date as YYYY-MM-DD
```javascript
console.log(iso8601.date(new Date()))
```
#### Returns
```
2016-01-09
```
### Get time as HH:mm:ss
```javascript
console.log(iso8601.time(new Date()))
```
#### Returns
```
18:16:50
```
