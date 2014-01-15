#pragma strict
private var started : boolean = false;
var soundActive : boolean = true;

function Awake() {
  DontDestroyOnLoad(transform.gameObject);
}


function StartMusic() {
  started = true;
  if (soundActive) {  
    gameObject.audio.Play();   
  }  
}

function StopMusic() {
  started = false;
  gameObject.audio.Stop();
  
}

function PauseMusic() {
  if (started)
    gameObject.audio.Pause();
}

function ResumeMusic() {
  if (started && soundActive)
    gameObject.audio.Play();
}

function ToggleSound() {
  soundActive = !soundActive;
}