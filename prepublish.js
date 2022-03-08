'use strict';
const fs = require('fs');
const path = require('path');
const packageInfo = require('./package.json');

function generateVersionFile() {
    if (fs.existsSync(path.join(__dirname, 'lib/cpy-ui.min.js')) && fs.existsSync(path.join(__dirname, 'lib/cpy-ui.min.css'))) {//检查文件是否生成
        let lib_version = require('./lib/cpy-ui.min.js').default.version;
        if (lib_version === packageInfo.version) {
            console.error('未修改版本号或未重新打包')
            process.exit(1)
        } else {
            try {
                packageInfo.version = lib_version
                fs.writeFileSync('./package.json',JSON.stringify(packageInfo))
            } catch (e) {
                console.log(e)
            }
        }
    } else {
        console.error('未生成库文件')
        process.exit(1)
    }
}

generateVersionFile();
