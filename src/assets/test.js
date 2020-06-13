const se = require('./superettn.json')
const asv = require('./asv.json')
// import { years } from './src/data'

let obj = []
se.forEach((seas) => {
  if (seas["BK Häcken"] > 0) {
    let position = seas["BK Häcken"] + seas.div1
		let teamyr = {
			yr: seas.yr,
      pos: position,
      div: 2
    }
		obj.push(teamyr)
    console.log(teamyr)
  }
})

asv.forEach((seas) => {
  if (seas["bkh"] > 0) {

  let teamyr = {
    yr: seas.yr,
    pos: seas["bkh"],
    div: 1
  }
  obj.push(teamyr)
  console.log(teamyr)
}
})

let json = JSON.stringify(obj)
const fs = require('fs')
const { isNumber } = require('util')
fs.writeFileSync('hackensort.json', json, 'utf8')
