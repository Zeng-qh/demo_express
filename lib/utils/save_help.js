const fs = require("fs") //查看文件流
/**
 *  创建文件写入
 * @param {*} isSync  创建方式 异步还是同步
 * @param {*} fileName  文件名称
 */
function CreateFile(isSync, fileName, text) {
    if (isSync) {
        var fd = fs.openSync(fileName, "a")
        fs.writeSync(fd, text)
        fs.closeSync(fd);
    } else {
        fs.open(fileName, "a", function (err, fd) {
            if (!err) {
                fs.write(fd, text, function (err) {
                    if (!err) {
                        // console.dir("写入成功")
                    }
                    fs.close(fd, function (err) {
                        if (!err) {
                            // console.dir("文件已关闭")
                        }
                    })
                })
            }
        })
    }
}



/**
 *  流式文件写入
 * @param {*} fileName 文件名称
 */
function WriteFile(fileName, text) {
    var ws = fs.createWriteStream(fileName)
    ws.once("open", function () {
        // console.dir("流打开");
        CreateFile(false, "log.txt", new Date() + "         " + text.cityInfo.city + "         " + "         Server         打开写入流 \n")
    })
    ws.once("close", function () {//这里监听所以是ws.end() 执行后执行 close
        // console.dir("流关闭");
        CreateFile(false, "log.txt", new Date() + "         " + text.cityInfo.city + "         " + "         Server         关闭写入流 \n")
    })
    ws.write(JSON.stringify(text))
    ws.end();//关闭流   用close 会导致只写一条
}


function ReadFileSync(fileName) {
    return fs.readFileSync(fileName, { encoding: "UTF-8", flag: "r" })
}

function existsSync(fileName) {
    return fs.existsSync(fileName)
}





module.exports = {
    WriteFile, ReadFileSync, CreateFile,existsSync
}


