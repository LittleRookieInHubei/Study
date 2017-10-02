var t1s = $('.time');
var btns = $('.btn');
var cot = $('.countDown');

var item = $('.item');
var hid = $('.hidden');


function func(k){
	var spans = $('span',cot[k]);
	console.log(k)
	var fut = t1s[k].value;
	var future = new Date(fut);//将来的时间
	var now = new Date();//现在的时间
	//未来时间和现在时间的差值 （毫秒）
	var dValue = (future.getTime()-now.getTime())/1000;  // 秒
	if(dValue <= 0){
		hid[k].style.display = 'block';
		dValue = 0
		return
	}
	var hours = parseInt(dValue/3600); // 剩余的时
	var min = parseInt(dValue%86400%3600/60) // 剩余的分
	var se = parseInt(dValue % 60);
 	var timeDf = addZero(hours)+addZero(min)+addZero(se)
	for (var i = 0; i < spans.length; i++) {
		 	spans[i].innerHTML = timeDf.charAt(i)
	}
	
	if (dValue < 1) {//处理将来时间比现在时间小的情况
		dValue = 0
		clearInterval(item[k].timer)
		shake(item[k],'left',40)
		setTimeout(function(){
			hid[k].style.display = 'block'
			
		},400)
		setTimeout(function(){
			auto(k);
		},600)
	}
	
};

for (var i = 0; i < btns.length; i++) {
	fc(i)
}
function fc(m){
	btns[m].onclick = function(){
	if (item[m].timer) {//处理定时器累计的情况
		return
	}
	
	func(m)
	item[m].timer = setInterval(function(){
		func(m)
	},1000)
};
}


//生成结构

var arr = [
	{
		name:"iPhone7s plus 酷派手机",
		money:"抢购价:  <b>¥8000",
		img:"1"
	},
	{
		name:"27 英寸配备 Retina 5K显示屏",
		money:"抢购价:  <b>¥15999",
		img:"2"
	},
	{
		name:"iPad mini 4",
		money:"抢购价:  <b>¥1799",
		img:"3"
	},
	{
		name:"Apple iPhone 7 Plus 64g",
		money:"抢购价:  <b>¥5799</b>",
		img:"4"
	}
]




var shop = $('.shop');



function auto(z){
	var inHtml = '';
		inHtml = `<div class="product">
					<p class="introduction">${arr[z].name}</p>
					<span class="price">${arr[z].money}</span>
					<div class="pro"><img src="images/goods_${arr[z].img}.png" /></div>
				</div>`
	shop[0].innerHTML += inHtml;
}
