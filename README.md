# mapTypeSelect
一个基于jquery的仿百度的地图底图切换工具
##
![imag](https://github.com/lengyuedaidai/mapTypeSelect/blob/master/img/mapTypeSelect1.png)
![imag](https://github.com/lengyuedaidai/mapTypeSelect/blob/master/img/mapTypeSelect2.png)
## 如何使用
### 引入css和js
```
<link href="css/mapTypeSelect.css" type="text/css" rel="stylesheet" />
<script src="js/mapTypeSelect.js"></script>
```
### 创建切换工具
```
<div id="test"></div>
```
```
$("#test").mapTypeSelect({
  data: [ //渲染数据
    {
      image: "img/DLG.png",
      name: "地图",
      mapType: "BMAP_NORMAL_MAP",
      isDefault: true
    }, 
    {
      image: "img/DOM.png",
      name: "影像",
      mapType: "BMAP_HYBRID_MAP",
      isDefault: false
    }]
});
```
##参数说明

|参数|类型|默认值|说明
|----|------|------|------|
|width|number|86|宽度|
|height|number|60|宽度|
|unexpandedOffset|number|10|偏移量|
|margin|number|10|边缘留白|
|orientation|string|"left"|方向，可以为：left\|right\|bottom\|top |
|onSelect|function|null|选中事件，返回为el和item|
|data|array|[]|渲染数据，对象包括image(图片)，name(名称),mapType(类型),isDefault(是否为默认选中)|
