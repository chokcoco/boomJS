# boomJS
一个有趣的效果，用 `JavaScript` 配合 `CSS3` 实现让图片爆炸的动画（非`Canvas`实现）

[Demo演示](http://sbco.cc/demo/boom/demo.html)

### 效果图

![Boom效果演示图](https://github.com/chokcoco/boomJS/blob/master/boomExample2.gif) 

![Boom效果演示图](https://github.com/chokcoco/boomJS/blob/master/boomExample.gif) 

### 使用方法
```javascript
// 引入css文件
// <link rel="stylesheet" type="text/css" href="./css/Boom.css" />

// 调用方法：
//法一：传入图片的 jQuery 对象
boom($('img')) 

// 法二：构建 boom 实例，传入图片的 jQuery 对象
var bom = boom();
bom.boom($('img'));
```

### 动画预设，支持传入不同参数调整效果
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

### 扩展延伸

近期钻研了 `CSS3 3D` 效果，产出如下，故打算尝试配合 `transform 3d` 制作个 3D 爆炸效果。

[CSS3 3D 行星运转动画](https://github.com/chokcoco/css3-)

### License
MIT
