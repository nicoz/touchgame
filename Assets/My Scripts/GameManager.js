#pragma strict

var objectiveList : String[];
var targets : int[];
var score : GameObject;
var objective : GameObject;
var timer : GameObject;
var totalTime : int = 120;
var starting : boolean = false;
var finishing : boolean = false;

//you know games must have stars...
var starOne : GameObject;
var starTwo : GameObject;
var starThree : GameObject;
//just because... aliens!

var textObjectives : GameObject;
var title : GameObject;
var title_shadow : GameObject;

var currentObjective : String = "Universe";
private var currentObjectiveIndex : int = 0;

var minutes : int;
var seconds : int;

var stop : boolean = false;

function Awake() {
  //HEY!!! WAKE UP... and initialize your objects!
  starOne = GameObject.Find("StarOne");
  starTwo = GameObject.Find("StarTwo");
  starThree = GameObject.Find("StarThree");
  
  //only stars matters, but... someone must keep the other "things" under check
  score = GameObject.Find("Score");  
  objective = GameObject.Find("Objective");
  timer = GameObject.Find("Timer");
  
  //last but not least
  textObjectives = GameObject.Find('Objectives');
  title = GameObject.Find('Title');
  title_shadow = GameObject.Find('Title-shadow');
}
function Start () {


  //at first the game is paused while the user reads the instructions for the scene
  stop  = true;
  
  //since the game hasn't started, it is not finishing...
  finishing = false;
  
  //did I mention that the game is starting at the beginning?
  starting = true;
}

function Update() {
  if(stop)
    Time.timeScale = 0; // pauses the current scene
    
    
  else
    Time.timeScale = 1;
    
  
}

function OnGUI() {
  if (starting) {
  	if (GUI.Button(Rect(10,70,50,30),"Start!"))
    StartGame();    
  }
  
  if (finishing) {
  	if (GUI.Button(Rect(10,70,50,30),"Restart!"))
    StartGame();    
  }
  
}
    
function StartGame() {

  totalTime = 120;

  //I know, I know, everyone wants to see the stars... but
  //they must earn them!!
  starOne.GetComponent(SpriteRenderer).enabled = false;
  starTwo.GetComponent(SpriteRenderer).enabled = false;
  starThree.GetComponent(SpriteRenderer).enabled = false;
  
  //you cheating bastards, you will start with a clean score, no matter what!
  score.GetComponent(MainScore).score  = 0;
  
  var index = Random.Range(0,objectiveList.length);
  currentObjective = objectiveList[currentObjectiveIndex];
  objective.guiText.text = currentObjective;
  setTime();
  
  //the game has started
  starting = false;
  
  //it is not longer paused, let the mayhem begin
  stop = false;
  
  StartCoroutine("ChangeObjective");
  StartCoroutine("ProcessTime");

  CreateTargets();
}

function ProcessEvent( points : int ) {   
  score.GetComponent(MainScore).score = score.GetComponent(MainScore).score + points;  
}

function ProcessObjective (objective : String ) {
  
  for ( var index : int = 0; index < objectiveList.length ; index++ ) {
    //When I get the targeted item    
    if ( objective == objectiveList[index] && targets[index] > 0 ) {
      targets[index] = targets[index] - 1;
      var label : GameObject = GameObject.Find(objective + "Text");
      var shadow : GameObject = GameObject.Find(objective + "Text-Shadow");
      
      label.guiText.text = objective + ' - ' + targets[index];
      shadow.guiText.text = objective + ' - ' + targets[index];
    }
  }
}

function ProcessBomb() {
  // Find all the colliders on the Enemies layer within the bombRadius.
  var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");

  // For each collider...	
  for( var go : GameObject in enemies) {
    var currentName : String = go.GetComponent(ActionObjectMetaData).currentName;
    var points : int = go.GetComponent(ActionObjectMetaData).points;
    ProcessEvent(points);
    ProcessObjective(currentName);
    Destroy(go);
  }	
}

