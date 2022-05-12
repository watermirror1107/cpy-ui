const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

function isFileExist(filename) {
    return fs.existsSync(path.resolve(__dirname, `../test/components/${filename}.spec.js`))
}

function runCommand(name) {
    if (isFileExist(name)) {
        shell.exec(`mochapack --webpack-config webpack/test.config.js --require test/setup.js test/components/${name}.spec.js`)
    } else {
        console.log('\x1b[31m%s\x1b[0m', '未找到对应测试组件无法测试，请确认名称是否正确')
        process.exit(1)
    }
}

let component = undefined
if (process.env.NODE_OPTIONS) {
    component = process.env.NODE_OPTIONS.split('=')[1]//来之webstorm脚本配置的Nodeoptions
} else if (process.argv[2]) {
    component = process.argv[2]//命令行运行添加的参数
}
if (!component) {
    console.log('\x1b[31m%s\x1b[0m', '未添加要测试的组件 例如npm run test:unit CBanner')
    let questions = [
        {
            type: 'input',
            name: 'component',
            message: "请手动输入要测试的组件?"
        }
    ]
    inquirer.prompt(questions).then(answers => {
        let name = answers['component']
        if (name === '') {
            console.log('\x1b[31m%s\x1b[0m', '未输入组件名称无法测试')
            process.exit(1)
        }
        runCommand(name)
    })
} else {
    runCommand(component)
}
