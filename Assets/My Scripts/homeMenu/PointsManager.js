#pragma strict

var levels : String[];

function Awake() {
  DontDestroyOnLoad(transform.gameObject);
  CreatePoints();
}


function CreatePoints() {  
  if (PlayerPrefs.GetInt("london") == null) {
    PlayerPrefs.SetInt("london", 0);
  }
  
  
  PlayerPrefs.Save();
}

function SetPoints(level : String, stars : int) {
  PlayerPrefs.SetInt(level, stars);
  PlayerPrefs.Save();
}

function GetPoints(level : String) {
  
   
   return PlayerPrefs.GetInt("london");
}
