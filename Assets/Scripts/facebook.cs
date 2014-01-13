using UnityEngine;
using System.Collections;
using Facebook;

public class facebook : MonoBehaviour {
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	void Awake(){
		// Initialize FB SDK
		Debug.Log ("Awake");
		enabled = false;
		FB.Init(SetInit, OnHideUnity);  
	}
	
	void OnGUI(){
		//GUILayout.Box("");
		
		if (!FB.IsLoggedIn)                                                                                              
		{                                                                                                                
			GUI.Label((new Rect(11 , 0, 287, 160)), "Login to Facebook");
			if (GUILayout.Button("Login",GUILayout.MinHeight(160),GUILayout.MaxWidth(287)))
			{
				FB.Login("email,publish_actions", LoginCallback);
			}
		}
		else{
			GUI.Label((new Rect(20 , 50, 200, 100)), "User ID: " + FB.UserId);
			//if (GUILayout.Button("Logout",GUILayout.MinHeight(160),GUILayout.MaxWidth(287)))
			//{
			//	FB.Logout();
			//}
		}
	}
	
	private void SetInit()                                                                       
	{                                                                                            
		FbDebug.Log("SetInit");                                                                  
		enabled = true; // "enabled" is a property inherited from MonoBehaviour
		
		if (FB.IsLoggedIn)                                                                       
		{                                                                                        
			FbDebug.Log("Already logged in");
			OnLoggedIn();
		}
		else{
			FB.Login("email,publish_actions", LoginCallback);
		}
	}
	
	private void OnHideUnity(bool isGameShown)                                                   
	{                                                                                            
		FbDebug.Log("OnHideUnity");                                                              
		if (!isGameShown)                                                                        
		{                                                                                        
			// pause the game - we will need to hide                                             
			Time.timeScale = 0;                                                                  
		}                                                                                        
		else                                                                                     
		{                                                                                        
			// start the game back up - we're getting focus again                                
			Time.timeScale = 1;                                                                  
		}                                                                                        
	}
	
	void LoginCallback(FBResult result)                                                        
	{                                                                                          
		FbDebug.Log("LoginCallback");                                                          
		
		if (FB.IsLoggedIn)                                                                     
		{
			OnLoggedIn();
		}
	}
	
	void OnLoggedIn(){
		FbDebug.Log("Logged in. ID: " + FB.UserId);
	}
}
