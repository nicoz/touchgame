var originalWidth : float = 1920.0;  // define here the original resolution
var originalHeight  : float = 1080.0; // you used to create the GUI contents 
var originalNormalText : float = 48;
var originalGUIStyle : GUIStyle;
var originalScoreText : float;
var originalTimerText : float;
var originalObjectiveText : float;
var originalEndMessageText : float;
var originalTitleText : float;

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


private var scale: Vector3;

 
function Awake() {
  
  controlCenter = GameObject.Find("ControlCenter");
  
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
    
  originalTitleText = title.guiText.fontSize;
} 

/*function Update() {
  scale.x = Screen.width/originalWidth; // calculate hor scale
  scale.y = Screen.height/originalHeight; // calculate vert scale
  var titleMultiplier = Mathf.Sqrt((scale.x  * scale.x )  + (scale.y  * scale.y ));
  title.guiText.fontSize = originalTitleText * titleMultiplier;
  Debug.Log(title.guiText.fontSize);
}*/

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
  
  
  
  if (controlCenter.GetComponent(GameManager).starting) {
  	if (GUI.Button(Rect(buttonX, buttonY ,200,100),"Start!"))
    controlCenter.GetComponent(GameManager).StartGame();    
  }
  
  if (controlCenter.GetComponent(GameManager).finishing) {
    if ( controlCenter.GetComponent(GameManager).WinEvaluator() ) {
      if (GUI.Button(Rect(buttonX, buttonY + (190 * scale.y),200,100),"Restart!"))
      controlCenter.GetComponent(GameManager).StartGame();    
    }
    else {
      if (GUI.Button(Rect(buttonX, buttonY + (190 * scale.y),200,100),"Restart!"))
      controlCenter.GetComponent(GameManager).StartGame();    
    }
  	
  }
  
  // restore matrix before returning
  GUI.matrix = svMat; // restore matrix
  
}