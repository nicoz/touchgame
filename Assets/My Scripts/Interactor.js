#pragma strict

var score : GameObject;
private var currentName : String;
private var points : int;
private var controlCenter : GameObject;
private var stop : boolean = false;

function Start() {
  currentName = this.GetComponent(ActionObjectMetaData).currentName;
  points = this.GetComponent(ActionObjectMetaData).points;
  controlCenter = GameObject.Find("ControlCenter");
}

function OnMouseDown() {  
  
  stop = controlCenter.GetComponent(GameManager).stop;
    
  if (stop) return; //if the game is stopped there is no reason to keep checking the mouse down event
  
  if ( currentName ==  controlCenter.GetComponent(GameManager).currentObjective ) { // add points if it is a correct click
    controlCenter.GetComponent(GameManager).SendMessage("ProcessEvent", points);
    controlCenter.GetComponent(GameManager).SendMessage("ProcessObjective", currentName);
  }
  else { // rest points as a penalty
  	//controlCenter.GetComponent(GameManager).SendMessage("ProcessEvent", points * -1 / 3 );
  }
  
  
  Destroy(gameObject);
}