function ChangeObjective() {
  // Create a random wait time before the prop is instantiated.
  var waitTime : float = Random.Range(2, 8);
  
  var index : int = -1;
  // Wait for the designated period.
  yield new WaitForSeconds(waitTime);
  
  index = Random.Range(0,objectiveList.length);
    
  while ( index == currentObjectiveIndex) {
    index = Random.Range(0,objectiveList.length);
  }
  
  currentObjectiveIndex = index;
  
  currentObjective = objectiveList[currentObjectiveIndex];
  objective.guiText.text = currentObjective;
  
  // Restart the coroutine
  StartCoroutine("ChangeObjective");
}

function ProcessTime() {
 // Wait for the designated period.
  yield new WaitForSeconds(1);
  
  totalTime -= 1;
  if (totalTime > 0) { //still playing
    setTime();
    // Restart the coroutine
  	StartCoroutine("ProcessTime");
  }
  else {
    setTime(); //one last time to show 00 as the remaining time
    FinishGame();
  }
}

function setTime() {
	minutes = totalTime / 60;
	seconds = totalTime % 60;
	var secondsString : String = seconds.ToString();
	var minutesString : String = minutes.ToString();
	
	var showText : String;
	
	
	if (seconds == 0) {
	  secondsString = seconds + "0";
	}
	else if ( seconds < 10 ) {
	  secondsString = "0" + seconds ;
	}
	
	if (minutes == 0) {
	  showText = secondsString;
	} 
	else {
	  showText = minutesString + " : " + secondsString;
	}
	
	timer.guiText.text = showText;
}

function FinishGame() {
  
  //ok, now the game is finishing;
  finishing = true;
  
  //back to pausing it, to show some stuff to the player
  stop =  true;
  
  var finalScore : int = score.GetComponent(MainScore).score;
  
  if ( finalScore > 100 ) {
    starOne.GetComponent(SpriteRenderer).enabled = true;
  }
  
  if ( finalScore > 500 ) {
    starTwo.GetComponent(SpriteRenderer).enabled = true;
  }
  
  if ( finalScore > 1000 ) {
    starThree.GetComponent(SpriteRenderer).enabled = true;
  }
  
  
}

function CreateTargets() {
  
  
  for ( var index : int = 0; index < objectiveList.length ; index++ ) {
  	//cleaning up the house if it is not the first game
  	//must move this code to its propper function, but I'm tired and...
  	//the spaniard still talks to me.....
    Destroy ( GameObject.Find(objectiveList[index] + "Text") );
    Destroy ( GameObject.Find(objectiveList[index] + "Text-Shadow") );
    //and talks... and talks
    
    var tmpName : String = objectiveList[index].ToLower() + 'Creator';
        
    
    var creator = GameObject.Find(tmpName);
    
    var maxRange = creator.GetComponent(Spawner).maxTimeBetweenSpawns + 2;
    var targetAmount = totalTime / maxRange;
    
    targets[index] = targetAmount;       
          
  }
  
  ShowTargets();
}

function ShowTargets() {  

  var y_pos : float = 0;
  var y_pos_shadow : float = -0.0025;
  var incremental : float = -0.04;
  
  for ( var index : int = 0; index < objectiveList.length ; index++ ) {
    y_pos += incremental;
    y_pos_shadow += incremental;
    
	var tmpName : String = objectiveList[index];

	var targetAmount : int = targets[index];

	var go = new GameObject(tmpName + "Text", GUIText);
	go.guiText.font = title.guiText.font;
	go.guiText.fontSize = title.guiText.fontSize;
	go.guiText.text = tmpName + ' - ' + targetAmount;
	
	go.transform.parent = textObjectives.transform;
	go.transform.localPosition = new Vector3(0.02, y_pos, -1);
	
	//now the shadow
	var go_shadow = new GameObject(tmpName + "Text-Shadow", GUIText);
	go_shadow.guiText.font = title_shadow.guiText.font;
	go_shadow.guiText.fontSize = title_shadow.guiText.fontSize;
	go_shadow.guiText.color = title_shadow.guiText.color;
	go_shadow.guiText.text = tmpName + ' - ' + targetAmount;
	
	go_shadow.transform.parent = textObjectives.transform;
	go_shadow.transform.localPosition = new Vector3(0.02, y_pos_shadow, -1);

    
  }
}
