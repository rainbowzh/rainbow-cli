/*
 * @Description: 
 * @Version: 2.0
 * @Author: zhouhong07
 * @Date: 2020-03-04 10:37:48
 * @LastEditors: zhouhong07
 * @LastEditTime: 2020-03-04 10:40:53
 */
// 删除文件系统
const fs =require("fs");
const path=require("path");

function removeDir(dir) {
  let files = fs.readdirSync(dir)
  for(var i=0;i<files.length;i++){
    let newPath = path.join(dir,files[i]);
    let stat = fs.statSync(newPath)
    if(stat.isDirectory()){
      //如果是文件夹就递归下去
      removeDir(newPath);
    }else {
     //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
}

module.exports=removeDir;