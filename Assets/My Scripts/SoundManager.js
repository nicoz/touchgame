#pragma strict
private var started : boolean = false;
var soundActive : boolean = true;

function Awake() {
  DontDestroyOnLoad(transform.gameObject);
}

function ToggleSound() {
  soundActive = !soundActive;
}

function PlaySound(sound : AudioClip, position : Vector3) {
  if (soundActive) 
    AudioSource.PlayClipAtPoint(sound, position);
}