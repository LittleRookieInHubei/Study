var btns = document.getElementsByTagName("button");
var is = document.getElementsByTagName("i");






var arr = [ '100px', 'abc'-6, [],-98765, 34, -2, 0, '300', , function(){alert(1);}, null, document, [], true, '200px'-30,'23.45元', 5, Number('abc'), function(){ alert(3); }, 'xyz'-90 ];

console.log(isNaN(arr[1]))
//console.log(arr.length)




btns[0].onclick = function(){
	var arr1 = [];
	for (var j=0;j<arr.length;j++) {//找到数组里的数字
		if(parseInt(arr[j])===arr[j]){//将数组转成数字与自身对比，数字类型，值与自身相同就挑出来
			
			arr1.push(arr[j])
		}
	};
	is[0].innerHTML = arr1;
};

console.log(typeof parseFloat(true))
btns[1].onclick = function(){
	var arr2 = [];
	for (var j=0;j<arr.length;j++) {//找到可以转成数字的
		if(parseFloat(arr[j])==0||parseInt(arr[j])){
			//剃掉非数字类型，并找到0和数字类型
			
			arr2.push(arr[j])
		}
	};
	is[1].innerHTML = arr2;
};

var n = -99999;
btns[2].onclick = function(){
	
	for (var i=0;i<arr.length;i++) {//可以转成功数字的最大值
		if(parseFloat(n)<parseFloat(arr[i])){//拿自定义n值与数组内数字类型对比，小于数组内的数字，就让n=数组数字，然后在循环接着比较
			n = arr[i]
		}
		is[2].innerHTML = n;
	}
	
}


console.log(arr)

btns[3].onclick = function(){//找到NaN的位置
	var arr3 = [];
	for (var i=0;i<arr.length;i++) {
		
		if(arr[i] != arr[i]){//console.log中利用NaN自身不等于自身特性   取到NaN的下标
			arr3.push(i)
		}
	}
	is[3].innerHTML = arr3;
}




