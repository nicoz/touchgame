#pragma strict

var objectiveList : String[];
var targets : int[];
var score : GameObject;
var objective : GameObject;
var timer : GameObject;
var totalTime : int = 120;

var currentObjective : String = "Universe";
private var currentObjectiveIndex : int = 0;

var minutes : int;
var seconds : int;

var stop : boolean = false;


function Start () {
  score = GameObject.Find("Score");  
  objective = GameObject.Find("Objective");
  timer = GameObject.Find("Timer");
  
  var index = Random.Range(0,objectiveList.length);
  currentObjective = objectiveList[currentObjectiveIndex];
  objective.guiText.text = currentObjective;
  setTime();
  
  StartCoroutine("ChangeObjective");
  StartCoroutine("ProcessTime");
 
  CreateTargets();
 
}

function Update() {
  if(stop)
    Time.timeScale = 0; // pauses the current scene
    
    
  else
    Time.timeScale = 1;
    
  
}

function ProcessEvent( points : int ) {   
  score.GetComponent(MainScore).score = score.GetComponent(MainScore).score + points;  
}

function ProcessObjective (objective : String ) {
  
  for ( var index : int = 0; index < objectiveList.length ; index++ ) {
    //When I get the targeted item
    print( objective == objectiveList[index] );
    if ( objective == objectiveList[index] && targets[index] > 0 ) {
      targets[index] = targets[index] - 1;
      var label : GameObject = GameObject.Find(objective + "Text");
      var shadow : GameObject = GameObject.Find(objective + "Text-Shadow");
      
      label.guiText.text = objective + ' - ' + targets[index];
      shadow.guiText.text = objective + ' - ' + targets[index];
    }
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
    stop =  true;
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
  var starOne : GameObject = GameObject.Find("StarOne");
  var starTwo : GameObject = GameObject.Find("StarTwo");
  var starThree : GameObject = GameObject.Find("StarThree");
  
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
    var tmpName : String = objectiveList[index].ToLower() + 'Creator';
        
    
    var creator = GameObject.Find(tmpName);
    
    var maxRange = creator.GetComponent(Spawner).maxTimeBetweenSpawns + 2;
    var targetAmount = totalTime / maxRange;
    
    targets[index] = targetAmount;       
          
  }
  
  ShowTargets();
}

function ShowTargets() {  
  var textObjectives = GameObject.Find('Objectives');
  var title = GameObject.Find('Title');
  var title_shadow = GameObject.Find('Title-shadow');
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
