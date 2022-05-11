// // github api 
// // octokit 
// // 客户端请github发送所有请求，可以实现对github所有操作：例如
// // 获取用户信息，自动发布actions 发布 issure 等...
const {Octokit} =require('octokit');

const core = require('@actions/core')

// TODO auth
let token = core.getInput('token');
const octokit = new Octokit({
    auth: token,
    // access token  铭文传递github 会自动删除 
});

// octokit api create issure
let res = octokit.rest.issues.create({
    owner: "yq979292", // github的用户名,路径
    repo: "teach-creat-issues-actions", // github仓库名；路径 

    // ---->以上这两个没写对会 报错 404

    title: "测试创建action", // 标题、
    body:'测试不是通过action 是否存在 404 问题'
});

res.then(data=>{
    // console.log(data);
    console.log('success');
}).catch(err=>{
    console.log(err);
})