如有侵权，请联系，立即删除。学习分享、并无牟利，请下载后24小时内删除，使用软件或代码即代表遵守相关法律法规。

这个工具是去年抢13的时候写的，首发捡漏，效果不错。

网络接口就一个，从AppleStore网页端拿的，electron关闭跨域，就能请求得到这个型号和直营店的详细数据，接口返回的参数里有标识，可以判断某个直营店的某个型号的购买按钮是不是激活状态来判断是否可以购买，也就是有没有货，具体几台是检测不到的。其实适当改造下，这代码放到油猴里也是能用的。这工具其实只是我自用工具集的一部分，所以就精简了一下发出来了，没有做油猴插件，油猴也就是js了，给改造一下难度也不大。

默认3秒扫一次，如果接口被拦了，会停2分钟再自动继续，默认扫到了就停止了，如果想不停止，可以自己改造打包，打包命令运行 npm run build:win-64 即可，用的是Electron，打包需要NodeJS，出现的报错啥的自行解决，也算是一个门槛，防止被滥用。

本工具除了获取参数上没有详细说明，需要门槛，其他使用上并没有设置什么门槛，这里提一嘴，不要滥用，拿去卖的死QJ。

捡漏步骤：

以下描述不过多细讲，留点门槛，防止被滥用。

1、首先要明确你要去哪个直营店提货，需要知道直营店的城市名称和店铺编码，支持同一城市多个店铺代码同时扫描，店铺代码用英文逗号隔开，比如杭州有两家店，城市名称是杭州，万象城直营店店铺编码是R532，其他店铺的编码去AppleStore网页端F12找吧，很容易找到的，算是一个门槛，防止小白滥用。

2、你得明确你要购买的设备的型号，苹果的型号很细，每个颜色每个容量搭配都是不同型号，比如14 Pro 256G 黑色就是独立的一个型号。

3、有货会自动发送通知，通知方式自带提供Bark、钉钉群机器人，需要提前设置好通知参数，具体参数怎么获取，网上一搜一堆。安利一下，Bark挺好用的，还有浏览器插件。

4、建议先在App里提前设置好付款信息、提货人信息、勾选好同意协议，只差保留一个“下单”按钮的操作，等到一收到通知，立刻点击下单按钮，不然收到通知再去设置这些信息，等你设置好了货就没了。

![](images/1.jpg)

![](images/2.jpg)

![](images/bark.jpg)