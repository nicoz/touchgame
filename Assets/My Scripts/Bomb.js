#pragma strict

var bombRadius : float = 10.0;			// Radius within which enemies are killed.
var bombForce : float = 100.0;			// Force that enemies are thrown from the blast.
var boom : AudioClip;					// Audioclip of explosion.
var fuse : AudioClip;					// Audioclip of fuse.
var fuseTime : float = 1.5;
var explosion : GameObject;			// Prefab of explosion effect.
var soundCenter : GameObject;

//private var pickupSpawner : PickupSpawner;	// Reference to the PickupSpawner script.
var specialItemsSpawner : SpecialItemsSpawner; //reference to the bombs spawner, neeed it to respawn the bomb if it fades
private var explosionFX : ParticleSystem;		// Reference to the particle system of the explosion effect.
private var controlCenter : GameObject;

function Awake ()
{
	// Setting up references.
	explosionFX = GameObject.FindGameObjectWithTag("ExplosionFX").GetComponent(ParticleSystem);
	//pickupSpawner = GameObject.Find("pickupManager").GetComponent(PickupSpawner);	
	specialItemsSpawner = GameObject.Find("specialItemsManager").GetComponent(SpecialItemsSpawner);
	controlCenter = GameObject.Find("ControlCenter");
	
	soundCenter = GameObject.Find("sound");
}

function Start ()
{
	
	// If the bomb has no parent, it has been laid by the player and should detonate.
	if(transform.root == transform)
		StartCoroutine(BombDetonation());
}


function BombDetonation()
{
	// Play the fuse audioclip.
	//AudioSource.PlayClipAtPoint(fuse, transform.position);
	soundCenter.GetComponent(SoundManager).PlaySound(fuse, transform.position);

	// Wait for 2 seconds.
	yield new WaitForSeconds(fuseTime);

	// Explode the bomb.
	Explode();
}


function Explode()
{
	
	// Make the pickup spawner start to deliver a new pickup.
	//pickupSpawner.StartCoroutine(pickupSpawner.Spawn());
    specialItemsSpawner.StartCoroutine(specialItemsSpawner.Spawn());
    
	controlCenter.GetComponent(GameManager).SendMessage("ProcessBomb");
 	
	// Set the explosion effect's position to the bomb's position and play the particle system.
	explosionFX.transform.position = transform.position;
	explosionFX.Play();

	// Instantiate the explosion prefab.
	Instantiate(explosion,transform.position, Quaternion.identity);

	// Play the explosion sound effect.
	soundCenter.GetComponent(SoundManager).PlaySound(boom, transform.position);
	//AudioSource.PlayClipAtPoint(boom, transform.position);

	// Destroy the bomb.
	Destroy (gameObject);
	
}
