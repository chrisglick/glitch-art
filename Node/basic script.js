var esprima = require('esprima');
var escope = require('escope');

var value = "huh";
var ast = esprima.parse(value, {range: true, loc: true});
var scopes = escope.analyze(ast).scopes;

console.log(scopes);