/*************************************************************************************************************************************
	Author - Motyar D @motyar
	web - motyar.blogspot.com
	chat - dharmmotyar@gmail.com
	mail me - dharmmotyar@gmail.com
*************************************************************************************************************************************/
var content;
var helpText = 'You can Edit me!!<br />Auto saves to local<br />Scroll to change Color<br />Ctr +/- to change the font size';
//function that alows editing
function editme(){
	content.contentEditable='true';
	content.focus();
}

//To save 
function saveme(){
	setCookie('content',content.innerHTML,365);	
	content.contentEditable='false';
} 

//Load contents onload
function loadContent(){	 
	if(window.addEventListener) document.addEventListener('DOMMouseScroll', changeColor, false);
	//for IE/OPERA etc
    document.onmousewheel = changeColor;
	content = document.getElementById("content");
        console.log(getCookie('content'));
        if(getCookie('content')=="<br>"){
		content.innerHTML = helpText;
	}else
	if(getCookie('content')!=""){
		content.innerHTML=getCookie('content');
	} else {
		content.innerHTML = helpText;
	}
	if(getCookie('contentColor')){
		content.style.color=getCookie('contentColor');
	}
}

//Clear the contents
function clearme(){
	if(getCookie('content')){
		setCookie('content','',365);
	}
	
	content.innerHTML=helpText;
}

//fetch cookies
function getCookie(c_name){
		if (document.cookie.length>0){  
			c_start=document.cookie.indexOf(c_name + "="); 
				if (c_start!=-1){ 
					c_start=c_start + c_name.length+1;
					c_end=document.cookie.indexOf(";",c_start);
					
					if (c_end==-1) c_end=document.cookie.length
					return unescape(document.cookie.substring(c_start,c_end));
				}
		}
	return "";
}

//Save Cookies
function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toUTCString());
}

//It detects the Del key press
document.onkeyup = function(evt){
					evt = (evt) ? evt : ((event) ? event : null);
					if (evt) { if(evt.keyCode==46){clearme();}}
					}


//Gives content a random color
function changeColor(event){  
   //the best line to generate random color hash value with JS
   var randCol = '#'+Math.round(0xffffff * Math.random()).toString(16);
   if(randCol=='#ffffff') return false; //no white please
   content.style.color = randCol 
   setCookie('contentColor',randCol,365);
}

//Adding ctrl+s
var isCtrl = false;
document.onkeyup=function(e){
    if(e.keyCode == 17) isCtrl=false;
}

document.onkeydown=function(e){
    if(e.keyCode == 17) isCtrl=true;
    if(e.keyCode == 83 && isCtrl == true) {
        //run code for CTRL+S -- ie, save!
        //alert("saved");
        return false;
    }
}
