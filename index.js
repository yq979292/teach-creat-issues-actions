// github api 
// octokit 
// 客户端请github发送所有请求，可以实现对github所有操作：例如
// 获取用户信息，自动发布actions 发布 issure 等...
const {Octokit} =require('octokit')

// TODO autj
const octokit = new Octokit({
    auth: `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`
});
// console.log(octokit);

// octokit api create issure

let res  =octokit.rest.issues.create({
    owner: "sanzhi", // 作者
    repo: "", // githu库
    title: "自定义issure标题, first issure", // 标题
});

res.then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})