#pragma strict

var specialItems : GameObject[];				// Array of pickup prefabs with the bomb pickup first and health second.
var pickupDeliveryTime : float = 10.0;		// Delay on delivery.
var maxPickupDeliveryTime : float = 20;
var dropRangeLeft : float;					// Smallest value of x in world coordinates the delivery can happen at.
var dropRangeRight : float;				// Largest value of x in world coordinates the delivery can happen at.
var minHeight : float = -7;
var maxHeight : float = 15.0;
var exists : boolean = false;




function Start ()
{
	// Set the random seed so it's not the same each game.
  	Random.seed = System.DateTime.Now.Millisecond;
  	
	// Start the first delivery.
	//StartCoroutine('Spawn');	
	
}


function Spawn()
{
  var waitTime = Random.Range(pickupDeliveryTime, maxPickupDeliveryTime);
  
  Debug.Log("Comienza el tiempo de espera para spawn: " + waitTime);
  // Wait for the delivery delay.
  yield new WaitForSeconds(waitTime);
  
  
  var randomIndex = Random.Range(0, specialItems.Length);
  Debug.Log("Finaliza el tiempo de espera: " + randomIndex);
  
  //  Create a random x coordinate for the special item to appear
  var dropPosX : float = Random.Range(dropRangeLeft, dropRangeRight);


  // Create a position with the random x coordinate.
  var dropPos : Vector3 = new Vector3(dropPosX, 15.0, 1.0);
  
  //if (!exists) {
 
	// ... instantiate a random special item
	var propInstance : Rigidbody2D = Instantiate (specialItems[randomIndex], dropPos, Quaternion.identity) as Rigidbody2D;
	
	exists = true;
	
  //}    
    
}

function ToggleExists() {
  exists = !exists;
}



