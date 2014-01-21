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

private var music : GameObject;
private var soundCenter : GameObject;
private var pointsCenter : GameObject;


// The position on of the scrolling viewport
var scrollPosition : Vector2 = Vector2.zero;
	
function Awake() {
  controlCenter = GameObject.Find("controlCenter");
  
  gameTitle = GameObject.Find("GameTitle");
    
  
  originalTitleText = gameTitle.guiText.fontSize;
}

function Start() {  
  music = GameObject.Find("music");
  soundCenter = GameObject.Find("sound");
  pointsCenter = GameObject.Find("points");
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
  
  gameTitle.guiText.fontSize = originalTitleText * fontMultiplier;   
  
  buttonX = ((originalWidth - 200) / 2);
  buttonY = ((originalHeight - 100) / 2);
  
  //starting menu buttons
  if (menuOptions) {
    if (GUI.Button(Rect(buttonX + 35, 250,200,100),"Play", restartStyle)) {
      NextScene();
    }
  
    if (GUI.Button(Rect(buttonX + 35, 400,200,100),"Options", restartStyle)) {
      ToggleOptionMenu();
    }
  
    if (GUI.Button(Rect(buttonX + 35, 550,200,100),"Credits", restartStyle)) {
      ToggleCredits();
    }
  
    if (GUI.Button(Rect(buttonX + 35, 700,200,100),"Exit", restartStyle)) {
      ExitGame();
    }
  
  }
  
  if (menuOptionButtons) {
  
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
      
    if (GUI.Button(Rect(buttonX + 35, 700,200,100),"Back", restartStyle)) {
      ToggleOptionMenu();
    }         
  }
  
  if (menuCredits) {
  
    // An absolute-positioned example: We make a scrollview that has a really large client
    // rect and put it in a small rect on the screen.
    scrollPosition = GUI.BeginScrollView (Rect (buttonX - 50,buttonY - 240,400,400),
			scrollPosition, Rect (0, 0, 0, 1300));

    
    //GUI.Button(Rect (0, 0, 220, 200), "Game Designer");
    GUI.Label(Rect (0, 0, 220, 200), "Game Designer", creditStyleTitle);
    GUI.Label(Rect (0, 60, 220, 200), "Nicolas Zuasti", creditStyleText);
    
    GUI.Label(Rect (0, 100, 220, 200), "Lead Designer", creditStyleTitle);
    GUI.Label(Rect (0, 160, 220, 200), "Valentina Mele", creditStyleText);
    
    GUI.Label(Rect (0, 200, 220, 200), "Developers", creditStyleTitle);
    GUI.Label(Rect (0, 260, 220, 200), "Nicolas Zuasti", creditStyleText);
    GUI.Label(Rect (0, 290, 220, 200), "Hernan Lopez", creditStyleText);
    GUI.Label(Rect (0, 320, 220, 200), "Leonardo Rivero", creditStyleText);
    GUI.Label(Rect (0, 350, 220, 200), "Mathias Chubrega", creditStyleText);
    GUI.Label(Rect (0, 380, 220, 200), "Alvaro Correa", creditStyleText);
    
    GUI.Label(Rect (0, 420, 220, 200), "Testers", creditStyleTitle);
    GUI.Label(Rect (0, 480, 220, 200), "Valentina Mele", creditStyleText);
    GUI.Label(Rect (0, 510, 220, 200), "Hernan Lopez", creditStyleText);
    GUI.Label(Rect (0, 540, 220, 200), "Leonardo Rivero", creditStyleText);
    
    // End the scroll view that we began above.
    GUI.EndScrollView ();
    
    if (GUI.Button(Rect(buttonX + 35, 700,200,100),"Back", restartStyle)) {
      ToggleCredits();
    }         
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
  //Application.LoadLevel("London");
  Application.LoadLevel("LevelSelection");
}

function ExitGame() {
  Debug.Log("Bye Bye");
  Application.Quit();
}