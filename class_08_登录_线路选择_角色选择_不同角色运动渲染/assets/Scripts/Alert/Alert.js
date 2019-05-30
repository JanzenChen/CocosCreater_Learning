var Alert = {
    _alert: null,           // prefab
    _detailLabel:   null,   // 内容
    _cancelButton:  null,   // 确定按钮
    _enterButton:   null,   // 取消按钮
    _enterCallBack: null,   // 回调事件
    _animSpeed:     0.3,    // 动画速度
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/

Alert.show = function (detailString, enterCallBack,needCancel,animSpeed) {
        // 引用
        var self = this;

        // 弹窗已经存在
        if (Alert._alert != undefined) return;

        // 加载 prefab 资源
        cc.loader.loadRes('Alert',cc.Prefab,function(err, prefab){
            if(err) {
                cc.error(err);
                return;
            }

            // 创建实例
            var alert = cc.instantiate(prefab);
            // Alert 持有实例
            Alert._alert = alert;

            // 获取子节点并持有
            Alert._detailLabel = cc.find("alertBackground/detailLabel", alert).getComponent(cc.Label);
            Alert._cancelButton = cc.find("alertBackground/cancelButton", alert);
            Alert._enterButton = cc.find("alertBackground/enterButton", alert);

             // 参数设定
             self.configAlert(detailString, enterCallBack, needCancel, animSpeed);

            // 动画设定
            var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
            var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
            self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 255), cc.scaleTo(Alert._animSpeed, 1.0)), cbFadeIn);
            self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 0), cc.scaleTo(Alert._animSpeed, 2.0)), cbFadeOut);

            // 绑定点击事件
            Alert._enterButton.on('click', self.onButtonClicked, self);
            Alert._cancelButton.on('click', self.onButtonClicked, self);  

            // 设定父视图
            Alert._alert.parent = cc.find("Canvas");

            // 展现 alert
            self.startFadeIn();

        });

    // 参数设定
    self.configAlert = function (detailString, enterCallBack, needCancel, animSpeed) {

        // 回调
        Alert._enterCallBack = enterCallBack;
        // 内容
        Alert._detailLabel.string = detailString;

        //动画速度
        Alert._animSpeed = animSpeed ? animSpeed : Alert._animSpeed;

        // 是否需要取消按钮
        if (needCancel || needCancel == undefined) { // 显示
            Alert._cancelButton.active = true;
        } else {  // 隐藏
            Alert._cancelButton.active = false;
            Alert._enterButton.x = 0;
        }
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(Alert._alert, true);//暂停制定对象的定时器
        Alert._alert.position = cc.v2(0, 0);
        Alert._alert.setScale(2);
        Alert._alert.opacity = 0;
        Alert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(Alert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonClicked = function(event){
        if(event.target.name == "enterButton"){
            if(self._enterCallBack){
                self._enterCallBack();
            }
        }
        self.startFadeOut();
    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        Alert._alert.destroy();
        Alert._enterCallBack = null;
        Alert._alert = null;
        Alert._detailLabel = null;
        Alert._cancelButton = null;
        Alert._enterButton = null;
        Alert._animSpeed = 0.3;
    };
};