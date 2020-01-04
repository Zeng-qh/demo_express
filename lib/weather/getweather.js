const superagent = require("superagent")
const Save_help = require("./../utils/save_help")


function GetData(res, url) {
    superagent.get(url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return err;
            }
            Save_help.WriteFile("weatherDB.json", sres.body, "")//流式文件写入
            if (res != null) {
                res.send(sres.body);
            }
        });
}

var city = JSON.parse(Save_help.ReadFileSync("./public/static/city.json").toString());



function weatherDB(res, fileName) {
    var db = ""
    if (Save_help.existsSync(fileName)) {
        db = Save_help.ReadFileSync(fileName).toString()
    } else {
        Save_help.CreateFile(false, fileName, "{}")
    }
    res.send(db)
}


module.exports = {
    GetData, city, weatherDB
}