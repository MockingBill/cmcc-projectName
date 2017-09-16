/**
 * Created by ShiHukui on 2016/2/22.
 */
//var mongoose = require('mongoose');
// 引入mongoose工具类
var mongoUtils  = require('gmdp').init_gmdp.core_mongoose_utils;
//console.log(mongoose);

var mongoose = mongoUtils.init();

var Schema    = mongoose.Schema;
var ObjectId  = Schema.Types.ObjectId;

var nrtDaySchema = new Schema(
    {
        //sno: {type: ObjectId, default: new mongoose.Types.ObjectId},// objectid类型key
        nrtday_starttime: Date,
        nrtday_bizcity_id: Number,
        nrtday_bizcity: String,
        nrtday_biztype_id: Number,
        nrtday_biztype: String,
        nrtday_bizname_id: Number,
        nrtday_bizname: String,
        nrtday_cmperel: String,
        nrtday_httpsuccnbr: Number,//HTTP访问成功次数
        nrtday_httpattnbr: Number,//HTTP访问请求总次数
        nrtday_httpsuccrate: Number,//HTTP访问成功率
        nrtday_httptotalresptime: Number,//HTTP响应总时延
        nrtday_httpavgresptime: Number,//HTTP响应平均时延
        nrtday_ultraffic: Number,//上行流量
        nrtday_dltraffic: Number,//下行流量
        nrtday_dltraffic500: Number,//下行流量（>500KB）
        nrtday_httpdlrate: Number,//HTTP下行速率
        nrtday_httpdlrate500: Number,//HTTP下行速率（>500KB）
        nrtday_activeusernbr: Number//活跃用户数
    },
    {collection: "nrt_day"}//mongodb集合名
);

var nrtMonthSchema = new Schema(
    {
        //sno: {type: ObjectId, default: new mongoose.Types.ObjectId},// objectid类型key
        nrtmonth_starttime: Date,
        nrtmonth_bizcity_id: Number,
        nrtmonth_bizcity: String,
        nrtmonth_biztype_id: Number,
        nrtmonth_biztype: String,
        nrtmonth_bizname_id: Number,
        nrtmonth_bizname: String,
        nrtmonth_cmperel: String,
        nrtmonth_httpsuccnbr: Number,//HTTP访问成功次数
        nrtmonth_httpattnbr: Number,//HTTP访问请求总次数
        nrtmonth_httpsuccrate: Number,//HTTP访问成功率
        nrtmonth_httptotalresptime: Number,//HTTP响应总时延
        nrtmonth_httpavgresptime: Number,//HTTP响应平均时延
        nrtmonth_ultraffic: Number,//上行流量
        nrtmonth_dltraffic: Number,//下行流量
        nrtmonth_dltraffic500: Number,//下行流量（>500KB）
        nrtmonth_httpdlrate: Number,//HTTP下行速率
        nrtmonth_httpdlrate500: Number,//HTTP下行速率（>500KB）
        nrtmonth_activeusernbr: Number//活跃用户数
    },
    {collection: "nrt_month"}//mongodb集合名
);

// model
exports.$DaySchema = mongoose.model('NrtDaySchema', nrtDaySchema);
exports.$MonthSchema = mongoose.model('NrtMonthSchema', nrtMonthSchema);
