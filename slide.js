/**
 * 注意：添加图片时按照示例前后各增加一个
 * @ulEle 图片ul元素
 * @olEle 小图标ol元素
 * @opt    object-可选参数    
 	order  boolean-默认true 顺序
 	loop   boolean-默认true 循环
 	interval   int-单位ms  完成切换的时间
 	time   int-单位ms 完成切换过程中移动的间隔
   @类名与样式的对应
    .on    序号图标，默认：{background: red;color: #fff;}
   @默认信息
    切换图片的时间间隔：2000ms
 */
function slide(ulEle,olEle,opt){
	// 0.全局变量
	var curI = 0,
		oImg = ulEle.getElementsByTagName('img'),
		   w = oImg[0].width,
	 nextBtn = oo('#next'),
	 prevBtn = oo('#prev'),
	   index = 1,
	animated = false,
	   timer ;
	// 1.设置默认
	var options = {
		interval:100,
		time:10
	};
	//2.opt覆盖默认
	for(var key in opt){
		options[key] = opt[key];
	}
	//3.轮播处理-根据图片生成orderOl，完成orderOl的点击事件绑定	
	var imgl = oImg.length,
		orderl = imgl-2,
		orderText = '';
	for (var i = 0;i<orderl;i++) {
		orderText += "<li class='orderSlide' index='"+(i+1)+"'>"+(i+1)+"</li>";
	}
	olEle.innerHTML = orderText;
	var order = olEle.getElementsByTagName('li');
	order[0].className="on";

	//3.轮播处理-动态切换animate()
	function animate (offset) {
        if (offset == 0) {
            return;
        }
		var target = parseInt(ulEle.style.left) + offset,
			speed  = offset/options.interval;
		animated = true;
		var go = function(){
			var left = parseInt(ulEle.style.left);
			if ( (speed<0 && left > target) || (speed>0 && left < target) ){
				ulEle.style.left = left+speed+"px";
				setTimeout(go,options.time);
			} else {
				ulEle.style.left = target+"px";
				if (left > 0) {
					ulEle.style.left = -(imgl-3)*w+'px';
				} else if (left < -(imgl-1)*w) {
					ulEle.style.left = -2*w+'px';
				}
				animated = false;			
			}
		};
		go();
	}
	//3.轮播处理-小图标切换showOrder()
	function showOrder(){
		for (var i = orderl-1; i >= 0; i--) {
			if (order[i].className == "on") {
				order[i].className="orderSlide";
			break;
			}
		}
		order[index-1].className = "on";
	}
	//3.轮播处理-自动切换
	function play(){
		clearInterval(timer);
		timer = setInterval (function(){
			next.onclick();
			play();
		},2000);
	}
	function stop(){
		clearInterval(timer);
	}
	//3.轮播处理-点击向前或向后
	prev.onclick=function(){
		if (animated) {
			return
		};
		if (index == 1) {
			index = 5;
		} else {
			index -= 1;		
		}
		showOrder();
		animate(200);
	}
	next.onclick=function(){
		if (animated) {
			return;
		};
		if (index == 5) {
			index = 1;
		} else {
			index += 1;		
		}
		showOrder();
		animate(-200);
	}
	for (var i = 0; i <order.length; i++) {
		order[i].onclick = function(){
			if (animated) {
				return;
			};
			if (this.className == 'on') {
				return;
			};
			var newIndex = parseInt(this.getAttribute("index"));
			var offset = -w*(newIndex-parseInt(index));
			animate(offset);
			index = parseInt(newIndex);
			showOrder();	
		}
	}; 
	//4.初始化
    ulEle.onmouseover = stop;
    ulEle.onmouseout = play;

    play();
}
