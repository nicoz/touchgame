#pragma strict

var holdingKey : boolean = false;
var go: GameObject;
var moving: boolean = false;

function Start () {

}

function Update () {
  
   
   if ( holdingKey && Input.GetAxisRaw("Press") == 0 && Input.touchCount == 0 ) {
      moving = false;
      holdingKey = false;
      return;
  }
  
  if (!holdingKey && (Input.GetAxisRaw("Press") != 0.0 || Input.touchCount > 0) ) {
    holdingKey = true;    
    var ray : Vector3;
    var position : Vector3;
    var hitTouch : RaycastHit2D;
    if (Input.GetAxisRaw("Press") != 0.0) { 
      //Debug.Log("--------------Mouse Touched-----------");      
      position = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, 1.0));
      hitTouch = new RaycastHit2D();
      moving = Physics2D.Raycast (position, -Vector2.up, 0.01);
      hitTouch = Physics2D.Raycast (position, -Vector2.up, 0.01);
      
      
      if(moving) {
        go = hitTouch.transform.gameObject;      
        if (go.GetComponent(Interactor) != null) go.GetComponent(Interactor).OnPressEvent();
        
        if (go.GetComponent(SpecialItemsPickup) != null) go.GetComponent(SpecialItemsPickup).ExecuteAction();
        
        if (go.GetComponent(BombPickup) != null) go.GetComponent(BombPickup).ExecuteAction();
        
      }
    }
    if (Input.touchCount > 0) {
      //Debug.Log("---------------Screen Touched-------------");
      position = Camera.main.ScreenToWorldPoint(new Vector3(Input.GetTouch(0).position.x, Input.GetTouch(0).position.y, 1.0));
      hitTouch = new RaycastHit2D();
      moving = Physics2D.Raycast (position, -Vector2.up, 0.01);
      hitTouch = Physics2D.Raycast (position, -Vector2.up, 0.01);
      
      
      if(moving) {
        go = hitTouch.transform.gameObject;      
        go.GetComponent(Interactor).OnPressEvent();
      }
    }
  }
    
  
}
