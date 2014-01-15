var originalWidth : float = 1920.0;  // define here the original resolution
var originalHeight  : float = 1080.0; // you used to create the GUI contents 
var originalNormalText : float = 48;
//var originalGUIStyle : GUIStyle;
var originalScoreText : float;
var originalTimerText : float;
var originalObjectiveText : float;
var originalEndMessageText : float;
var originalTitleText : float;
var originalInstructionsText : float;

var buttonX : float;
var buttonY : float;

var controlCenter : GameObject; 

var score : GameObject;
var score_shadow : GameObject;

var timer : GameObject;
var timer_shadow : GameObject;

var objective : GameObject;
var objective_shadow : GameObject;

var endMessage : GameObject;
var endMessage_shadow : GameObject;

var title : GameObject;
var title_shadow : GameObject;

var instructions : GameObject;

var swanText : GameObject;
var cabText : GameObject;
var busText : GameObject;
var bombText : GameObject;
var clockText : GameObject;
var shipText : GameObject;

var style : GUIStyle;
var restartStyle : GUIStyle;
var pauseButtonStyle : GUIStyle;
var startButtonStyle : GUIStyle;
var musicOnButtonStyle : GUIStyle;
var musicOffButtonStyle : GUIStyle;
var soundOnButtonStyle : GUIStyle;
var soundOffButtonStyle : GUIStyle;

var pauseMenuButtons : boolean = false;
var pauseMenuOptionButtons : boolean = false;

var pauseMenu : GameObject;

private var music : GameObject;
private var soundCenter : GameObject;

private var showingPauseMenu : boolean = false;

private var gameStarted : boolean = false;

private var scale: Vector3;

 
function Awake() {
  
  controlCenter = GameObject.Find("ControlCenter");
  
  music = GameObject.Find("music");
  soundCenter = GameObject.Find("sound");
  
  score = GameObject.Find('Score');
  score_shadow = GameObject.Find('Score-shadow');
  
  originalScoreText = score.guiText.fontSize;
  
  timer = GameObject.Find('Timer');
  timer_shadow = GameObject.Find('Timer-shadow');
  
  originalTimerText = timer.guiText.fontSize;
  
  objective = GameObject.Find('Objective');
  objective_shadow = GameObject.Find('Objective-shadow');
  
  originalObjectiveText = objective.guiText.fontSize;
  
  endMessage = GameObject.Find('EndMessage');
  endMessage_shadow = GameObject.Find('EndMessage-shadow');
  
  originalEndMessageText = endMessage.guiText.fontSize;  
  
  title = GameObject.Find('Title');
  title_shadow = GameObject.Find('Title-shadow');   
  
  instructions = GameObject.Find("Instructions");
  
  swanText = GameObject.Find("SwanText");
  cabText = GameObject.Find("CabText");
  busText = GameObject.Find("BusText");
  shipText = GameObject.Find("ShipText");
  bombText = GameObject.Find("BombText");
  clockText = GameObject.Find("ClockText");
  
  originalInstructionsText = swanText.guiText.fontSize;
  originalTitleText = title.guiText.fontSize;
  
  pauseMenu = GameObject.Find("PauseMenu");
} 

