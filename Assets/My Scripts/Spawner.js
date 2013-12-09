#pragma strict

var backgroundProp : Rigidbody2D;		// The prop to be instantiated.
var leftSpawnPosX : float;				// The x coordinate of position if it's instantiated on the left.
var rightSpawnPosX : float;			// The x coordinate of position if it's instantiated on the right.
var minSpawnPosY : float;				// The lowest possible y coordinate of position.
var maxSpawnPosY : float;				// The highest possible y coordinate of position.
var minTimeBetweenSpawns : float;		// The shortest possible time between spawns.
var maxTimeBetweenSpawns : float;		// The longest possible time between spawns.
var minSpeed : float;					// The lowest possible speed of the prop.
var maxSpeed : float;					// The highest possible speeed of the prop.

function Start () {
  // Set the random seed so it's not the same each game.
  Random.seed = System.DateTime.Today.Millisecond;

  // Start the Spawn coroutine.
  StartCoroutine ("Spawn");
}

function Spawn () {
	// Create a random wait time before the prop is instantiated.
	var waitTime : float = Random.Range (minTimeBetweenSpawns, maxTimeBetweenSpawns);

	// Wait for the designated period.
	yield new WaitForSeconds(waitTime);

	// Randomly decide whether the prop should face left or right.
	var facingLeft : boolean = Random.Range (0, 2) == 0;

	// If the prop is facing left, it should start on the right hand side, otherwise it should start on the left.
	var posX : float = facingLeft ? rightSpawnPosX : leftSpawnPosX;

	// Create a random y coordinate for the prop.
	var posY : float = Random.Range (minSpawnPosY, maxSpawnPosY);

	// Set the position the prop should spawn at.
	var spawnPos : Vector3 = new Vector3 (posX, posY, transform.position.z);

	// Instantiate the prop at the desired position.
	var propInstance : Rigidbody2D = Instantiate (backgroundProp, spawnPos, Quaternion.identity) as Rigidbody2D;

	// The sprites for the props all face left.  Therefore, if the prop should be facing right...
	if (!facingLeft) {
			// ... flip the scale in the x axis.
			var scale : Vector3 = propInstance.transform.localScale;
			scale.x *= -1;
			propInstance.transform.localScale = scale;
	}

	// Create a random speed.
	var speed : float = Random.Range (minSpeed, maxSpeed);

	// These speeds would naturally move the prop right, so if it's facing left, multiply the speed by -1.
	speed *= facingLeft ? -1.0 : 1.0;

	// Set the prop's velocity to this speed in the x axis.
	propInstance.velocity = new Vector2 (speed, 0);

	// Restart the coroutine to spawn another prop.
	StartCoroutine ('Spawn');

	// While the prop exists...
	while (propInstance != null) {
			// ... and if it's facing left...
			if (facingLeft) {
					// ... and if it's beyond the left spawn position...
					if (propInstance.transform.position.x < leftSpawnPosX - 0.5f)
		// ... destroy the prop.
							Destroy (propInstance.gameObject);
			} else {
					// Otherwise, if the prop is facing right and it's beyond the right spawn position...
					if (propInstance.transform.position.x > rightSpawnPosX + 0.5f)
		// ... destroy the prop.
							Destroy (propInstance.gameObject);
			}

			// Return to this point after the next update.
			yield null;
	}
}