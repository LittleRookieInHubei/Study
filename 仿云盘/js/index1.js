(function(){
	
	//自适应宽高
	var section = document.querySelector('#section');
	var head = document.querySelector('#head');
	function resize(){
		var clientH = document.documentElement.clientHeight;
		section.style.height = clientH - head.offsetHeight+'px';
	}
	window.onresize = resize;
	resize();

	//--------------------操作数据的方法-----------------------

	// 通过id获取这个id下的子数据
	function getChildsById(pid){
		var arr = [];
		for( var attr in data){
			if(data[attr].pid == pid){
				arr.push(data[attr])
			}
		}
		return arr;	
	}
	// 通过id找数据
	function getDataById(id){
		var item = data[id];
		if(item){
			return item
		}
		return null;
	}

	// 找到指定id下所有的子孙数据
	function getChildsAllById(id){
		// 找到这个id的数据
		var item = getDataById(id);
		var arr = [];
		// 把id对对应的数据push到数组中
		arr.push(item);
		for(var attr in data){
			if(data[attr].pid == id){
				arr = arr.concat(getChildsAllById(data[attr].id))
			}
		}

		return arr;
	}

	// 通过id找这id的父数据

	function getParentById(id){
		var item = getDataById(id);
		for(var attr in data){
			if(data[attr].id == item.pid){
				return data[attr]
			}
		}

		return null;
	}
	// 找到指定id所有的父级
	function getParentsById(id){
		var box = getDataById(id);
		var arr = [];
		while(box){
			arr.push(box);
			box = getParentById(box.id)
		};
		return arr;	
	}
	// 删除指定id下所有的子孙数据
	function delectDataById(id){
		var childsAll = getChildsAllById(id);
			
		for( var i = 0; i < childsAll.length; i++ ){
			delete data[childsAll[i].id]
		}

	}
	//判断有没有重复的；
	function reNameState(id,value){
		var childS = getChildsById(id);
		for(var i=0;i<childS.length;i++){
			if(childS[i].title === value){
				return true;
			}
		}
		return false;
	}

	// ----------------1.树形菜单区域--------------------------
	var treeMenu = document.querySelector(".tree-menu");
	var folderContent = document.getElementsByClassName("folder-content")[0];
	var num = -1;
	function treeMenuHtml(id,num){
		var chlids = getChildsById(id);
		num++;
		var html ='';
		if (chlids.length) {
			html = '<ul>'
			chlids.forEach(function(item){
				var childHtml = treeMenuHtml(item.id,num);
				html += `<li>
							<div data-id ="${item.id}" style="padding-left: ${num*15}px;" class="tree-title ${childHtml !==''?'tree-ico':''} close">
								<span><i></i>${item.title}</span>
							</div>
							${childHtml}
						</li>`
			});
			html += '</ul>'
		}
		return html
	};
	treeMenu.innerHTML = treeMenuHtml(-1,num);
	
	
	//-----------------2.渲染右边的文件夹区域-----------------
	var folders = document.querySelector(".folders");
	var fEmpty = document.querySelector(".f-empty");
	function foldersHtml(id){
		var arr = getChildsById(id);
		var html = '';
		if (arr.length) {//找到数据时
			arr.forEach(function(item){
				html +=`
				<div data-id ="${item.id}" class="file-item">
					<img src="img/folder-b.png" alt="" />
					<span class="folder-name">${item.title}</span>
					<input type="text" class="editor"/>
					<i></i>
				</div>`
			})
		}
		return html
	};
	folders.innerHTML = foldersHtml(0);

	//---------3.渲染导航条--------------------
	var breadNav = document.querySelector(".bread-nav");
	function breadNavHtml(id){
		var arr = getParentsById(id).reverse();
		var html = '';
		if (arr.length) {
			for (var i = 0; i < arr.length-1; i++) {
				html +=`<a data-id ="${arr[i].id}" href="javascript:;">${arr[i].title}</a>`
			}
			html +=`<span data-id ="${arr[arr.length-1].id}">${arr[arr.length-1].title}</span>`
			
		}
		return html
	}
	breadNav.innerHTML = breadNavHtml(0);
	



	//-----------------生成树形菜单和没有子级和生成文件区--------------
	function Three(dataId){
		folders.innerHTML = foldersHtml(dataId);//根据自身data-id生成对应菜单栏
		//没有子级时
		var childsHtml = foldersHtml(dataId);
		if(childsHtml === ""){
			fEmpty.style.display = 'block'
		}else{
			fEmpty.style.display = 'none'
		}
		//导航条重新渲染
		breadNav.innerHTML = breadNavHtml(dataId);
		checkedAll.classList.remove("checked");
	}
	
	// --------封装一个函数，指定id的菜单区域的标题添加class为active----
	function tjClassName(id){
		var selectDiv = treeMenu.querySelector(`div[data-id="${id}"]`);	
		var divs = treeMenu.getElementsByTagName("div");
		for( var i = 0; i < divs.length; i++ ){
			divs[i].classList.remove('active');
		}
		if(selectDiv){
			selectDiv.classList.add("active");
		}
	}
	//--------------------------------------------------------
	
	
	//----------1.点击左边树形菜单--------------------------------
	var treeMenuDivs = treeMenu.getElementsByTagName("div");
	tjClassName(0)//默认微云高亮
	treeMenu.onclick = function(ev){
		var tg = ev.target;
		var dataId = tg.parentNode.dataset.id;
		if (tg.nodeName === 'SPAN') {
			for (var i = 0; i < treeMenuDivs.length; i++) {
				treeMenuDivs[i].classList.remove("active")
			}
			tg.parentNode.classList.add("active");
			Three(dataId);//渲染结构
		}
	}
	//2.点击文件夹-----------------------------------------------
	var folders = document.querySelector(".folders");
	var fileItem = document.getElementsByClassName("file-item");
	
	folders.addEventListener("click",function(ev){
		var target = ev.target;
		if (target.nodeName === 'INPUT') {
			ev.stopPropagation()
			return
		}
		if (target === this) {
			return
		}
		if (target.nodeName === 'I') {
			return
		}
		if (target.parentNode.classList.contains("file-item")) {//事件源的父级的class名包含file-item时
			target = target.parentNode
			
		}
		var dataId = target.dataset.id;
		
		Three(dataId);//渲染结构
		tjClassName(dataId)//给对应Id的树形菜单添上状态
		ev.stopPropagation();
	})
	
	//3.点导航条-----------------------------------------------
	breadNav.onclick = function(ev){
		if (ev.target.nodeName === 'A') {
			var dataId = ev.target.dataset.id;
			Three(dataId);//渲染结构
			tjClassName(dataId)//给对应Id的树形菜单添上状态
		}
	}
	//4.全选----------------------------------------------------------
	var checkedAll = document.querySelector(".checkedAll");
	var checkBoxs = folders.getElementsByTagName("i");
	checkedAll.onclick = function(){
		//没有子数据的情况
		var navSpan = breadNav.getElementsByTagName("span")[0];
		var spanId = navSpan.dataset.id;
		var childs = getChildsById(spanId);
		if(childs.length === 0){
			return;
		}
		
		var aa = this.classList.toggle('checked');
		if(aa){
			for( var i = 0; i < checkBoxs.length; i++ ){
				checkBoxs[i].classList.add("checked")
				fileItem[i].classList.add("hov")
			}
		}else{
			for( var i = 0; i < checkBoxs.length; i++ ){
				checkBoxs[i].classList.remove("checked");
				fileItem[i].classList.remove("hov")
			}
		}
	}
	//5.单选------------------------------------------------
	folders.addEventListener("click",function(ev){
		if (ev.target.nodeName === 'I') {
			ev.target.classList.toggle("checked");
			ev.target.parentNode.classList.toggle("hov");
			
			if (whoSelected().length === checkBoxs.length) {//全部选中时
				checkedAll.classList.add("checked")
			}else{//没有全部选中
				checkedAll.classList.remove("checked")
			}
			ev.stopPropagation()
		}
		
	})
	
	// 获取那些选中的input
	function whoSelected(){
		var arr = [];
		for( var i = 0; i < checkBoxs.length; i++ ){
			if(checkBoxs[i].classList.contains("checked")){
				arr.push(checkBoxs[i])
			}
		}
		return arr;
	}
	
	//6.框选------------------------------------------------------
	on(folders,'mousedown',function(ev){
		var newDiv = document.createElement('div');
		newDiv.className = 'kuang';
		var disX = ev.clientX;
		var disY = ev.clientY;
		newDiv.style.left = disX + 'px';
		newDiv.style.top = disY + 'px';
		newDiv.isAppend = false; // 代表是没有append
		on(document,'mousemove',moveFn);
		on(document,'mouseup',upFn);
		function moveFn(ev){
			if(Math.abs(ev.clientX - disX) > 10 || Math.abs(ev.clientY - disY) > 10){
				if(!newDiv.isAppend){
					document.body.appendChild(newDiv);
					newDiv.isAppend = true;
				}
				newDiv.style.width = Math.abs(ev.clientX - disX) + 'px';
				newDiv.style.height = Math.abs(ev.clientY - disY) + 'px';
				newDiv.style.left = Math.min(ev.clientX,disX) + 'px';
				newDiv.style.top = Math.min(ev.clientY,disY) + 'px';
				for(var i=0;i<fileItem.length;i++){
					if(collision(newDiv,fileItem[i])){
						fileItem[i].classList.add('hov');
						fileItem[i].lastElementChild.classList.add('checked');
					}else{
						fileItem[i].classList.remove('hov');
						fileItem[i].lastElementChild.classList.remove('checked');
					}
				}
				checkedAll.classList.remove("checked");
			}
			
		}
		function upFn(){
			off(document,'mousemove',moveFn);
			off(document,'mouseup',upFn);
			if(newDiv.isAppend){
				document.body.removeChild(newDiv);
			}
			var is = folders.getElementsByClassName("checked");
			if( is.length === 0 ){
					return
			}
			if(is.length === fileItem.length){
				checkedAll.classList.add('checked')
			}else{
				checkedAll.classList.remove('checked')
			}
		}
		ev.preventDefault();
	})
	
	//7.新建文件夹-------------------------------------------------------
	var create = document.getElementById("create");
	var tipBox = document.querySelector(".full-tip-box");
	create.onclick = function(){
		//checkedAll.classList.remove("checked")
		var navSpan = breadNav.getElementsByTagName("span")[0];
		var spanId = navSpan.dataset.id;
		//生成新文件夹的结构
		var firstDiv = folders.firstElementChild;
		var newDiv = document.createElement('div');
		newDiv.className = "file-item";
		newDiv.innerHTML = `
			<img src="img/folder-b.png" alt="" />
			<span class="folder-name"></span>
			<input type="text" class="editor" style="display: block;"/>
			<i></i>`
		
		//给没有子级的元素创建文件夹
		var childs = getChildsById(spanId);//通过ID找子数据
		if (childs.length === 0) {//没有子级
			fEmpty.style.display = 'none'
		}
		folders.insertBefore(newDiv,firstDiv);
		
		
		var editor = document.getElementsByClassName("editor")[0];
		editor.focus()//自动获取焦点
		
		document.onmousedown = function(ev){
				var folderName = document.querySelector(".folder-name");
				folderName.innerHTML = editor.value;		
				editor.style.display = "none";
				
				if (editor.value =="") {//为空时
					newDiv.remove()
					var divs = folders.querySelectorAll("i");
					if( divs.length == 0 ){
						fEmpty.style.display = 'block';
					}
					return
				}

				var zjById =  getChildsById(spanId);
				//console.log(zjById)
				for (var i = 0; i < zjById.length; i++) {
					if (zjById[i].title === folderName.innerHTML) {//同级下相同名时
						newDiv.remove()
						var divs = folders.querySelectorAll("i");
						if( divs.length == 0 ){
							fEmpty.style.display = 'block';
						}
						return
					}
				}
				//添加数据
				var num = Date.now()
				data[num] = {
				        "id": num,
				        "pid": spanId,
				        "title": folderName.innerHTML,
				        "type": "file"
				}
				newDiv.setAttribute("data-id",num)//添加上data-id
				treeMenu.innerHTML = treeMenuHtml(-1,0);//菜单栏重新渲染
				tjClassName(spanId)
				tipText.innerHTML = "新建成功";
				mTween(tipBox,{top:20},300,'linear',function(){
					setTimeout(function(){
						tipBox.style.top = "-32px"
					},800)
				})
			};
			document.onmouseup = function(){
				document.onmousedown = null
			}
	}
	
	//8.删除----------------------------------------
	var del = document.getElementById("del");
	//console.log(checkBoxs)
	del.onclick = function(){
		var navSpan = breadNav.getElementsByTagName("span")[0];
		var spanId = navSpan.dataset.id;
		var tipText = document.querySelector(".tip-text");
		var tanbox = document.getElementById("tanbox");
		var iS = whoSelected();
		if (iS.length === 0) {
			tipText.innerHTML = "请选择在删除";
			mTween(tipBox,{top:20},300,'linear',function(){
				setTimeout(function(){
					tipBox.style.top = "-32px"
				},800)
			})
		}else{
			tanbox.style.display = "block";
			var yes = tanbox.querySelector(".yes");
			var no = tanbox.querySelector(".no");
			var closeIco = tanbox.querySelector(".close-ico");
			yes.onclick = function(){
				for (var i = 0; i < iS.length; i++) {
					iS[i].parentNode.remove()//删除结构
					var fjId = iS[i].parentNode.dataset.id;
					delectDataById(fjId);//通过Id删除所有子级数据
					//console.log(data)
					treeMenu.innerHTML = treeMenuHtml(-1,-1);//菜单栏重新渲染
					tjClassName(spanId);//高亮渲染
				}
				if (!checkBoxs.length) {
					checkedAll.classList.remove("checked");
					fEmpty.style.display = 'block';
				}
				tanbox.style.display = "none";
			};
			no.onclick = function(ev){
				tanbox.style.display = "none";
			};
			closeIco.onclick = function(){
				tanbox.style.display = "none";
			}
		}
	}
	
	//9.重命名----------------------------------------、
//	var rename = document.getElementById("rename");
//	var tipText = document.querySelector(".tip-text");
//	rename.onclick = function(){
//		var iS = whoSelected();
//		if (iS.length === 0) {
//			tipText.innerHTML = "请选择在命名";
//			mTween(tipBox,{top:20},300,'linear',function(){
//				setTimeout(function(){
//					tipBox.style.top = "-32px"
//				},800)
//			})
//		} else if(iS.length == 1){
//			
//			var navSpan = breadNav.getElementsByTagName("span")[0];
//			var spanId = navSpan.dataset.id;
//			var oneSpan = iS[0].previousElementSibling.previousElementSibling;
//			
//			
//			for (var i = 0; i < iS.length; i++) {
//				iS[i].previousElementSibling.style.display = "block";
//				iS[i].previousElementSibling.value = iS[i].previousElementSibling.previousElementSibling.innerHTML;
//				iS[i].previousElementSibling.select();
//				iS[i].previousElementSibling.previousElementSibling.style.display ="none";
//			}
//			
//			folders.onclick = function(ev){
//				if (ev.target.nodeName === "INPUT") {
//					return
//				}
//				var val = iS[0].previousElementSibling.value
//				iS[0].previousElementSibling.previousElementSibling.style.display ="block";
//				if (iS[0].previousElementSibling.value == "") {
//					iS[0].previousElementSibling.previousElementSibling.innerHTML = iS[0].previousElementSibling.previousElementSibling.innerHTML
//				}else{
//					//需要判断下有重复的
//					if (reNameState(spanId,val)) {
//						tipText.innerHTML = "不能重复命名";
//						mTween(tipBox,{top:20},300,'linear',function(){
//							setTimeout(function(){
//								tipBox.style.top = "-32px"
//							},800)
//						})
//						iS[0].previousElementSibling.style.display = "none";
//						folders.onclick = null
//						return
//						
//					}else{
//						iS[0].previousElementSibling.previousElementSibling.innerHTML = iS[0].previousElementSibling.value 
//						
//					}
//					
//					folders.onclick = null
//				}
//
//				
//				iS[0].previousElementSibling.style.display = "none";
//				var fjId = iS[0].parentNode.dataset.id;
//				data[fjId].title = iS[0].previousElementSibling.value
//				treeMenu.innerHTML = treeMenuHtml(-1,-1);
//				tjClassName(spanId)//高亮
//				//ev.stopPropagation()
//			}
//		}else{
//			tipText.innerHTML = "不能同时重命名";
//			mTween(tipBox,{top:20},300,'linear',function(){
//				setTimeout(function(){
//					tipBox.style.top = "-32px"
//				},800)
//			})
//		}
//	}
//	
	
	
	//9.重命名------------------------------------------
	var rename = document.getElementById("rename");
	var tipText = document.querySelector(".tip-text");
	rename.onclick = function(){
		var iS = whoSelected();
		//console.log(iS)
		if (!iS.length) {
			tipText.innerHTML = "请选择在命名";
			mTween(tipBox,{top:20},300,'linear',function(){
				setTimeout(function(){
					tipBox.style.top = "-32px"
				},800)
			})
		}
		if (iS.length > 1) {
			tipText.innerHTML = "不能同时命名";
			mTween(tipBox,{top:20},300,'linear',function(){
				setTimeout(function(){
					tipBox.style.top = "-32px"
				},800)
			})
		}
		if(iS.length == 1){
			var navSpan = breadNav.getElementsByTagName("span")[0];
			var spanId = navSpan.dataset.id;
			var fjDiv = iS[0].parentNode;
			var gxSpan = fjDiv.getElementsByTagName("span")[0];
			var fjId = iS[0].parentNode.dataset.id;
			//console.log(fjId)
			//console.log(gxSpan)
			var spaninnHtml = gxSpan.innerHTML
			console.log(spaninnHtml)
			for (var i = 0; i < iS.length; i++) {
				iS[i].previousElementSibling.style.display = "block";
				iS[i].previousElementSibling.value = iS[i].previousElementSibling.previousElementSibling.innerHTML;
				iS[i].previousElementSibling.select();
				iS[i].previousElementSibling.previousElementSibling.style.display ="none";
			}
			folders.onclick = function(ev){
				if (ev.target.nodeName === "INPUT") {
					return
				}
				iS[0].previousElementSibling.previousElementSibling.style.display ="block";
				if (iS[0].previousElementSibling.value == "") {
					iS[0].previousElementSibling.previousElementSibling.innerHTML = spaninnHtml
				}else{
					iS[0].previousElementSibling.previousElementSibling.innerHTML = iS[0].previousElementSibling.value 
					
					data[fjId].title = iS[0].previousElementSibling.value
					
					treeMenu.innerHTML = treeMenuHtml(-1,-1);
					tjClassName(spanId)//高亮
					
				}
				iS[0].previousElementSibling.style.display = "none";
				//ev.stopPropagation()
			}
		}
	}
	
	
	
	//10.移动到------------------------------------------
	var remove = document.getElementById("remove");
	var zhezhao = document.getElementsByClassName("zhezhao")[0];
	var dirTree = document.getElementsByClassName("dirTree ")[0];
	var error = document.querySelector(".error");
	//console.log(error)
	var state = true;  // 状态可以移动的
	var targetId = null;  // 点击的目标父级的id
	
	remove.onclick = function(){
		
		var navSpan = breadNav.getElementsByTagName("span")[0];
		var dirTreeDiv = dirTree.getElementsByTagName("div");
		var spanId = navSpan.dataset.id;
		//console.log(spanId)
		var xz = whoSelected()
		if (xz.length !== 0) {//选中了
			zhezhao.style.display = "block";
			dirTree.innerHTML = treeMenuHtml(-1,-1);
			var oneDiv = dirTree.querySelector("div[data-id='0']")
			//console.log(oneDiv)
			oneDiv.style.backgroundColor = "#CCCCCC";
			
			var arr = [];
			for (var i = 0; i < xz.length; i++) {
				var id = xz[i].parentNode.dataset.id;
				arr = arr.concat(getChildsAllById(id))
			}
			arr.push(getDataById(spanId))
			//console.table(arr)
			var zhezhaoDiv = dirTree.querySelectorAll("div");
			var confirm = document.querySelector(".confirm");
			for (var i = 0; i < zhezhaoDiv.length; i++) {
				zhezhaoDiv[i].onclick = function(){
					for (var i = 0; i < zhezhaoDiv.length; i++) {
						zhezhaoDiv[i].style.backgroundColor = ""
					}
					this.style.backgroundColor = "red";
					var treeId = this.dataset.id;
					targetId = treeId;
					//console.log(treeId)
					error.innerHTML = '';  // 每一次点击先清空
					state = true;  // 每次点击状态归为true
					for (var j = 0; j < arr.length; j++) {
						if (arr[j].id == treeId) {
							//alert("不能移动")
							error.innerHTML = "移动失败"
							state = false;
							break;
						}
					}
				}
			}
			
			confirm.onclick = function(){
				
				var xz = whoSelected()
				if (state) {
					for (var i = 0; i < xz.length; i++) {
						var id = xz[i].parentNode.dataset.id;
						var item = getDataById(id);
						if(!reNameState(targetId,item.title)){
							xz[i].parentNode.remove();
							item.pid = targetId;
						}else{
							tipText.innerHTML = "部分重名";
							mTween(tipBox,{top:20},300,'linear',function(){
								setTimeout(function(){
									tipBox.style.top = "-32px"
								},800)
							})
						}
					}
					var foldersDiv = folders.querySelectorAll("div");
					if (foldersDiv.length === 0) {//判断是否有子级
						fEmpty.style.display = "block";
						checkedAll.classList.remove("checked")
					}
					treeMenu.innerHTML = treeMenuHtml(-1,-1);
					zhezhao.style.display = "none";
					tjClassName(spanId)//高亮
				}
			}
			
		}else{//没有选中
			tipText.innerHTML = "请选择在移动";
			mTween(tipBox,{top:20},300,'linear',function(){
				setTimeout(function(){
					tipBox.style.top = "-32px"
				},800)
			})
		}
		
	};
	var closeX = document.querySelector(".closeX");
	var cancel = document.querySelector(".cancel");
	
	cancel.onclick = closeX.onclick = function(){
		zhezhao.style.display = "none";
		error.innerHTML = '';  // 关掉就清空
	}
	
})();



