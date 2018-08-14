/**
*类功能：地图底图切换选择器
**/
(function ($) {//创建匿名函数
    $.fn.mapTypeSelect = function (options) {//扩展jquery组件
        //默认参数
        var defaults = {
            width: 86,//宽度
            height: 60,//高度
            unexpandedOffset: 10,//偏移量
            margin: 10,//边缘留白
            orientation: "left",//方向
            onSelect: null,//选择回调,
			data:[]
        }
        var options = $.extend(defaults, options);//设置参数
        var _this = $(this);//定义this的jquery对象，用于闭包
		_this.addClass("mapType-wrapper");//添加样式
		var _mapTypeDiv = $("<div class='mapType'></div>");//定义创建div的jquery对象
		var createMapTypeCard = function(item){
			var selectedClass = item.isDefault ? " active" : "";//定义设置是否选中
			var _mapTypeCard = $("<div class='mapTypeCard" + selectedClass + "' style='background:url(" + item.image + ");'><span>" +item.name + "</span></div>")
			/**
			*方法说明：地图卡片点击选择
			**/
			_mapTypeCard.click(function () {//地图卡片点击选择
				$(this).parent().children().removeClass("active");//删除所有激活class状态
				$(this).addClass("active");//当前点击的增加激活class状态
				indexChanged($(this));//修改叠盖顺序
				if (typeof (options.onSelect) == 'function') {//如果onselect定义并是function
					options.onSelect.call(this, { el: $(this) ,item:item})//进行回调
				}
			})
			return _mapTypeCard;
		}
		//var defaultId = null;
		for (var i = 0; i < options.data.length; i++) {//for循环，定义计数器i
			_mapTypeDiv.append(createMapTypeCard(options.data[i]));//添加切换选项
		};
		_this.append(_mapTypeDiv);
        var _mapTypeCard = $(this).find(".mapTypeCard");//获取class为mapTypeCard的对象
        var _float = "right";//定义悬浮方向
        var _isHorizontal = true;//定义是否水平flag
        switch (options.orientation) {//弹出方向
            case "right"://如果向右弹出
                _float = "left";//设置左边悬浮
                _isHorizontal = true;//设置为水平
                break;//跳出switch
            case "left"://如果向左弹出
                __float = "right";//设置右边悬浮
                _isHorizontal = true;//设置为水平
                break;//跳出switch
            case "top"://如果向上弹出
                _float = "bottom";//设置下边悬浮
                _isHorizontal = false;//设置为非水平
                break;//跳出switch
            case "bottom"://如果向下弹出
                _float = "top";//设置上边悬浮
                _isHorizontal = false;//设置为非水平
                break;//跳出switch
        }
        /**
        *方法说明：切换选择，修改叠盖顺序
        **/
        var indexChanged = function (__this) {//切换选择，修改叠盖顺序
            __this.css("z-index", _mapTypeCard.length + 1)//设置叠盖顺序
            var __next = __this.next();//获取下个dom的jquery对象
            var index = _mapTypeCard.length + 1;//设置当前叠盖最大值
            for (; __next.length != 0; __next = __next.next()) {//for循环，如果下个dom存在，获取其对象，否则终止循环
                __next.css("z-index", --index)//设置叠盖顺序
            };
            var __prev = __this.prev();//获取上个dom的jquery对象
            var index = _mapTypeCard.length + 1;//设置当前叠盖最大值
            for (; __prev.length != 0; __prev = __prev.prev()) {//for循环，如果上个dom存在，获取其对象，否则终止循环
                __prev.css("z-index", --index)//设置叠盖顺序
            };

        }
        _mapTypeDiv.width(options.width + _mapTypeCard.length * options.unexpandedOffset);//设置宽度
        _mapTypeDiv.height(options.height);//设置高度
        for (var i = _mapTypeCard.length - 1; i >= 0; i--) {//for循环，定义计数器i
            var _this = $(_mapTypeCard[i]);//获取卡片对象
            _this.height(options.height);//设置高度
            _this.width(options.width);//设置宽度

            if (_this.hasClass("active")) {//如果处于激活状态
                indexChanged($(_this));//修改叠盖顺序
            }
            _this.css(_float, (_mapTypeCard.length - i - 1) * options.unexpandedOffset);//修改悬浮相距距离
            if (_isHorizontal) {//判断是否是水平
                _this.css("top", options.margin);//设置与上侧相距值
            } else {//非水平
                _this.css("left", options.margin);//设置与左侧相距值
            }
        };
        /**
        *方法说明：鼠标滑动到地图卡片
        **/
        _mapTypeDiv.mouseover(function () {//鼠标滑动到地图卡片
            if (_isHorizontal) {//是否是水平状态
                _mapTypeDiv.width(_mapTypeCard.length * (options.width + options.margin));//设置宽度
            } else {//非水平
                _mapTypeDiv.height(_mapTypeCard.length * (options.height + options.margin));//设置高度
            };
            for (var i = _mapTypeCard.length - 1; i >= 0; i--) {//for循环，定义i计数器
                if (_isHorizontal) {//如果是水平
                    $(_mapTypeCard[i]).css(_float, (_mapTypeCard.length - i - 1) * (options.margin + options.width));//设置相对悬浮值
                } else {//非水平
                    $(_mapTypeCard[i]).css(_float, (_mapTypeCard.length - i - 1) * (options.margin + options.height));//设置相对悬浮值
                }
            };
        })
        /**
        *方法说明：鼠标滑出地图卡片
        **/
        _mapTypeDiv.mouseout(function () {//鼠标滑出地图卡片
            if (_isHorizontal) {//如果是水平
                _mapTypeDiv.width(options.width + _mapTypeCard.length * options.unexpandedOffset);//设置宽度
            } else {//非水平
                _mapTypeDiv.height(options.height + _mapTypeCard.length * options.unexpandedOffset);//设置高度
            };

            for (var i = _mapTypeCard.length - 1; i >= 0; i--) {//for循环，定义i计数器
                $(_mapTypeCard[i]).css(_float, (_mapTypeCard.length - i - 1) * options.unexpandedOffset);//设置相对悬浮值
            };
        })
    };
})(jQuery);//传入jquery对象
