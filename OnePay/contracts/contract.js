// JS contract
Duktape.modSearch = function (id) {
    var name;
    var src;
    var found = false;
    name = './vm/duktape/js_lib/' + id + '.js';
    src = load_js(name);
    if (typeof src === 'string') {
        print('loaded ECMAScript:', name);
        found = true;
    };
    if (!found) {
        throw new Error('module not found: ' + id);
    };
    return src;
}

var Bottos = require('index')
var Lib = Bottos.Lib
var Storage = Bottos.Storage
var console = Bottos.console

//创建一场一元购
function  createonepay() {
    var params = Lib.getParams()
    var table = "onepay"
    var key = params.onepayid
    var packStr = Lib.getPack(params)
    Storage.set(table,key,packStr)
    return 0
}

//查看一场一元购
function getonepay(){
    var params = Lib.getParams()
    var table = "onepay"
    var key = params.onepayId
    var contract = params.account
    var onepayinfo = Storage.get(contract,table,key)
    var unpacnObj = Lib.getUnpack(onepayinfo.binValue)
    print(JSON.stringify(unpacnObj))
    return 0
}

// 用户投注
function pay(){
    var params = Lib.getParams()
    var table = "onepay"
    var key = params.onepayId
    var packStr = Lib.getPack(params)
    Storage.set(table,key,packStr)
    //获取当前参加onepay金额，判断是否满足开奖条件
    var contract = params.account
    var onepayinfo = Storage.get(contract,table,key)
    var unpacnObj = Lib.getUnpack(onepayinfo.binValue)
    var count = unpacnObj.count
    var price = unpacnObj.price
    return 0
}

