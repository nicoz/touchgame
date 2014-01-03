#pragma strict

var score : GameObject;
var specialItems : String[];
var go: GameObject;
var moving: boolean = false;

private var currentName : String;
private var points : int;
private var controlCenter : GameObject;
private var stop : boolean = false;
private var holdingKey : boolean = false;


function Start() {
  currentName = this.GetComponent(ActionObjectMetaData).currentName;
  points = this.GetComponent(ActionObjectMetaData).points;
  controlCenter = GameObject.Find("ControlCenter");
}

function Update() {

  stop = controlCenter.GetComponent(GameManager).stop;
    
  if (stop) return; //if the game is stopped there is no reason to keep checking the mouse down event
 
}

function ToggleHolding() {
	holdingKey = !holdingKey;
}

function OnPressEvent() {  
  
  
  
  var isSpecial : boolean = IsSpecialItem(currentName);
  
  if ( currentName ==  controlCenter.GetComponent(GameManager).currentObjective ||  isSpecial) { // add points if it is a correct click
    controlCenter.GetComponent(GameManager).SendMessage("ProcessEvent", points);
    if (isSpecial) {
      controlCenter.GetComponent(GameManager).SendMessage("ProcessSpecial");
    } else {
      controlCenter.GetComponent(GameManager).SendMessage("ProcessObjective", currentName);
    }
    
  }
  else { // rest points as a penalty
  	//controlCenter.GetComponent(GameManager).SendMessage("ProcessEvent", points * -1 / 3 );
  }
  
  
  Destroy(this.gameObject);
}

function IsSpecialItem( name : String) {
  var itIs : boolean = false;
  
  for( var item : String in specialItems) {    
    if (name == item) itIs = true;
  }

  return itIs;
}