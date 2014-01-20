#pragma strict

var levels : String[];
var points = new Array();

function Awake() {
  DontDestroyOnLoad(transform.gameObject);
  CreatePoints();
}


function CreatePoints() {  
  for (var i : int = 0; i < levels.length; i++) {
    points.Add(0);
  }

}

function SetPoints(level : String, stars : int) {
  var index : int = 0;
  for (var i : int = 0; i < levels.length; i++) {
    if (levels[i] == level) {
      index = i;
    }
   }
   
   points[index] = stars;
}

function GetPoints(level : String) {
  var index : int = 0;
  for (var i : int = 0; i < levels.length; i++) {
    if (levels[i] == level) {
      index = i;
    }
   }
   
   return points[index];
}
