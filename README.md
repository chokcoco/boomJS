# boomJS
一个有趣的效果，用 JavaScript 配合 CSS3 实现让图片爆炸的动画（非Canvas）
### 使用方法
```javascript
// 法一：传入图片的 jQuery 对象
boom($('img')) 

// 法二：构建 boom 实例，传入图片的 jQuery 对象
var bom = boom();
bom.boom($('img'));
```

### 效果图
![Boom效果演示图](https://github.com/chokcoco/boomJS/blob/master/boomExample.gif) 

![Boom效果演示图](https://github.com/chokcoco/boomJS/blob/master/boomExample2.gif) 

### IOS 下的效果
[UIViewXXYBoom](https://github.com/xxycode/UIViewXXYBoom)

之前在 IOS 上面看到了一个这样的效果，寻思着能否用 Javascript 实现一遍，捣鼓了一番做出了如上图所示效果，因为是非 canvas ，无法取到图片上的色值，使用了背景图定位代替，所以性能方面可能有所不足。

### License
MIT
