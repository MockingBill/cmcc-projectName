var http=require('http');
var model = require('../models/migu_model');
var utils = require('gmdp').init_gmdp.core_app_utils;
// var getFile = require('../../../../migu_config');
// var schedule = require("node-schedule");
var fs = require('fs');

//获取配置文件数据
// var getFile = fs.readFileSync('../config.md',{encoding:'utf-8'},function(err,data){
//     if(err){
//         console.log('读取数据错误!');
//     }
// });

// var fileJson = getFile;
// var fileJson = JSON.parse(getFile);
var fileJson = {
    地址: "117.187.18.28",
    端口: "6002",
    方法: "POST",
    目录: "/mobileDevelopInt_nlj",
    校验码: "9C528035DFBD2D389E0A81D5F85A1810",
    接口ID: "wsSelfDevelopInterface.getSubAppQuality",
    密码: "odc|odc!234",
    版本: "v1.0"
};


//分别获取配置文件里的数据
var authKey = getJson('密码',fileJson),
    srvId = getJson('接口ID',fileJson),
    version = getJson('版本',fileJson),
    Authorization = getJson('校验码',fileJson),
    host = getJson('地址',fileJson),
    method = getJson('方法',fileJson),
    port = getJson('端口',fileJson),
    path = getJson('目录',fileJson);


//循环执行获取数据
var setTime = 300 * 1000;  //5分钟查询一次
setInterval(function () {
    getReqJson();
},setTime);
getReqJson();



//创建方法，连接API获取数据
function getReqJson(){

    //获取当前时间以及转换成需要的时间格式

    var responseString = '';

    var _time = new Date().getTime();
    var date=getMyDate(_time);
    var reqParams = '{' + 'key:' + date + '}';

        //传递主要参数
        var body = {
            srvId : srvId,
            authKey:authKey,
            version:version,
            reqParams:reqParams,
            // reqParams:'{"key":"201708272030"}'
        };

        //转换成查询需要的字符串
        var bodyString = JSON.stringify(body);

        //传参headers
        var headers = {
            // 'Authorization':'9C528035DFBD2D389E0A81D5F85A1810',
            Authorization:Authorization,
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        };

        //传参地址、端口等
        var options = {
            host:host,
            port:port,
            method:method,
            path:path,
            body:bodyString,
            headers: headers
        };


        //创建HTTP连接并传参
        var req=http.request(options,function(res){
            res.setEncoding('utf-8');

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function(res) {
                console.log("向API接口请求数据中...");
                //这里接收的参数是字符串形式,需要格式化成json格式使用
                responseString = JSON.parse(responseString);
                //遍历集合，得到result字段的值
                // console.log(responseString);
                responseString = getJson('result',responseString);
                // console.log(responseString);
                var responseJson = JSON.parse(responseString);

                //遍历集合，得到list字段的值
                responseJson  = getJson('list',responseJson);

                //遍历json数组，得到每个json文本值
                for(var xx=0;xx<responseJson.length;xx++){
                    var aaa = responseJson[xx];
                    // console.log(aaa);

                    //保存数据到test_migu表
                    model.miguSchema(aaa).save(function(error){

                        if(error){
                            console.log("保存失败");
                        }
                    });
                }
            });

            req.on('error', function(e) {
                console.log('-----error-------',e);
            });
        });

        req.write(bodyString);
        req.end();




}


//遍历json数组方法
function getJson(key,json){
    for(var item in json){
        if(item==key){  //item 表示Json串中的属性，如'name'
            return json[item];
        }
    }
}

//获取需要的时间格式
function getMyDate(str){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oTime = oYear + getfull(oMonth)+ getfull(oDay)+ getfull(oHour)+ getfull(oMin);//最后拼接时间
    return oTime;
}

//获取时间格式补0操作
function getfull(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}


