#pragma strict

var menu : GameObject;
var controlCenter : GameObject;


private var showing : boolean = true;

function Awake() {
  menu = GameObject.Find("PauseMenu");
  controlCenter = GameObject.Find("ControlCenter");
}

function Update() {
  #if UNITY_EDITOR
  if ( Input.GetKeyDown(KeyCode.Escape) ) {      
      
      if (!showing)
        Show();
      else
        Hide();
      
  }
  return;
  #endif

  #if UNITY_ANDROID
    if ( Input.GetKey(KeyCode.Escape) ) {      
      
      if (!showing)
        Show();
      else
        Hide();
      
    }
    return;
  #endif
  
  /*  
  if () {
    //Debug.Log("Escaping");    
    //Application.Quit();
    
  }
  */
}

function OnMouseDown() {
  if (!showing)
    Show();
  else
    Hide();
}

function Show() {
  controlCenter.GetComponent(GameManager).SendMessage("Pause");
  ToggleVisibility(menu.transform, true);
}

function Hide() {
  controlCenter.GetComponent(GameManager).SendMessage("UnPause");
  ToggleVisibility(menu.transform, false);
}

function ToggleVisibility(obj : Transform, state : boolean) {
  showing = !showing;
  for ( var i : int = 0; i < obj.childCount; i++) {
    if (obj.GetChild(i).guiTexture != null)
      obj.GetChild(i).guiTexture.enabled = state;
      
    if (obj.GetChild(i).guiText != null)
      obj.GetChild(i).guiText.enabled = state;
      
    if (obj.GetChild(i).gameObject.GetComponent(SpriteRenderer) != null)
      obj.GetChild(i).gameObject.GetComponent(SpriteRenderer).enabled = state;

    if (obj.GetChild(i).childCount > 0) {
      ToggleVisibility(obj.GetChild(i), state);
    }
  }
}