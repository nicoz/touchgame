#pragma strict

var pickupClip : AudioClip;		// Sound for when the bomb crate is picked up.


private var anim : Animator;				// Reference to the animator component.
private var landed : boolean = false;		// Whether or not the crate has landed yet.


function Awake()
{
	// Setting up the reference.
	anim = transform.root.GetComponent(Animator);
}


function OnTriggerEnter2D (other : Collider2D)
{
	if(other.tag == "ground" && !landed)
	{
		// ... set the animator trigger parameter Land.
		anim.SetTrigger("Land");
		transform.parent = null;
		gameObject.AddComponent(Rigidbody2D);
		landed = true;		
	}
}

function OnMouseDown() {
	if (!landed)
	  return;
	  
	gameObject.GetComponent(Bomb).Explode();
	Destroy (gameObject);

}

