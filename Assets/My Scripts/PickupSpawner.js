#pragma strict

var pickups : GameObject[];				// Array of pickup prefabs with the bomb pickup first and health second.
var pickupDeliveryTime : float = 45.0;		//  Wait till delivery starts
var minimumWaitTime : float = 15.0;         //  Delay on delivery.
var dropRangeLeft : float;					// Smallest value of x in world coordinates the delivery can happen at.
var dropRangeRight : float;				// Largest value of x in world coordinates the delivery can happen at.
var exists : boolean = false;


function Start ()
{
    // Set the random seed so it's not the same each game.
  	Random.seed = System.DateTime.Now.Millisecond;
  	
	// Start the first delivery.
	//StartCoroutine(DeliverPickup());
}


function Spawn()
{
  // Wait for the delivery delay.
  var wait : float = Random.Range(minimumWaitTime, pickupDeliveryTime);
  
  Debug.Log("Tiempo de espera bomba o tiempo: " + wait);
  yield new WaitForSeconds(wait);

  // Create a random x coordinate for the delivery in the drop range.
  var dropPosX : float = Random.Range(dropRangeLeft, dropRangeRight);

  // Create a position with the random x coordinate.
  var dropPos : Vector3 = new Vector3(dropPosX, 15.0, 1.0);
	
  // ... instantiate a random pickup at the drop position.
  var pickupIndex : int = Random.Range(0, pickups.Length);
	
  if (!exists) {
    Instantiate(pickups[pickupIndex], dropPos, Quaternion.identity);
    exists = true;
  }
}

function ToggleExists() {
  exists = !exists;
}