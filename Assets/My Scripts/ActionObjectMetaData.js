#pragma strict

var currentName : String;
var points : int = 10;

function Start() {
  if ( currentName == "" )
    currentName = gameObject.name;
}