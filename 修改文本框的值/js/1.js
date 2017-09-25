
//var btns = document.querySelectorAll(".btn");
//var shows = document.querySelectorAll(".show");
//var alters = document.querySelectorAll(".alter");
//var sures = document.querySelectorAll(".sure");
//var cancels = document.querySelectorAll(".cancel");
//var texts = document.querySelectorAll("input");
//var infos = document.querySelectorAll(".info");


//创建变量text_i获取元素.text_i:nth-of-type(1)
var text_i = document.querySelector(".text_i:nth-of-type(1)");
console.log(text_i)
//创建变量text_is获取元素.text_i:nth-of-type(2)
var text_is = document.querySelector(".text_i:nth-of-type(2)");
console.log(text_is)
//函数执行，实参
tab(text_i);

tab(text_is);
function tab(aa){//aa形参
	//获取子集
	var btns = aa.querySelector(".btn");
	var shows = aa.querySelector(".show");
	var alters = aa.querySelector(".alter");
	var sures = aa.querySelector(".sure");
	var cancels = aa.querySelector(".cancel");
	var texts = aa.querySelector("input");
	var infos = aa.querySelector(".info");


btns.onclick = function(){//点击btns,文本框消失，输入框出现，并且选中输入框内的value
	shows.style.display = 'none';
	alters.style.display = 'block';
	texts.select()//选中输入框内的value
	}
sures.onclick = function(){//点击确定，输入框消失，文本框出现
	
	shows.style.display = 'block';
	alters.style.display = 'none';
	
	
	if (texts.value=='') {//文本框内容为空时点击确定
		infos.innerHTML = '欢迎来到妙味课堂'
	}else{//文本框内容不为空时点击确定
		infos.innerHTML = texts.value
		
	}
	}

cancels.onclick = function(){//点击取消文本框出现，输入框消失
	
	alters.style.display = 'none';
	shows.style.display = 'block';
	}

};



/*
//上一组
texts[0].onclick = function(){
	texts[0].select()
}

btns[0].onclick = function(){
	shows[0].style.display = 'none';
	alters[0].style.display = 'block';
};
sures[0].onclick = function(){
	
	shows[0].style.display = 'block';
	alters[0].style.display = 'none';
	
	
	if (texts[0].value=='') {
		infos[0].innerHTML = '欢迎来到妙味课堂'
	}else{
		infos[0].innerHTML = texts[0].value
		
	}
}

cancels[0].onclick = function(){
	
	alters[0].style.display = 'none';
	shows[0].style.display = 'block';
}






//下一组

texts[1].onclick = function(){
	texts[1].select()
}

btns[1].onclick = function(){
	shows[1].style.display = 'none';
	alters[1].style.display = 'block';
};
sures[1].onclick = function(){
	
	shows[1].style.display = 'block';
	alters[1].style.display = 'none';
	
	
	if (texts[1].value=='') {
		infos[1].innerHTML = '欢迎来到妙味课堂'
	}else{
		infos[1].innerHTML = texts[1].value
		
	}
}

cancels[1].onclick = function(){
	
	alters[1].style.display = 'none';
	shows[1].style.display = 'block';
}


*/