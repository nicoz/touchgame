#pragma strict

var firstPlace : GameObject;
var firstDestiny : GameObject;

var targetA : GameObject; //origin point of the movement
var targetB : GameObject; //destination
var next : GameObject; //next destination
var lastPosition : GameObject; //last position before fading

var speed : float = 0.25; //acceletarion factor
var dropRangeLeft : float = -22.5;  // Smallest value of x in world coordinates the delivery can happen at.
var dropRangeRight : float = 22.5;	// Largest value of x in world coordinates the delivery can happen at.

var minHeight : float = -2.0;  //minimum height for the special item to move
var maxHeight : float = 2.0;   //maximum height for the special item to move

var changeTime : float = 2.5;  //time interval to wait before setting the new destination (as targetB)

var changed : boolean = false; //have it changed destinations already?

var firstTime : boolean = true; //just been spawned

var setToFade : boolean = false; //execute autoDestroy function
var previousX : float; //previous X position
var previousY : float; //previous Y position

var timer : float = 0;

var lifeTime : float = 30.0; //how many seconds will it remain on screen untouched

var weight : float;

var specialItemsSpawner : SpecialItemsSpawner; //reference to the special Items spawner, neeed it to respawn the special item if it fades

function Awake() {
	specialItemsSpawner = GameObject.Find("specialItemsManager").GetComponent(SpecialItemsSpawner);	
	targetA = new GameObject("Target A");
	targetA.tag = "Assistants";
	targetB = new GameObject("Target B");
	targetB.tag = "Assistants";
	next = new GameObject("Next Position");
	next.tag = "Assistants";
	lastPosition = new GameObject("Last Position");
	lastPosition.tag = "Assistants";
}

function Start() {		
  targetA.transform.position = transform.position;
  
  // Set the random seed so it's not the same each game.
  Random.seed = System.DateTime.Now.Millisecond;
  
  var tempX : float = Random.Range(dropRangeLeft, dropRangeRight);
  var tempY : float = Random.Range(minHeight, maxHeight);
  
  	
  targetB.transform.position = new Vector3(tempX, tempY, 1.0);  
	
  next.transform.position = targetB.transform.position;
		
  //start moving randomly
  StartCoroutine('ChangeTrajectory');

  //starts the countdown to fade if untouched
  StartCoroutine("Fade");	
}

function FixedUpdate () {
  
  timer += (2 * Time.deltaTime);
  
  weight = Mathf.Cos(timer * speed * 2 * Mathf.PI) * 0.5 + 0.5;
 

  transform.position = targetA.transform.position * weight + targetB.transform.position * (1-weight);	       

  if (setToFade) {
    if ( (transform.position == lastPosition.transform.position)) {
      Desintegrate();
      return;
    }
    
    if (transform.position == targetB.transform.position) {      
	  targetA.transform.position = lastPosition.transform.position;	 
	}
	
	if (transform.position == targetA.transform.position) {
	  targetB.transform.position = lastPosition.transform.position;	  
	}
  }
  else {
    
    if ( transform.position == targetB.transform.position ) {      
      targetA.transform.position = next.transform.position;
    }
    
    if ( transform.position == targetA.transform.position ) {     
      targetB.transform.position = next.transform.position;
    }
  }
  
}

function ChangeTrajectory() {

	previousX = targetB.transform.position.x;
	previousY = targetB.transform.position.y;
	
	// Wait for the delivery delay.
	yield new WaitForSeconds(changeTime);
	
	
	var tempX : float = Random.Range(dropRangeLeft, dropRangeRight);
	if ( Mathf.Abs(tempX - previousX) < 6 ) {
	  tempX = tempX * 1.5;
	}
	
	  
	var tempY : float = Random.Range(minHeight, maxHeight);
	if ( Mathf.Abs(tempY - previousY) < 1 ) {
	  tempY = tempY * 1.5;
	}
		
	next.transform.position = new Vector3(tempX, tempY, 1.0);

	
	StartCoroutine ('ChangeTrajectory');
}

function Fade() {
  yield new WaitForSeconds(lifeTime);
  
  // make the special item fly outside of the screen
  lastPosition.transform.position = new Vector3(targetB.transform.position.x, 15.0, 1.0);
  setToFade = true;
 
  
}

function Desintegrate() {
  specialItemsSpawner.GetComponent(SpecialItemsSpawner).SendMessage("ToggleExists");
  // Make the special items spawner start to deliver a new special Item.
  specialItemsSpawner.StartCoroutine(specialItemsSpawner.Spawn());
  
  
  Destroy (targetA);
  Destroy (targetB);
  Destroy (next);
  Destroy (lastPosition);
  Destroy (gameObject);    
}