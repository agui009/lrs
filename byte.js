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
var txString1 = JSON.stringify(tx1);
var txString2 = JSON.stringify(tx2);
for (var i = 0; i < 1200; i++) 
{ var participant = lrs.gen();
 participants.push(participant); 
} 
// 使用map方法来从数组中提取所有参与者的公钥，并生成公钥集合group，这里的group就是ring
var group = participants.map((m) => m.publicKey);
// 对+1分的交易签名
var signed1 = lrs.sign(group, participants[0], txString1, itemid);
// 验证+1分的单一签名
var verifysignature1 = lrs.verify(group, signed1, txString1, itemid)

console.log("First signature:"+verifysignature1);
  
// 对-1分的交易签名
var signed2 = lrs.sign(group, participants[0], txString2, itemid);

// 验证+1和-1的两笔交易的可链接性
var verifylink=lrs.link(signed1, signed2)
console.log("Linkability of two signatures:"+verifylink);

var groupSize = Buffer.from (group.toString ()).byteLength;
var signedSize = Buffer.from (signed1.toString ()).byteLength;

function transform(Bytes){
  return (Bytes/1024).toFixed(2)+'KB'; 
}
console.log ('groupSize');
console.log (transform(groupSize));
console.log ('signedSize');
console.log (transform(signedSize));
