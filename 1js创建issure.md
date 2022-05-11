## 如何使用js创建issure

### 参考链接
[创建accesstoken连接](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
[octokit文档地址](https://www.npmjs.com/package/octokit)


### 实现方式

~~~
npm i octokit -D
~~~

indexjs
~~~js
// github api 
// octokit 
// 客户端请github发送所有请求，可以实现对github所有操作：例如
// 获取用户信息，自动发布actions 发布 issure 等...
const {Octokit} =require('octokit')

// TODO autj
const octokit = new Octokit({
    // settings -->Developer Settings ---> pernal access token 创建 accessToken 
    auth: `ghp_fp1xxyRSHmplgVgEX0QUSD6`,
    // 如果 （personal access tokens) 没有创建；或者创建删除了 401 没权限
    // 注意：github token 不能用明文方式展示。、
});

// octokit api create issure

let res  =octokit.rest.issues.create({
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
~~~
