var Loading = {
    _loading: null,           // prefab
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/

Loading.show  = function() {
    // 弹窗已经存在
    if (Loading._loading != undefined) return;

     // 加载 prefab 资源
     cc.loader.loadRes('Loading',cc.Prefab,function(err, prefab){
        if(err) {
            cc.error(err);
            return;
        }

        // 创建实例
        var loading = cc.instantiate(prefab);
        // Loading 持有实例
        Loading._loading = loading;    
        
        // 设定父视图
        Loading._loading.parent = cc.find("Canvas");

        Loading._loading.position = cc.v2(0, 0);
    });
};

Loading.hidden  = function() {
    
    // 弹窗已经存在
    if (Loading._loading == undefined) return;

    Loading._loading.removeFromParent(true);

    Loading._loading.destroy();
};