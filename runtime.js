var lrs = require("./index.js");
// 引入 process 模块
const process = require('process');
const tx1 = {
  timestamp: "May-19-2023 08:17:35 AM +UTC",
  from: "0x1114c78d5de672996d812dc2e1a05b5f33eacdfb",
  to: "0x000000d40b595b94918a28b27d1e2c66f43a51d3",
  value: "+1"
};
const tx2 = {
   timestamp: "May-19-2023 08:17:35 AM +UTC",
  from: "0x1114c78d5de672996d812dc2e1a05b5f33eacdfb",
  to: "0x000000d40b595b94918a28b27d1e2c66f43a51d3",
  value: "-1"
};
var itemid="3505254123784826441"
var participants = []; 
// 使用一个循环来为每个参与者生成公私钥对，并将其添加到数组中 
for (var i = 0; i < 80; i++) 
{ var participant = lrs.gen();
 participants.push(participant); 
} 
var txString1 = JSON.stringify(tx1);
var txString2 = JSON.stringify(tx2);
// 使用map方法来从数组中提取所有参与者的公钥，并生成公钥集合group

 var group = participants.map((m) => m.publicKey);

// 对+1分的交易签名
var t1= process.uptime()
var signed1 = lrs.sign(group, participants[0], txString1, itemid);
var t2= process.uptime()

// 验证+1分交易签名
var verifysignature1 = lrs.verify(group, signed1, txString1, itemid)
var t3= process.uptime()
console.log("First signature:"+verifysignature1);
  
// 对-1分交易的签名
var signed2 = lrs.sign(group, participants[0], txString2, itemid);
//var verifysignature2 = lrs.verify(group, signed2, txString2, itemid)
//console.log("Second signature:"+verifysignature2);

// 验证+1和-1分两笔交易的可链接性
var t4= process.uptime()
var verifylink=lrs.link(signed1, signed2)
var t5= process.uptime()
console.log("Linkability of two signatures:"+verifylink);

console.log('Signature generation runtime(seconds)')
console.log(t2-t1)
console.log('verification runtime(seconds)')
console.log(t3-t2)
console.log('Verify Linkage runtime(seconds)')
console.log(t5-t4)
