# github action 自动发布issure



每日自动创建 issure



- 自动执行
- 使用js通过脚本方式自动创建 issue


## 如何使用js创建issure


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
// console.log(octokit);

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
[创建accesstoken连接](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## 自动执行

> 需要配置 githus action 一起完成本功能

因为目前只是js脚本，我们需要按照action规范；编写

### 1.创建一个action
需要创建一个文件 `action.yml`

~~~yml
# action名字
name: 'create issue'
# action的描述
description: 'description of action is create issue'
# 外部给action输入的内容
inputs:
  who-to-greet:  # id of input
    description: 'Who to greet'
    required: true
    default: 'World'    
# action 给外部输出的信息
outputs:
  time: # id of output
    description: 'The time we greeted you'
# 运行文件
runs:
  using: 'node16' # 当前环境是什么
  main: 'index.js' # 运行文件路径
~~~

### 编译index.js

> 注意：运行环境问题：node16 需要 `vercel/ncc`库编译一下 `node_modules`,现在估计u需要了
- `npm i @vercel/ncc -D`


~~~
// package.json

{
    "scripts": {
    "build": "ncc build index.js --license licenses.txt"
  },
}

~~~
>action 中 运行就是`dist/index.js`


### Example using a public action

创建 `.github/workflows/main.yml`

~~~yml
on: [push]

jobs:
  create_issues_action:
    runs-on: ubuntu-latest
    name: create issues action
    steps:
      - name: Checkout
        id: hello
        uses: octocat/hello-world-javascript-action@v1.1
        with:
          who-to-greet: 'Mona the Octocat'
      # Use the output from the `hello` step
      - name: Get the output time
        run: echo "The time was ${{ steps.hello.outputs.time }}"
~~~

> 当发现 push 时候就会触发 acion




## 参考连接

[learn-github-action](https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows)
[creat-js-action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)

[创建access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

[octokit文档地址](https://www.npmjs.com/package/octokit)


## bug记录
- 404 注意 index.js中仓库路径
- 401 没有访问权限，注意github安全策略，凡是提交到长裤的accessToken 都会自动三处
   - 解决方式
     - 1：先生成 personal access token
     - 2: 再用 assess Token 生成一个加密的。
     - 3：通过代码方式获取 加密的access token 并使用












## 扩展git actions

- 基础概念：推荐阮一峰老师文章

