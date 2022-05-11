// github api 
// octokit 
// 客户端请github发送所有请求，可以实现对github所有操作：例如
// 获取用户信息，自动发布actions 发布 issure 等...
const {Octokit} =require('octokit');

const core = require('@actions/core')

// console.log(core.getInput('token'));

// TODO auth
let token = core.getInput('token');
console.log('获取token',token)
const octokit = new Octokit({
    auth: token,
    // 如果 personal access token 没有创建；或者创建删除了 401 没权限
    // access token  铭文传递github 会被自动三处
});

// octokit api create issure

let res = octokit.rest.issues.create({
    owner: "yq979292", // github的用户名,路径
    repo: "teach-creat-issues-actions", // github仓库名；路径 
    // ---->以上这两个没写对会 报错 404
    title: "自定义issure标题, first issure", // 标题、
    body:'文章主体内容。哈哈哈sucessl'
});

res.then(data=>{
    // console.log(data);
    console.log('success');
}).catch(err=>{
    console.log(err);
})