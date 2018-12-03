const BottosSDK = require('bottos-sdk-js/src')
const {BTPack,BTUnpack} = require('bottos-js-msgpack')
const config = require('../config/config')
const keystore = require('../config/keystore.json')
const SDK = new BottosSDK({
    baseUrl: config.node_config.base_url
});

const Abi = require('../contracts/abi.json')
const {Api,Wallet,Tool,Contract} = SDK
let privateKeyBuf = Wallet.recover(config.keystore_pwd,keystore)
let privateKey = Tool.buf2hex(privateKeyBuf)

describe("test call contract",()=>{
    it('createOnePay in contract',()=>{
        console.log("createOnePay in contract")
        let originFetchTemplate = {
            sender:keystore.account,
            contract:keystore.account,
            method:'createonepay',
            param:{
                onepayid:"test1",
                count:0
            },
            version:1,
            sig_alg:1
        }
        Contract.callContract(originFetchTemplate,privateKey)
            .then(response=>{
                console.log({response})
            })
            .catch(error=>{
                console.log({error})
            })
    })

    it('get getonepay info',()=>{
        console.log("get getonepay info")
        let abi = Abi["getonepay"]
        Api.request('/common/query',{
            contract:keystore.account,
            object:"onepay",
            key:"test1"
        },'POST')
            .then(response=>response.json())
            .then(response=>{
                console.log({response})
                if(response && response.result){
                    let value = response.result.value
                    let buf = Buffer.from((value).toString(),'hex')
                    let unpackRes = BTUnpack(buf,abi)
                    console.log({unpackRes})
                }
            })
            .catch(error=>{
                console.log({error})
            })
    })

    it("get getOnePay info from contract",()=>{
        let originFetchTemplate = {
            sender:keystore.account,
            contract:keystore.account,
            method:'getonepay',
            param:{
                onepayId:0,
                count:0,
                winAddrInfo:0,
                cashpotInfo:0,
                price:0,
                player:{                         //参与此场的玩家集合
                    playerId : 0,
                    playerAddr : keystore.account,
                    betTime : 1234567
                }
            },
            version:1,
            sig_alg:1
        }
        Contract.callContract(originFetchTemplate,privateKey)
            .then(response=>{
                console.log({response})
            })
            .catch(error=>{
                console.log({error})
            })
    })

    it('check transaction status',()=>{
        Tool.getTransactionInfo('99e1526f8184eb5a66e42890a0486ec810a2e65dea0eb1535ca26bcc5fa50e4a')
            .then(response=>{
                console.log({response})
            })
            .catch(error=>{
                console.log({error})
            })
    })
})
