# 如何自动化执行github action 实现创建issue

> 我希望每天0：00 自动发布学习任务。不需要通过push 触发action

## 代码

`main.yml` 代码修改
~~~yml

on:
  schedule:  # auto run github action
    # set auto run time
    # UTC time 
    # zh-timm = UTC - 8 
    #         0:00 - 8  
    - corn: '1 16 * * *'  
 
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
          token: ${{ secrets.TOKEN }}
      # Use the output from the `hello` step
      # - name: Get the output time
      #   run: echo "The time was ${{ steps.hello.outputs.time }}"
~~~

修改`index.js`
~~~js
const {Octokit} =require('octokit');

const core = require('@actions/core')

// TODO auth
let token = core.getInput('token');
const octokit = new Octokit({
    auth: token,
});

let res = octokit.rest.issues.create({
    owner: "yq979292", 
    repo: "teach-creat-issues-actions",  
    title: setTitle, // 标题、
    body: setbody,
});

res.then(data=>{
    // console.log(data);
    console.log('success');
}).catch(err=>{
    console.log(err);
})

function setTitle(){
    let res = '每日学习任务'
    let date = new Date()
    return res+date
}
function setbody(){
    return `可以放一个体检写好的模板链接`
}
~~~

## 操作
1 编译
  `npm run build`
2 提交仓库 发布

