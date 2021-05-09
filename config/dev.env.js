'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH:'"https://mighty-waters-02279.herokuapp.com"',
  // CUSTOMPATH:'" "',
})