function OnGUI(){
  scale.x = Screen.width/originalWidth; // calculate hor scale
  scale.y = Screen.height/originalHeight; // calculate vert scale
  scale.z = 1;
  var svMat = GUI.matrix; // save current matrix
  // substitute matrix - only scale is altered from standard
  GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, scale);
  
  var buttonMultiplier : float = Mathf.Sqrt((200 * 200) * scale.x + (100 * 100) * scale.y);
  var normalTextMultiplier : float = (buttonMultiplier / Mathf.Sqrt((Screen.width * Screen.width) * scale.x + (Screen.height * Screen.height) * scale.y));
  
  GUI.skin.button.fontSize = (originalNormalText + (normalTextMultiplier * originalNormalText));
  
  buttonX = ((originalWidth - 200) / 2);
  buttonY = ((originalHeight - 100) / 2);
  
  var fontMultiplier = Mathf.Sqrt((scale.x  * scale.x )  + (scale.y  * scale.y ));
  
  score.guiText.fontSize = originalScoreText * fontMultiplier;   
  score_shadow.guiText.fontSize = originalScoreText * fontMultiplier;
    
  timer.guiText.fontSize = originalTimerText * fontMultiplier;   
  timer_shadow.guiText.fontSize = originalTimerText * fontMultiplier;
  
  objective.guiText.fontSize = originalObjectiveText * fontMultiplier;   
  objective_shadow.guiText.fontSize = originalObjectiveText * fontMultiplier;
  
  endMessage.guiText.fontSize = originalEndMessageText * fontMultiplier;   
  endMessage_shadow.guiText.fontSize = originalEndMessageText * fontMultiplier;
   
  title.guiText.fontSize = originalTitleText * fontMultiplier;   
  title_shadow.guiText.fontSize = originalTitleText * fontMultiplier;
  
  instructions.guiText.fontSize = originalTitleText * fontMultiplier;   
  
  swanText.guiText.fontSize = originalInstructionsText * fontMultiplier; 
  cabText.guiText.fontSize = originalInstructionsText * fontMultiplier; 
  busText.guiText.fontSize = originalInstructionsText * fontMultiplier; 
  shipText.guiText.fontSize = originalInstructionsText * fontMultiplier; 
  bombText.guiText.fontSize = originalInstructionsText * fontMultiplier; 
  clockText.guiText.fontSize = originalInstructionsText * fontMultiplier; 
  
  var restartY : int = 670;
  var startY : int = 800;
  var startX : int = buttonX + 200;
  if (controlCenter.GetComponent(GameManager).starting) {
  	if (GUI.Button(Rect(startX, startY ,200,100),"Start!", style))
    controlCenter.GetComponent(GameManager).StartGame();    
  }
  
  if (controlCenter.GetComponent(GameManager).finishing) {
    if ( controlCenter.GetComponent(GameManager).WinEvaluator() ) {
      if (GUI.Button(Rect(buttonX, restartY,200,100),"Restart!", restartStyle))
      controlCenter.GetComponent(GameManager).StartGame();    
    }
    else {
      if (GUI.Button(Rect(buttonX, restartY,200,100),"Restart!", restartStyle))
      controlCenter.GetComponent(GameManager).StartGame();    
    }
  	
  }
  
  if (gameStarted && !(pauseMenuButtons || pauseMenuOptionButtons)) {
    if (GUI.Button(Rect(30, 50 ,100,100),"", pauseButtonStyle))
      TogglePauseMenu();
  }
  
  if (gameStarted && (pauseMenuButtons || pauseMenuOptionButtons)) {
    if (GUI.Button(Rect(30, 50 ,100,100),"", startButtonStyle))
      TogglePauseMenu();
  }
  
  //Paused menu
  if (pauseMenuButtons) {
  
    if (GUI.Button(Rect(buttonX + 35, 250 ,200,100),"Resume", restartStyle))
      TogglePauseMenu();
  
    if (GUI.Button(Rect(buttonX  + 35, 400 ,200,100),"Restart", restartStyle)) {
      TogglePauseMenu();
      controlCenter.GetComponent(GameManager).RestartGame();    
    }
    
    if (GUI.Button(Rect(buttonX  + 35, 550 ,200,100),"Options", restartStyle)) 
      ShowPauseMenuOptionButtons();    
    
    if (GUI.Button(Rect(buttonX  + 35, 700 ,200,100),"Exit", restartStyle))
      MenuScene();    
  }
  
  //Paused option menu
  if (pauseMenuOptionButtons) {
    if (GUI.Button(Rect(buttonX  + 35, 700 ,200,100),"Back", restartStyle))
      HidePauseMenuOptionButtons();   
      
    var musicStyle : GUIStyle;
    if  (music.GetComponent(MusicManager).soundActive)
      musicStyle = musicOnButtonStyle;
    else 
      musicStyle = musicOffButtonStyle;
    
    if (GUI.Button(Rect(buttonX  + 35, 250 ,200,200),"", musicStyle))
      music.GetComponent(MusicManager).ToggleSound();
      
    var soundStyle : GUIStyle;
    if  (soundCenter.GetComponent(SoundManager).soundActive)
      soundStyle = soundOnButtonStyle;
    else 
      soundStyle = soundOffButtonStyle;
    
    if (GUI.Button(Rect(buttonX  + 35, 470 ,200,200),"", soundStyle))
      soundCenter.GetComponent(SoundManager).ToggleSound();
  }
  // restore matrix before returning
  GUI.matrix = svMat; // restore matrix
  
}

function ToggleGameStarted() {
  gameStarted  = !gameStarted;
}

function TogglePauseMenu() {
  if (!showingPauseMenu) {
    ShowPauseMenu();
    
  } else {
    HidePauseMenu();
  }
  
  showingPauseMenu = !showingPauseMenu;
}

function ShowPauseMenu() {
  controlCenter.GetComponent(GameManager).SendMessage("Pause");  
  ToggleVisibility(pauseMenu.transform, true);
  ShowPauseMenuButtons();
}

function HidePauseMenu() {
  controlCenter.GetComponent(GameManager).SendMessage("UnPause");
  ToggleVisibility(pauseMenu.transform, false);  
  HidePauseMenuOptionButtons();
  HidePauseMenuButtons();
}

function ToggleVisibility(obj : Transform, state : boolean) {  
  for ( var i : int = 0; i < obj.childCount; i++) {
    if (obj.GetChild(i).guiTexture != null)
      obj.GetChild(i).guiTexture.enabled = state;
      
    if (obj.GetChild(i).guiText != null)
      obj.GetChild(i).guiText.enabled = state;
      
    if (obj.GetChild(i).gameObject.GetComponent(SpriteRenderer) != null)
      obj.GetChild(i).gameObject.GetComponent(SpriteRenderer).enabled = state;

    if (obj.GetChild(i).childCount > 0) {
      ToggleVisibility(obj.GetChild(i), state);
    }
  }
}

function ShowPauseMenuButtons() {

  pauseMenuButtons = true;
  
}

function HidePauseMenuButtons() {

  pauseMenuButtons = false;  
  
}

function ShowPauseMenuOptionButtons() {

  HidePauseMenuButtons();
  pauseMenuOptionButtons = true;
  
}

function HidePauseMenuOptionButtons() {

  ShowPauseMenuButtons();
  pauseMenuOptionButtons = false;
  
}

function MenuScene() {
  Application.LoadLevel("HomeMenu");
}

