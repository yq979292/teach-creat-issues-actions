# 如何通过github action 创建 issues

## 参考链接


[learn-github-action](https://docs.github.com/cn/actions/learn-github-actions/events-that-trigger-workflows)

## 实现过程

思考问题如下：
- 1：如何触发github action 
- 2: 如何通过gitbub action 运行 index.js实现创建 issues;


1.创建文件 `.githun/workflows/main.yml`

~~~yml
on: [push]

jobs:
  create_issues_action:
    runs-on: ubuntu-latest
    name: create issues action
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: create issues action  
        uses: ./  # use an action in the roor diectory 
        with:  # 传参的
          token: ${{ secrets.TOKEN }} #secrets.repoSecretName
      # Use the output from the `hello` step
      # - name: Get the output time
      #   run: echo "The time was ${{ steps.hello.outputs.time }}"
~~~

**注意：秘钥不能公开，默认推送到github就会自动删除；所以使用secrets加密的**
- 1：生成personal access token
- 2: 生成secret, 在仓库 `setting--secrets---dependabot--new reposity secret`

2:创建 `action.yml`
~~~yml
name: 'Hello World'
description: 'Greet someone and record the time'
inputs:
  token:
    description: 'github token'
    required: true  
runs:
  using: 'node12'
  main: './dist/index.js'
~~~

> 用来触发action 运行 js脚本


3：打包编译  `index.js`
`npx ncc build index.js --license licenses.tx`

~~~js

// index.js 源代码
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
    console.log('success');
}).catch(err=>{
    console.log(err);
})

~~~

### 操作
1:编译 index

>`npx ncc build index.js --license licenses.tx`

2: git push 远程仓库  触发 github action

3: git action 执行成功会创建 issure
