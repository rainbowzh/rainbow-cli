/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-03-04 10:25:32
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-03-12 15:07:52
 */
const download = require('download-git-repo')
const path = require("path")
const ora = require('ora')
const inquirer = require('inquirer') // 按需引入

module.exports = function (target) {
  target = path.join(target || '.', '.download-temp');
  return new Promise(function (res, rej) {
    // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
    // 格式是名字/地址 后面不加 .git 但是带着 #分支
    // let url = 'amazingliyuzhao/cli-template#test'
    let url = 'rainbowzh/template-react-cli#master' ;
    inquirer.prompt([
      {
        name: 'tsTemplate',
    	  message: 'is need ts?',
        default: "YES"
      }
    ]).then((answers) => { //判断加载哪个模板 
      let v = answers.tsTemplate.toUpperCase();
      answers.tsTemplate = v === "YES" || v === "Y";
      console.log('xxxxx',v,answers.tsTemplate) ;
      if(!v){
        url = 'rainbowzh/template-react-cli#master' ;
      }
      console.log('url',url) ;
      const spinner = ora(`正在下载项目模板...源地址：${url}`) ;
      spinner.start();

      download(url, target, { clone: false }, function (err) { // clone false 设置成false 具体设置看官网设置
        if (err) {
          spinner.fail() ;
          rej(err) ; 
        }
        else {
          // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
          spinner.succeed() ;
          res(target) ;
        }
      })
    })
  })
}
