﻿#pragma strict

var pickupClip : AudioClip;		// Sound for when the bomb crate is picked up.


private var anim : Animator;				// Reference to the animator component.
private var landed : boolean = false;		// Whether or not the crate has landed yet.

//var pickupSpawner : PickupSpawner; //reference to the bombs spawner, neeed it to respawn the bomb if it fades
var specialItemsSpawner : SpecialItemsSpawner; //reference to the bombs spawner, neeed it to respawn the bomb if it fades

function Awake()
{
	// Setting up the reference.
	anim = transform.root.GetComponent(Animator);
	
	//pickupSpawner = GameObject.Find("pickupManager").GetComponent(PickupSpawner);	
	specialItemsSpawner = GameObject.Find("specialItemsManager").GetComponent(SpecialItemsSpawner);
}


function OnTriggerEnter2D (other : Collider2D)
{
	if(other.tag == "ground" && !landed)
	{
		// ... set the animator trigger parameter Land.
		anim.SetTrigger("Land");
		var parent = transform.parent.gameObject;
		
		transform.parent = null;
		gameObject.AddComponent(Rigidbody2D);
		landed = true;		
				
		Destroy(parent);
		StartCoroutine("Fade");
	}
}


function ExecuteAction() {
	/*
	if (!landed)
	  return;
	*/	
	if ( gameObject.name == "crate" ) {
	  gameObject.GetComponent(Bomb).Explode();
	}
	else {
	  anim.SetTrigger("Land");
	  var child : GameObject = gameObject.Find("crate");
	  child.GetComponent(Bomb).Explode();
	  Destroy(child);
	}
	
	Destroy (gameObject);

}

function Fade() {
  yield new WaitForSeconds(5.0);
  
  // Make the pickup spawner start to deliver a new pickup.
  specialItemsSpawner.StartCoroutine(specialItemsSpawner.Spawn());
  
  specialItemsSpawner.GetComponent(SpecialItemsSpawner).SendMessage("ToggleExists");
  
  Destroy (gameObject);
}

