# drag-and-change-size
盒子拖拽与多个方向改变宽高
## 说明<br>
1.原则上兼容所有浏览器（除了IE6-8的border-radius）<br>
2.感觉代码质量稍微有点差，以后会继续改善<br>
3.功能：<br>
     ①八个方向改变宽高度（resize（）函数）<br>
     ②最大化、最小化<br>
     ③盒子拖拽<br>
     
## 笔记<br>
在coding时，整体功能已经基本做出来了。调试的时候谷歌与360都好好的，但一在IE上运行就出现各种bug，窗口一直凌空漂移。后来一直在找哪里出现了
问题，是哪个属性不兼容，甚至也重写过功能。<br>
但感觉都无济于事，后来逼于无奈，在调试台上调出width，height在各个函数的值，
发现在IE上尽管在CSS上写上了min-height与min-width，但在js中改变宽高时，总会出现小于最小值的现象。<br>
例如:<br>
css中：div {min-height : 200px;height:200px;}<br>
js执行：  div.style.height = 100 + "px";
         alert(getStyle(div, "height"));<br> 
然后 getStyle 一下 height <br>
结果是： 谷歌 // 200px;<br>
        360 // 200px;<br>
        IE  // 100px;<br>
而最让人觉得诡异的是，在IE中尽管getStyle 出来的是100px， 但实际显示的仍然是 200px 。后来又测试了一下max-height和max-width，发现问题同样存在。
又尝试把min-height放入了内联样式，发现也没卵用。IE果然是个诡异的浏览器。<br>
###得出的结论是： IE（包括IE11）中的js，对于height等的处理是无视min-height等属性的。所以若是规定了min-height的值，又在js中操作过height的值，
必须加层判断，看看是否有小于min-height，否则在IE中就会出现奇怪的现象的。
        
       
