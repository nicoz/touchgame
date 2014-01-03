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
    //Debug.Log("--------------Screen Touch-----------");
    var ray : Vector3;
    if (Input.GetAxisRaw("Press") != 0.0) { 
      //Debug.Log("--------------Mouse Touch-----------");
      var mousePosition: Vector3 = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, 1.0));
      //ray = GameObject.Find("mainCamera").ScreenPointToRay(Input.GetAxisRaw("Press").position);
      var hit : RaycastHit2D = new RaycastHit2D();
      moving = Physics2D.Raycast (mousePosition, -Vector2.up);
      hit = Physics2D.Raycast (mousePosition, -Vector2.up);
      //Debug.Log(-Vector2.up);
      
        if(moving) {
         go = hit.transform.gameObject;
         //Debug.Log("Touch Detected on: "+this);
         if (go.GetComponent(Interactor))
           go.GetComponent(Interactor).OnPressEvent();
       }
             
    }
    if (Input.touchCount > 0) {
      Debug.Log("---------------ACA NO!!-------------");
      var position: Vector3 = Camera.main.ScreenToWorldPoint(new Vector3(Input.GetTouch(0).position.x, Input.GetTouch(0).position.y, 1.0));
      var hitTouch : RaycastHit2D = new RaycastHit2D();
      moving = Physics2D.Raycast (position, -Vector2.up);
      hitTouch = Physics2D.Raycast (position, -Vector2.up);
      Debug.Log(-Vector2.up);
      
      if(moving) {
        go = hitTouch.transform.gameObject;
        Debug.Log("Touch Detected on: "+this);
        go.GetComponent(Interactor).OnPressEvent();
      }
    }
  }  

}
