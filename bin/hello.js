#!/usr/bin/env node
const program = require('commander')
console.log('enter') ;
program.usage('<project-name>')
        .parse(process.argv) // 加入这个能获取到项目名称
// 根据输入，获取项目名称
let projectName = program.rawArgs[2] // 获取项目名称
console.log(projectName)