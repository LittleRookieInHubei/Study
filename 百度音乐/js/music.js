var lis = document.querySelectorAll(".head_cont li");
var cBoxs = document.querySelectorAll(".head_cont li input")
var more = document.getElementById("more");

var arr =['#fff','pink'];


for (var i=0;i<lis.length;i++) {
	lis[i].index = i;
	lis[i].onOff = false;
	lis[i].color = arr[i%arr.length];
	
	lis[i].style.background = arr[i%arr.length];	
	
	
	
	lis[i].onclick = function(){
		
		
		if (this.onOff) {
			this.style.backgroundColor = '';
			cBoxs[this.index].checked = false;
			this.onOff = false;
			more.kg = false;
		} else{
			this.style.backgroundColor = 'red';
			cBoxs[this.index].checked = 'checked';
			this.onOff = true;
			more.kg = true;
		}
		func();
	}
	
	lis[i].onmouseover = function(){
		
		if(this.onOff){
			
		}else{
			this.style.backgroundColor = 'yellow';
		}
	}
	
	lis[i].onmouseout = function(){
		
		if(this.onOff){
			
		}else{
			this.style.backgroundColor = this.color;
		}
	}		
}


more.kg = false;
more.onclick = function(){
	
	if (this.kg) {
		for (var i=0;i<lis.length;i++) {
			lis[i].style.background = lis[i].color;
			cBoxs[i].checked = '';
			lis[i].onOff = false;
		}
		more.kg = false;
		more.checked = '';
		
	} else{
		
		for (var i=0;i<lis.length;i++) {
			lis[i].style.background = 'red';
			cBoxs[i].checked = 'checked';
			lis[i].onOff = true;
		}
		more.kg = true;
		more.checked = true;
	}
	
	
}

function func(){
	var n =0;

for (var i=0;i<lis.length;i++) {
	if (lis[i].onOff) {
		n++;
	} 
	
}
if(n ==lis.length){
	more.checked = 'checked';
}else{
	more.checked = '';
}

}
