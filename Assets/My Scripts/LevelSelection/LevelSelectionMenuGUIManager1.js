#pragma strict
var originalWidth : float = 1920.0;  // define here the original resolution
var originalHeight  : float = 1080.0; // you used to create the GUI contents 
var originalNormalText : float = 48;
private var scale: Vector3;
var buttonX : float;
var buttonY : float;
var originalTitleText : float;

var controlCenter : GameObject;

var style : GUIStyle;
var restartStyle : GUIStyle;
var pauseButtonStyle : GUIStyle;
var startButtonStyle : GUIStyle;
var musicOnButtonStyle : GUIStyle;
var musicOffButtonStyle : GUIStyle;
var soundOnButtonStyle : GUIStyle;
var soundOffButtonStyle : GUIStyle;
var creditStyleTitle : GUIStyle;
var creditStyleText : GUIStyle;

var menuCredits : boolean = false;
var menuOptions : boolean = true;
var menuOptionButtons : boolean = false;

var gameTitle : GameObject;

// The position on of the scrolling viewport
var scrollPosition : Vector2 = Vector2.zero;
	
function Awake() {
  controlCenter = GameObject.Find("controlCenter");     
  
}

function Start() {
  
}

function OnGUI() {
  scale.x = Screen.width/originalWidth; // calculate hor scale
  scale.y = Screen.height/originalHeight; // calculate vert scale
  scale.z = 1;
  var svMat = GUI.matrix; // save current matrix
  // substitute matrix - only scale is altered from standard
  GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, scale);
  
  var buttonMultiplier : float = Mathf.Sqrt((200 * 200) * scale.x + (100 * 100) * scale.y);
  var normalTextMultiplier : float = (buttonMultiplier / Mathf.Sqrt((Screen.width * Screen.width) * scale.x + (Screen.height * Screen.height) * scale.y));
  
  GUI.skin.button.fontSize = (originalNormalText + (normalTextMultiplier * originalNormalText));
  
  var fontMultiplier = Mathf.Sqrt((scale.x  * scale.x )  + (scale.y  * scale.y ));
    
  
  buttonX = ((originalWidth - 200) / 2);
  buttonY = ((originalHeight - 100) / 2);
  

  if (GUI.Button(Rect(buttonX + 35, 800,200,100),"Back to menu", restartStyle)) {
   PreviousScene();
  }

           
  // restore matrix before returning
  GUI.matrix = svMat; // restore matrix
}

function ToggleOptionMenu() {
  menuOptions = !menuOptions;
  menuOptionButtons = !menuOptionButtons;
}

function ToggleCredits() {
  menuOptions = !menuOptions;
  menuCredits = !menuCredits;
}

function NextScene() {
  Application.LoadLevel("London");
}

function PreviousScene() {
  Application.LoadLevel("HomeMenu");
}
