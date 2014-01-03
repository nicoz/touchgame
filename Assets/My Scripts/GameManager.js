#pragma strict


var objectiveList : String[];
var targets : int[];
var startingTime : int = 120;
private var totalTime : int;
var starting : boolean = false;
var finishing : boolean = false;

//you know games must have stars...
var starOne : GameObject;
var starTwo : GameObject;
var starThree : GameObject;
//just because... aliens!

var bombSpawner : GameObject;
var specialItemsSpawner : GameObject;

var textObjectives : GameObject;
var title : GameObject;
var title_shadow : GameObject;
var score : GameObject;
var objective : GameObject;
var objectiveShadow : GameObject;

var timer : GameObject;
var timerShadow : GameObject;

var endMessage : GameObject;
var endMessageShadow : GameObject;

var currentObjective : String = "Universe";
private var currentObjectiveIndex : int = 0;

var minutes : int;
var seconds : int;

var stop : boolean = false;

var oneStarScore : int = 0;
var twoStarScore : int = 0;
var threeStarScore : int = 0;

var twoStarCoef : float = 2.5;
var threeStarCoef : float = 3.5;


function Awake() {
  //HEY!!! WAKE UP... and initialize your objects!
  starOne = GameObject.Find("StarOne");
  starTwo = GameObject.Find("StarTwo");
  starThree = GameObject.Find("StarThree");
  
  bombSpawner = GameObject.Find("pickupManager");
  specialItemsSpawner = GameObject.Find("specialItemsManager");
  
  //only stars matters, but... someone must keep the other "things" under check
  score = GameObject.Find("Score");  
  objective = GameObject.Find("Objective");
  objectiveShadow = GameObject.Find("Objective-shadow");
  timer = GameObject.Find("Timer");
  endMessage = GameObject.Find("EndMessage");
  endMessageShadow = GameObject.Find("EndMessage-shadow");
  
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
  
  
}
    
function StartGame() {

  //starting time will be used to set the timer for the first time.
  totalTime = startingTime;
  oneStarScore = 0;
  //I know, I know, everyone wants to see the stars... but
  //they must earn them!!
  starOne.GetComponent(SpriteRenderer).enabled = false;
  starTwo.GetComponent(SpriteRenderer).enabled = false;
  starThree.GetComponent(SpriteRenderer).enabled = false;
  
  //I have to hide the win/loose message too
  endMessage.guiText.enabled = false;
  endMessageShadow.guiText.enabled = false;
  
  bombSpawner.GetComponent(PickupSpawner).StartCoroutine("Spawn");
  specialItemsSpawner.GetComponent(SpecialItemsSpawner).StartCoroutine("Spawn");
  
  //you cheating bastards, you will start with a clean score, no matter what!
  score.GetComponent(MainScore).score  = 0;
  
  var index = Random.Range(0,objectiveList.length);
  currentObjective = objectiveList[currentObjectiveIndex];
  objective.guiText.text = currentObjective;
  setTime();
  
  //the game has started
  starting = false;
  
  //so it is not finishing...
  finishing = false;
  
  //it is not longer paused, let the mayhem begin
  stop = false;
    
  objective.guiText.enabled = true;
  objectiveShadow.guiText.enabled = true;
  
  
  //this will be changing the objective to find on screen in random intervals of time
  StartCoroutine("ChangeObjective");
  
  //this will be changing the total time left
  StartCoroutine("ProcessTime");

  //this will calculate how many objectives will be needed to clear the level.
  CreateTargets();
}

function ProcessEvent( points : int ) {   
  //this function adds to the current score what it is passed to it, ... avoid cheating please!
  score.GetComponent(MainScore).score = score.GetComponent(MainScore).score + points;  
}

