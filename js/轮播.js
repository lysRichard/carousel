var container=document.getElementById('container');
var list=document.getElementById('list');
var buttons=document.getElementById('buttons').getElementsByTagName('span');
var prev=document.getElementById('prev');
var next=document.getElementById('next');
var index=1;
var len = 5;
var animated=false;
var timer;
function animate(offset){
	if(offset==0){
		return
	}
	var time=300;
	var interval=10;
	var speed=offset/(time/interval);
	var left = parseInt(list.style.left) + offset;
	var go = function (){
        if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
            list.style.left = parseInt(list.style.left) + speed + 'px';
            setTimeout(go, interval);
        }else {
            list.style.left = left + 'px';
            if(left>-200){
                list.style.left = -600 * len + 'px';
            }if(left<(-600 * len)) {
                list.style.left = '-600px';
            }
            animated = false;
        }
    }
	go();
}
function buttonShow(){
	for(var i=0;i<buttons.length;i++){
		if(buttons[i].className=="on"){
			buttons[i].className="";
			break;
		}
	}
	buttons[index-1].className="on";
}
function play(){
		timer=setInterval(function(){
			if(animated){
				return
			}else{
				if(index==5){
					index=1;
				}else{
					index+=1;
				}
				animate(-600);
				buttonShow();
			}
		},3000);
}
function stop(){
	clearInterval(timer);
}
window.onload=function(){
	play();
	container.onmouseover=stop;
	container.onmouseout=play;
	next.onclick=function(){
			if(index==5){
				index=1;
			}else{
				index+=1;
			}
			animate(-600);
			buttonShow();
		};
	prev.onclick=function(){
			if(index==0){
				index=5;
			}else{
				index-=1;
			}
			animate(600);
			buttonShow();
		};
	for(var i=0;i<buttons.length;i++){
		buttons[i].onclick=function(){
			if(animated){
				return
			}else{
				if(this.className=="on"){
					return
				}else{
					var myIndex=parseInt(this.getAttribute('index'));
					var offset=(-600)*(myIndex-index);
					animate(offset);
					index=myIndex;
					buttonShow();
				}
			}

		}
	}
}