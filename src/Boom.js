/**
 * @author Coco
 * QQ:308695699
 * @name  boomJS 1.0.0
 * @description 一个有趣的效果，用 JavaScript 实现让图片爆炸的动画（非Canvas）
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 1、本组件用于是学习 jQuery 队列时做的一个小 demo，使用 JavaScript 配合 CSS3 实现一个简单的动画效果
 *
 * 2、依赖 jQuery

 * 3、初始化方法，
 *  1）提供 var boom = new boom() 构造函数，构建 boom 实例
 *  2）直接 boom().boom() 进行调用，传入 img 的 jQuery 对象
 *  例如：boom().boom($('img'))
 *
 * 4、目前只支持未经过缩放的图片
 */
(function(window, undefined) {
	var
	// 是否插入了 jQuery
		isInsetJq = false,
		// css参数预设
		cssOption = {
			position: 'absolute',
			width: 0,
			height: 0,
			left: 0,
			top: 0
		},
		// 存储图片地址
		imgUrl = "",
		// 暴露的最终变量
		boom = function() {
			return new boom.prototype.init();
		},
		// 偏移距离
		arrRandomOffset = [1, -4, 8, -12, 16, -20, 24, -28, 32],
		// 图片集
		imgArr = [],
		// 传入的图片个数
		imgLength = 0;

	// 加载js
	function loadScript(url, callback) {
		if (isInsetJq) {
			return;
		}

		var ref = window.document.getElementsByTagName("script")[0],
			script = window.document.createElement("script");

		script.src = url;
		script.type = 'text/javascript';
		script.async = false;
		ref.parentNode.insertBefore(script, ref);

		if (callback && typeof(callback) === "function") {
			script.onload = callback;
		}

		isInsetJq = true;
	}

	// 计算坐标并添加新的层覆盖在原图上
	// 返回一个 jQuery 对象（dom 节点，是一个和图片高宽绝对定位坐标一致的 div）
	function calcPosition(elem) {
		imgUrl = elem.attr('src') || "";

		// 转化为 JS 对象
		var obj = elem[0];

		// getBoundingClientRect 方法返回元素的大小及其相对于视口的位置
		// 这是个 JS 对象方法，注意下文和 jQuery 对象的相互转换
		var posi = obj.getBoundingClientRect(),
			// 图片的宽高和定位
			elemCss = {
				width: obj.width,
				height: obj.height,
				top: posi.top,
				left: posi.left,
			},
			// 生成新的 div 的 css 样式
			realCss = $.extend(cssOption, elemCss);

		var newDiv = $(document.createElement('div'));

		newDiv.css(realCss);

		$('body').append(newDiv);

		return newDiv;
	}

	/**
	 * 在原图上生成小的 div 块
	 * @param elem 原图的 jQuery 对象
	 */
	function insertSmallDiv(elem) {
		var obj = elem,
			width = elem.width(),
			height = elem.height(),
			miniNum = 10,
			widthNum = 0,
			heightNum = 0,
			// div 小块的宽度
			newElemWidth = 0,
			i = 0,
			j = 0,
			elemArr = [];

		//console.log(width+','+height);

		if (width <= 10 && height <= 10) {
			return;
		}

		var basePoint = width > height ? height : width;

		//console.log('base point is :'+basePoint);

		if (basePoint == width) {
			newElemWidth = Math.floor(width / miniNum);
			heightNum = Math.floor(height / newElemWidth);
			widthNum = miniNum;
		} else {
			newElemWidth = Math.floor(height / miniNum);
			heightNum = Math.floor(width / newElemWidth);
			widthNum = miniNum;
		}

		//console.log('widthNum:'+widthNum+',height:'+heightNum+',width:'+newElemWidth);

		var newElemCss = {
			position: 'absolute',
			width: newElemWidth,
			height: newElemWidth,
			'border-radius': '100%',
			top: 0,
			left: 0
		}

		// 比较宽高大小，确定插入的行数
		if (height > width) {
			// 交换 width ，height 的值
			widthNum = widthNum * heightNum;
			heightNum = widthNum / heightNum;
			widthNum = widthNum / heightNum;
		}

		//console.log('widthNum:'+widthNum+',heightNum:'+heightNum+',newElemWidth:'+newElemWidth);

		for (; i < widthNum; i++) {
			for (; j < heightNum; j++) {
				var randomSize = Math.random() * 3,
					newElem = document.createElement('div'),
					cssTop = i * newElemWidth,
					cssLeft = j * newElemWidth,
					posiElemCss = {
						'background-image': 'url(' + imgUrl + ')',
						'background-repeat': 'no-repeat',
						'background-position': '-' + cssLeft + 'px ' + '-' + cssTop + 'px',
						position: 'absolute',
						width: newElemWidth,
						height: newElemWidth,
						'border-radius': '100%',
						top: 0,
						left: 0,
						top: cssTop,
						left: cssLeft,
						transform: 'scale(' + randomSize + ')'
					};
				// console.log('cssTop is:'+cssTop+',cssLeft is:'+cssLeft+',posiElemCss:'+posiElemCss);
				// console.log(newElemCss);
				// var curElemCss = $.extend(newELemCss,posiElemCss);
				$(newElem).css(posiElemCss);
				elemArr.push(newElem);
			}
			j = 0;
		}
		//console.log(elemArr);
		elem.append(elemArr);
	}

	/**
	 * 计算 boom 动画轨迹终止点
	 * @param  center 图片中心坐标
	 * @param  div    将要运动的图片坐标
	 * @return {x,y}  返回点 div 的动画轨迹终止点
	 */
	function ramdomPosition(center, div) {
		var
		// 直线斜率
			slope = 0,
			// 爆炸范围
			randomBoomDis = Math.random() * 5,
			// 距离
			distance = randomBoomDis * (center.x > center.y ? center.x : center.y),
			// 结果
			result = {
				x: 0,
				y: 0
			},
			// div 在中心点的上方还是下方
			isTop = center.y - div.y > 0 ? 1 : 0;

		if (center.x != div.x && center.y != div.y) {
			slope = (center.y - div.y) / (center.x - div.x);

			// y = kx + b
			var b = center.y - (slope * center.x);

			//console.log('斜率slope is:'+slope+',b is:'+b+',distance is:'+distance);

			// 轨迹终止的Y点
			// (2*div.y - center.y) : (distance + center.y)
			result.y = (isTop == true ? (2 * div.y - center.y) : (2 * div.y - center.y)) + ((Math.random() > 0.5 ? Math.random() * 4 : -Math.random() * 4)),
				// 轨迹终止的X点
				result.x = ((result.y - b) / slope) + ((Math.random() > 0.5 ? Math.random() * 4 : -Math.random() * 4));

			return result;
		} else if (center.x == div.x) {
			if (center.y > div.y) {
				return {
					x: center.x,
					y: center.y - distance
				}
			} else {
				return {
					x: center.x,
					y: center.y + distance
				}
			}
		} else if (center.y == div.y) {
			if (center.x > div.x) {
				return {
					x: center.x - distance,
					y: center.y
				}
			} else {
				return {
					x: center.x + distance,
					y: center.y
				}
			}
		} else {
			return;
		}
	}

	boom.prototype = {
		init: function() {
			return this;
		},
		boom: function(elems) {
			var elemLength = elems.length;

			if (!elemLength) {
				return;
			} else {
				elem = elems.eq(imgLength++).show();
			}

			if (imgLength == elemLength) {
				imgLength = 0;
			}

			var randomNum = Math.random() * 2,
				certerPonit = {
					x: Math.floor(elem.width() / 2) + randomNum,
					y: Math.floor(elem.height() / 2) - randomNum
				}

			var newWrap = calcPosition(elem);
			// insertSmallDiv(newWrap);
			// elem.hide();
			elem
				.delay(300, 'shake')
				.queue('shake', function(next) {
					// 300s 后隐藏原图
					$(this).animate({
						opacity: 0
					}, {
						duration: 1
					})
					next();
				})
				// 摇晃效果
				.dequeue('shake')
				.addClass('shake')
				.queue('shake', function() {
					insertSmallDiv(newWrap);

					var divs = newWrap.find('div'),
						length = divs.length,
						i = 0;

					for (; i < length; i++) {
						var div = divs.eq(i),
							divPoint = {
								x: parseInt(div.css('left')),
								y: parseInt(div.css('top'))
							}

						// 一些随机数添加
						var resultPoint = ramdomPosition(certerPonit, divPoint);
						//console.log(resultPoint);
						var randomOffset = arrRandomOffset[i % 9];

						divs.eq(i).animate({
							left: resultPoint.x + (Math.random() > 0.5 ? randomOffset : -randomOffset),
							top: resultPoint.y + (Math.random() > 0.5 ? randomOffset : -randomOffset),
							opacity: 0
						}, 800);
					}
				});
		}
	}

	boom.prototype.init.prototype = boom.prototype;

	window.boom = boom;

})(window)
