#pragma strict
private var started : boolean = false;

function StartMusic() {
   started = true;
   gameObject.audio.Play();   
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
  if (started)
    gameObject.audio.Play();
}