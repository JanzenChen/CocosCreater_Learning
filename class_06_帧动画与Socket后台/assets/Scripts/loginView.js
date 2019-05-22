// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const userNameInputName = 'userName';
const passwordInputName = 'password';

cc.Class({
    extends: cc.Component,

    properties: {
        userNameInput :{
            type : cc.EditBox,
            default : null,
        },
        passwordInput :{
            type : cc.EditBox,
            default : null,
        },
        submitBtn :{
            type : cc.Button,
            default : null,
        },
        registerBtn :{
            type : cc.Button,
            default : null,
        },
        userName:{
            type:String,
            default : null,
            visible:false,
        },
        password:{
            type:String,
            default : null,
            visible:false,
        },
    },

    // LIFE-CYCLE CALLBACKS:
    submit() {
        // cc.log(this.userName + ' - ' + this.password);
        cc.director.preloadScene('GameScene',(completeCount,totalCount,item)=>{

        },(error,asset)=>{
            if (error) {
                cc.log('场景加载失败!');
                return;
            }
            let canvasNode = asset.scene.getChildByName('Canvas');
            canvasNode.getComponent('GameApp').checkPassword(this.userName,this.password,(code)=>{
                cc.log('123123--->' + code);
                if (0 == code) {
                    cc.log('账号密码错误!');
                } else {
                    cc.director.loadScene('GameScene',null);
                }
            });
        });
    },
    register(){
        cc.log('register');
    },
    onLoad () {
        this.userNameInput.name = userNameInputName;
        this.passwordInput.name = passwordInputName;
    },
    start () {

    },

    onEditDidBegan(editbox, customEventData) {
        // 这里 editbox 是一个 cc.EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
        if (editbox.name == userNameInputName) {
            cc.log('userNameInput onEditDidBegan');
        } else {
            cc.log('passwordInput onEditDidBegan');
        }
    },
    // 假设这个回调是给 editingDidEnded 事件的
    onEditDidEnded(editbox, customEventData) {
        // 这里 editbox 是一个 cc.EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
        if (editbox.name == userNameInputName) {
            cc.log('userNameInput onEditDidEnded');
        } else {
            cc.log('passwordInput onEditDidEnded');
        }
    },
    // 假设这个回调是给 textChanged 事件的
    onTextChanged(text, editbox, customEventData) {
        // 这里的 text 表示 修改完后的 EditBox 的文本内容
        // 这里 editbox 是一个 cc.EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
        if (editbox.name == userNameInputName) {
            cc.log('userNameInput onTextChanged  ' + editbox.string);
            this.userName = editbox.string;
        } else {
            this.password = editbox.string;
            cc.log('passwordInput onTextChanged  ' + editbox.string);
        }
    },
    // 假设这个回调是给 editingReturn 事件的
    onEditingReturn(editbox,  customEventData) {
        // 这里 editbox 是一个 cc.EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
        if (editbox.name == userNameInputName) {
            cc.log('userNameInput onEditingReturn');
        } else {
            cc.log('passwordInput onEditingReturn');
        }
    },

    // update (dt) {},
});
