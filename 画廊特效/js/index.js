(function(D, W){
	var $wrap, $photos;
	$(function(){
		$wrap = $('#wrap');
		$photos = $wrap.find('.photos');

		$photos.on('click', '.photo-list', function(){
			var $this = $(this);
			if($this.hasClass('photo-center')){
				if($this.hasClass('photo-back')){
					$this.removeClass('photo-back').addClass('photo-front');
				}else{
					$this.removeClass('photo-front').addClass('photo-back');
				}
				return false;
			}
			
			$photos.find('.photo-list').removeClass('photo-center');
			$this.addClass('photo-center');
			photoSort();
		});
		init();
	});

	/*初始化*/
	function init(){
		var _tmp_html = loadData();
		$photos.show().html(_tmp_html);
		
		var num = random(0, data.length-1);
		var curId = data[num].id;
		$photos.find('.photo-list').removeClass('photo-center');
		$photos.find('#photo'+curId).addClass('photo-center');
		photoSort();
	}

	/*获取随机数*/
	function random(n1, n2){
		var min = Math.min(n1, n2);
		var max = Math.max(n1, n2);
		var space = max-min;
		var num = Math.round(Math.random()*space+min);
		return num;
	}	

	/*加载数据*/
	function loadData(){
		var _tmp_html = '', arr=[];
		for(var k in data){
			var fragement = $photos.find('.photo-list').prop('outerHTML');
			fragement = fragement.replace(/{{id}}/, data[k].id)
				.replace(/{{image}}/, data[k].img)
				.replace(/{{title}}/, data[k].title)
				.replace(/{{content}}/, data[k].content);
			arr.push(fragement);	
		}
		var _tmp_html = arr.join('');
		return _tmp_html;
	}

	/*取值范围*/
	function range(){
		var range = {left:{x:[], y:[]}, right:{x:[], y:[]}};
		var wrap = {
			w: $wrap.width(),
			h: $wrap.height()
		}
		var $photoList = $photos.find('.photo-list');
		var photo = {
			w: $photoList.width(),
			h: $photoList.height()
		}
		range.wrap = wrap;
		range.photo = photo;
		range.left.x = [-photo.w/2, wrap.w/2-photo.w/2];
		range.left.y = [-photo.h/2, wrap.h-photo.h/2];
		range.right.x = [wrap.w/2, wrap.w+photo.w/2];
		range.right.y = [-photo.h/2, wrap.h-photo.h/2];
		return range;
	}

	/*海报排序*/
	function photoSort(){
		var $photoList = $photos.find('.photo-list');
		var rangeObj = range();
		var arr=[], leftArr=[], rightArr=[];
		/*设置中间元素的样式 获取其他元素的id*/
		$photoList.each(function(index, elem){
			var $elem = $(elem);
			var className = $elem.attr('class');
			var id = $elem.attr('id');
			if(className.indexOf('photo-center') != -1){
				$elem.css({'left':'50%', 'top':'50%', 'transform':'rotate(0deg) scale(1.3)'});
				return true;
			}
			arr.push(id);
		});
		/*左右元素随机分配*/
		var len = Math.ceil(arr.length/2);
		for(var i=len; i>0; i--){
			var index = random(0, i);
			var id = arr.splice(index, 1)[0];
			leftArr.push(id);
		}
		rightArr = arr;
		for(var key in leftArr){
			var $elem = $('#'+leftArr[key]);
			var left = random(rangeObj.left.x[0], rangeObj.left.x[1]);
			var top = random(rangeObj.left.y[0], rangeObj.left.y[1]);
			var angle = random(20, 160);
			$elem.css({'left':left+'px', 'top':top+'px', 'transform':'rotate('+angle+'deg) scale(1)'});
		}
		for(var key in rightArr){
			var $elem = $('#'+rightArr[key]);
			var	left = random(rangeObj.right.x[0], rangeObj.right.x[1]);
			var	top = random(rangeObj.right.y[0], rangeObj.right.y[1]);
			var	angle = random(-160, -20);
			$elem.css({'left':left+'px', 'top':top+'px', 'transform':'rotate('+angle+'deg) scale(1)'});
		}
	}


})(document, window);