function ProcessObjective (objective : String ) {
  //this function searches in the list of objectives for the one named the same as the recieved parameter
  //if there is one, and the number of targets left is greater than 0 it substracts 1 from it and refresh the
  //GUI objects that refers to this particular objective
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

function ProcessSpecial() {
  //SpecialItems uses special Assistants... that must be destroyed with them.
  var assitants : GameObject[] = GameObject.FindGameObjectsWithTag("Assistants");
  for( var go : GameObject in assitants) {
  	Destroy(go);
  }
  specialItemsSpawner.GetComponent(SpecialItemsSpawner).SendMessage("ToggleExists");  
  specialItemsSpawner.GetComponent(SpecialItemsSpawner).StartCoroutine("Spawn");
}

function ProcessClock() {
  totalTime += 15.0;
  specialItemsSpawner.GetComponent(SpecialItemsSpawner).SendMessage("ToggleExists");  
  specialItemsSpawner.GetComponent(SpecialItemsSpawner).StartCoroutine("Spawn");
}

function ProcessBomb() {
  // Find all the gameObjects on the level with the tag Enemy
  var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");

  // For each one of those...	
  for( var go : GameObject in enemies) {
    //get their names
    var currentName : String = go.GetComponent(ActionObjectMetaData).currentName;
    //get their points
    var points : int = go.GetComponent(ActionObjectMetaData).points;
    //add the points to the score
    ProcessEvent(points);
    //substract one from the remaining objectives
    ProcessObjective(currentName);
    //destroy the object... it's no longer needed
    Destroy(go);
  }	
  //specialItemsSpawner.GetComponent(SpecialItemsSpawner).SendMessage("ToggleExists"); 
  bombSpawner.GetComponent(PickupSpawner).SendMessage("ToggleExists");
}

function ChangeObjective() {

  // Create a random wait time before the prop is instantiated.
  var waitTime : float = Random.Range(2, 8);
  
  var index : int = -1;
  
  // Wait for the designated period.
  yield new WaitForSeconds(waitTime);
  
  index = Random.Range(0,objectiveList.length);
    
  //in the remote chance that the index was the same as the previous time
  //try it again. Be carefull with this, if the objective list contains only one element...
  //this will loop for ever...
  while ( index == currentObjectiveIndex) {
    index = Random.Range(0,objectiveList.length);
  }
  
  //stores the new index only to check it next time
  currentObjectiveIndex = index;
  
  //gets the new objectives name
  currentObjective = objectiveList[currentObjectiveIndex];
  //show it on screen
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
  
  CleanStage();
  
  var finalScore : int = score.GetComponent(MainScore).score;
  
  if ( WinEvaluator() ) {   
    ShowWin( finalScore );
  }
  else {
    ShowLost();	  
  }
}

function WinEvaluator () {
  //this will search the objectives and targets arrays, if there is even
  //one element left on the targets the player looses, else he/she/it wins
  
  //lets start thinking possitively
  var win : boolean = true;  
  for ( var index : int = 0; index < objectiveList.length ; index++ ) {
    //When I get the targeted item    
    if ( targets[index] > 0 ) {
      win = false;
    }
  }
  
  return win;
}

function ShowWin( finalScore : int ) {
  endMessage.guiText.text = "You Win!";
  endMessage.guiText.enabled = true;
  endMessageShadow.guiText.enabled = true;
  if ( finalScore > oneStarScore ) {
    starOne.GetComponent(SpriteRenderer).enabled = true;
  }

  if ( finalScore > twoStarScore ) {
    starTwo.GetComponent(SpriteRenderer).enabled = true;
  }

  if ( finalScore > threeStarScore ) {
    starThree.GetComponent(SpriteRenderer).enabled = true;
  }	  
}

function ShowLost() {
  endMessage.guiText.text = "You Loose!";
  endMessage.guiText.enabled = true;
  endMessageShadow.guiText.enabled = true;
}

function CreateTargets() {
  
  
  for ( var index : int = 0; index < objectiveList.length ; index++ ) {
  	//cleaning up the house if it is not the first game
  	//must move this code to its propper function, but I'm tired and...
  	//the spaniard still talks to me.....
    Destroy ( GameObject.Find(objectiveList[index] + "Text") );
    Destroy ( GameObject.Find(objectiveList[index] + "Text-Shadow") );
    //and talks... and talks
    
    var tempScore : int = 0; //will calculate the minimum score adding the score of each target
    
    var tmpName : String = objectiveList[index].ToLower() + 'Creator';
            
    var creator = GameObject.Find(tmpName);
    
    var maxRange = creator.GetComponent(Spawner).maxTimeBetweenSpawns + 2;
    var targetAmount = totalTime / maxRange;
    
    targets[index] = targetAmount;       
    
    tempScore = creator.GetComponent(Spawner).backgroundProp.gameObject.GetComponent(ActionObjectMetaData).points;    
    oneStarScore += tempScore * targetAmount;
  }
  
  twoStarScore = oneStarScore * twoStarCoef;
  threeStarScore = oneStarScore * threeStarCoef;
  
  ShowTargets();
}

function ShowTargets() {  
  var scale: Vector3;
  var originalWidth : float = 1920.0;  // define here the original resolution
  var originalHeight  : float = 1080.0; // you used to create the GUI contents
  scale.x = Screen.width/originalWidth; // calculate hor scale
  scale.y = Screen.height/originalHeight; // calculate vert scale
  var fontMultiplier = Mathf.Sqrt((scale.x  * scale.x )  + (scale.y  * scale.y ));
  var y_pos : float = -0.02;
  var y_pos_shadow : float = -0.0225;
  var incremental : float = -0.06;
  
  for ( var index : int = 0; index < objectiveList.length ; index++ ) {
    y_pos += incremental;
    y_pos_shadow += incremental;
    
	var tmpName : String = objectiveList[index];

	var targetAmount : int = targets[index];

	var go = new GameObject(tmpName + "Text", GUIText);
	go.guiText.font = title.guiText.font;
	//go.guiText.fontSize = title.guiText.fontSize;
	go.guiText.fontSize = 45;
	go.guiText.fontSize = go.guiText.fontSize * fontMultiplier;
	go.guiText.text = tmpName + ' - ' + targetAmount;
	
	go.transform.parent = textObjectives.transform;
	go.transform.localPosition = new Vector3(-0.03, y_pos, -1);
	
	//now the shadow
	var go_shadow = new GameObject(tmpName + "Text-Shadow", GUIText);
	go_shadow.guiText.font = title_shadow.guiText.font;
	//go_shadow.guiText.fontSize = title_shadow.guiText.fontSize;
	go_shadow.guiText.fontSize = 45;
	go_shadow.guiText.fontSize = go_shadow.guiText.fontSize * fontMultiplier;
	go_shadow.guiText.color = title_shadow.guiText.color;
	go_shadow.guiText.text = tmpName + ' - ' + targetAmount;
	
	go_shadow.transform.parent = textObjectives.transform;
	go_shadow.transform.localPosition = new Vector3(-0.03, y_pos_shadow, -1);

    
  }
}

function CleanStage() {

  objective.guiText.text = "";
  objective.guiText.enabled = false;
  objectiveShadow.guiText.enabled = false;
  
  
  // Find all the thingies in the screen to wipe clean
  var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");

  // For each one of those thingies...	
  for( var go : GameObject in enemies) {
  	Destroy(go);
  }
  
  //now lets check if there is an spaceShip around
  var specialItems : GameObject[] = GameObject.FindGameObjectsWithTag("SpecialItems");
  for( var go : GameObject in specialItems) {
  	Destroy(go); //only to destroy it... man we are evil!!
  	specialItemsSpawner.GetComponent(SpecialItemsSpawner).SendMessage("ToggleExists");
  }
   
  //what about bombs in the air?
  var airCrates : GameObject[] = GameObject.FindGameObjectsWithTag("Crate");
  for( var go : GameObject in airCrates) {
  	Destroy(go);
  }
  
  //what about bombs in the ground?
  var crates : GameObject[] = GameObject.FindGameObjectsWithTag("BombPickup");
  for( var go : GameObject in crates) {
   	Destroy(go);
   	bombSpawner.GetComponent(PickupSpawner).SendMessage("ToggleExists");
  }
  
  //wipe the temporal Assistants too.
  var assitants : GameObject[] = GameObject.FindGameObjectsWithTag("Assistants");
  for( var go : GameObject in assitants) {
  	Destroy(go);
  }
}
