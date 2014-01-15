#pragma strict


var controlCenter : GameObject;




function Awake() {  
  controlCenter = GameObject.Find("ControlCenter");
}

function Update() {
  #if UNITY_EDITOR
  if ( Input.GetKeyDown(KeyCode.Escape) ) {            
     controlCenter.GetComponent(GameManager).SendMessage("TogglePauseMenu");       
  }
  return;
  #endif

  #if UNITY_ANDROID
    if ( Input.GetKey(KeyCode.Escape) ) {            
      controlCenter.GetComponent(GameManager).SendMessage("TogglePauseMenu");       
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
  controlCenter.GetComponent(GameManager).SendMessage("TogglePauseMenu");   
}


