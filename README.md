# boomJS

一个有趣的动画效果，用 `JavaScript` 配合 `CSS3` 实现让图片爆炸的动画（非 `Canvas` 实现）。

[Demo演示戳我](http://sbco.cc/demo/boom/demo.html)

### Example

![Boom效果演示图](https://github.com/chokcoco/boomJS/blob/master/boomExample2.gif) 

![Boom效果演示图](https://github.com/chokcoco/boomJS/blob/master/boomExample.gif) 

## Usage

```HTML
<!-- style -->
<link rel="stylesheet" type="text/css" href="Boom.css" />
<!-- scripts -->
<script src="jquery.js"></script>
<!-- scripts -->
<script src="boom.js"></script>

<script>
// 调用方法：
//法一：传入图片的 jQuery 对象
boom($('img')) 

// 法二：构建 boom 实例，传入图片的 jQuery 对象
var bom = boom();
bom.boom($('img'));
</script>
```

## API
```javascript
boom($('img'),{
  // 缩放值
 'scaleLevel' : 3,
  // 模糊值
 'blurLevel': 9,
  // 弹射距离 
 'boomLevel': 4,
  // 爆炸时长
 'boomTime':800,
  // 是否打开日志
 'isOpenLog':true
});
```
温馨提示，不建议将 scaleLevel 的值设太高 :) 。

### IOS 下的效果
[UIViewXXYBoom](https://github.com/xxycode/UIViewXXYBoom)

之前在 IOS 上面看到了一个这样的效果，寻思着能否用 Javascript 实现一遍，捣鼓了一番做出了如上图所示效果，因为是非 canvas ，无法取到图片上的色值，使用了背景图定位代替，所以性能方面可能有所不足。

