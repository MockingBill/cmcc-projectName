var http=require('http');
var model = require('../models/day_mon_model');
var utils = require('gmdp').init_gmdp.core_app_utils;
// var schedule = require('node-schedule');
// var getFile = require('../../../../migu_config1');



 var fileJson = {
    "地址": "117.187.18.28",
    "端口": "6002",
    "方法": "POST",
    "目录": "/mobileDevelopInt_fvu",
    "校验码": "9C528035DFBD2D389E0A81D5F85A1810",
    "接口ID": "mobileSelfDevelopRsService.getNRTSubAppQuality",
    "密码": "odc|odc!234",
    "版本": "v1.0"

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



setInterval(function () {

    getReqJsonForDay();
    if(new Date().getDate() == '15')
    getReqJsonForMon()
},86400*1000);


//创建方法，连接API接口获取数据
function getReqJsonForDay(){

    var str2 = "2017/09/14 10:08";
    //获取当前时间以及转换成需要的时间格式
    var _time = new Date(str2).getTime();
    var time11 =getMyDay(_time);
   //var reqParams = '{' + 'level:day ,timeId:' +time11 + '}';
    var reqParams='{level:"day",timeId:\"'+time11.toString()+'\"}';
/*{"srvId":"mobileSelfDevelopRsService.getNRTSubAppQuality","authKey":"odc|odc!234","version":"v1.0","reqParams":"{\"level\":\"day\",\"timeId\":\"20170913\"}"}

{"srvId":"mobileSelfDevelopRsService.getNRTSubAppQuality","authKey":"odc|odc!234","version":"v1.0","reqParams":"{\"level\":\"day\",\"timeId\":\"20170915\"}"}*/
    //传递主要参数
    var body = {
        srvId : srvId,
        authKey:authKey,
        version:version,
        reqParams: reqParams
       //  reqParams:'{"level":"day","timeId":"20170913"}'
    };

    //转换成查询需要的字符串
    var bodyString = JSON.stringify(body);

    console.log(bodyString);

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

    var responseString = '';
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
            responseString = getJson('result',responseString);
            console.log(responseJson);
            var responseJson = JSON.parse(responseString);
            console.log(responseJson);

            //遍历集合，得到list字段的值
            responseJson  = getJson('list',responseJson);

            //遍历json数组，得到每个json文本值
            for(var xx=0;xx<responseJson.length;xx++){
                var aaa = responseJson[xx];
                // console.log(aaa);

                //保存数据到test_migu表
                model.dayMonSchema(aaa).save(function(error){

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

//创建方法，连接API获取数据
function getReqJsonForMon(){

    var str2 = "2017/09/09 10:08";

    //获取当前时间以及转换成需要的时间格式
    var _time = new Date().getTime();
    var time11 =getMyMon(_time);
    var reqParams='{level:"month",timeId:\"'+time11.toString()+'\"}';

    //传递主要参数
    var body = {
        srvId : srvId,
        authKey:authKey,
        version:version,
        reqParams: reqParams
        // reqParams:'{"level":"day","timeId":"20170913"}'
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

    var responseString = '';
    var req=http.request(options,function(res){
        res.setEncoding('utf-8');

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function(res) {
            console.log("向API接口请求数据中...");
            responseString = JSON.parse(responseString);
            responseString = getJson('result',responseString);

                if(responseString!=undefined){
                    var responseJson = JSON.parse(responseString);
                    responseJson  = getJson('list',responseJson);
                    for(var xx=0;xx<responseJson.length;xx++){
                        var aaa = responseJson[xx];
                        model.dayMonSchema(aaa).save(function(error){

                            if(error){
                                console.log("保存失败");
                            }
                        });
                    }}


        });

        req.on('error', function(e) {
            console.log('-----error-------',e);
        });
    });
    req.write(bodyString);
    req.end();

}


/**
 * 从前台传入areaId后，获取当前的时间，对数据进行查询和运算，以便对数据进行封装
 * 时间为当前时间，运算后的值为当前时间之前的7天数据，最后得到平均值
 *  例如，当前时间为20170909，那么，得到的数据为3-9日数据
 * @param areaId
 * @param cb
 */
exports.getListByDay = function(areaId,cb) {

    var time=[];
    var myData = {rt_httpsuccrate:[],rt_httpavgresptime:[],rt_httpdlrate:[]};

    for(var i=6;i>=0;i--){
        var str2 = "2017/09/12 10:08";
        var myDay = new Date();

        var bb =myDay - i*86400000;
        var time11 =getMyDay(bb)  +'0000';
        time.push(time11);

    }
    model.dayMonSchema.find({rt_starttime:{$in:time},rt_bizcity:areaId},function (err,result) {
        if(err){
            cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
        }
        else{

            for(var i in result){

                myData.rt_httpsuccrate.push({name:result[i].rt_starttime, value:result[i].rt_httpsuccrate,color:getRandomColor()});
                myData.rt_httpavgresptime.push({name:result[i].rt_starttime, value:result[i].rt_httpavgresptime,color:getRandomColor()});
                myData.rt_httpdlrate.push({name:result[i].rt_starttime, value:result[i].rt_httpdlrate/1024,color:getRandomColor()});

            }

            var newmyData = {rt_httpsuccrate:getAvgForDay(myData.rt_httpsuccrate),
                                rt_httpavgresptime:getAvgForDay(myData.rt_httpavgresptime),
                                rt_httpdlrate:getAvgForDay(myData.rt_httpdlrate)};

            cb(utils.returnMsg(true, '1000', '查询数据成功。', newmyData, null));
        }

    });
};


/**
 * 从前台传入areaId后，获取当前的时间，对数据进行查询和运算，以便对数据进行封装
 * 时间为当前时间，运算后的值为当前时间之前的所有月份数据，最后得到平均值
 * 例如，当前时间为201709，那么，得到的数据为1-9月数据
 * @param areaId
 * @param cb
 */
exports.getListByMon = function(areaId,cb) {

    var time=[];
    var myData = {rt_httpsuccrate:[],rt_httpavgresptime:[],rt_httpdlrate:[]};

    var str2 = "2017/09/05 10:08";
    var myDay = new Date();
    var mon = myDay.getMonth();

    for(var i=1;i<=mon;i++){

        var time11 =myDay.getFullYear()+getfull(i)+'010000';
        time.push(time11);
    }

    model.dayMonSchema.find({rt_starttime:{$in:time},rt_bizcity:areaId},function (err,result) {
        if(err){
            cb(utils.returnMsg(false, '0000', '查询数据失败。', null, err));
        }
        else{

            for(var i in result){

                myData.rt_httpsuccrate.push({name:result[i].rt_starttime, value:result[i].rt_httpsuccrate,color:getRandomColor()});
                myData.rt_httpavgresptime.push({name:result[i].rt_starttime, value:result[i].rt_httpavgresptime,color:getRandomColor()});
                myData.rt_httpdlrate.push({name:result[i].rt_starttime, value:result[i].rt_httpdlrate/1024,color:getRandomColor()});

            }

            var newmyData = {rt_httpsuccrate:getAvgForMon(myData.rt_httpsuccrate),
                                rt_httpavgresptime:getAvgForMon(myData.rt_httpavgresptime),
                                rt_httpdlrate:getAvgForMon(myData.rt_httpdlrate)};

            cb(utils.returnMsg(true, '1000', '查询数据成功。', newmyData, null));

        }
    });
};



//遍历json数组方法，获取分别的值
function getJson(key,json){
    for(var item in json){
        if(item==key){  //item 表示Json串中的属性，如'name'
            return json[item];
        }
    }
}

//获取需要的时间，时间类型为201709090808
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

//获取需要的时间，时间类型为20170909
function getMyDay(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oTime = oYear + getfull(oMonth)+ getfull(oDay);//最后拼接时间
    return oTime;
}

//获取需要的时间，时间类型为201709
function getMyMon(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oTime = oYear + getfull(oMonth);//最后拼接时间
    return oTime;
}

//获取时间格式补0操作
function getfull(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

//运算类型为天的三个字段平均值，其主要运算value的平均的值，以便对数据进行封装
function getAvgForDay(Array) {

    var obj={};
    for(var i in Array){
        obj[Array[i].name]={num:0,len:0};
    }
    for(var i in Array){
        obj[Array[i].name].num=obj[Array[i].name].num+Number(Array[i].value);
        obj[Array[i].name].len++;
    }
    var mydata=[];
    for(var i in obj){
        mydata.push({name:Number(i)+'日',value:(obj[i].num/obj[i].len).toFixed(2),color:getRandomColor()});
    }

    mydata=mydata.sort(keysort("name",false));
    for(var i in mydata){
        mydata[i].name=mydata[i].name.substr(6,2);
    }
    return mydata;
}

//运算类型为月的三个字段平均值，其主要运算value的平均的值，以便对数据进行封装
function getAvgForMon(Array) {

    var obj={};
    for(var i in Array){
        obj[Array[i].name]={num:0,len:0};
    }
    for(var i in Array){
        obj[Array[i].name].num=obj[Array[i].name].num+Number(Array[i].value);
        obj[Array[i].name].len++;
    }
    var mydata=[];
    for(var i in obj){
        mydata.push({name:Number(i)+'日',value:(obj[i].num/obj[i].len).toFixed(2),color:getRandomColor()});
    }

    mydata=mydata.sort(keysort("name",false));
    for(var i in mydata){
        mydata[i].name=mydata[i].name.substr(4,2);
    }
    return mydata;
}

//获取随机颜色，以便对数据进行封装
function getRandomColor(){
    return (function(m,s,c){
        return (c ? arguments.callee(m,s,c-1) : '#') +
            s[m.floor(m.random() * 16)]
    })(Math,'0123456789abcdef',5)
}

//对对象里的数据进行排序
function keysort(key,sortType) {
    return function(a,b){
        return sortType ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}