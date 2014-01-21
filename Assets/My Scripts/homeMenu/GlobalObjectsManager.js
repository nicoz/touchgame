#pragma strict

var musicPrefab : Transform;
var soundPrefab : Transform;
var pointsPrefab : Transform;


var music : GameObject;
var sound : GameObject;
var points : GameObject;

function Awake() {
  if (!(GameObject.FindWithTag("MusicPrefab"))) {    
    var musicInstance : Transform = Instantiate(musicPrefab, transform.position, transform.rotation);
    musicInstance.name = "music";
  }
  
  if (!(GameObject.FindWithTag("SoundPrefab"))) {    
    var soundInstance : Transform = Instantiate(soundPrefab, transform.position, transform.rotation);
    soundInstance.name = "sound";
  }

  if (!(GameObject.FindWithTag("PointsPrefab"))) {    
    var pointsInstance : Transform = Instantiate(pointsPrefab, transform.position, transform.rotation);
    pointsInstance.name = "points";
  }

}
function Start() {
  
  music = GameObject.Find("music");
  sound = GameObject.Find("sound");
  points = GameObject.Find("points");
}

function GetSound() {

 return sound;
}

function GetMusic() {

  return music;
}

function GetPoints() {
  return points;
}