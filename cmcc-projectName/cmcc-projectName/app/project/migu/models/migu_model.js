/**
 * Created by Administrator on 2017/6/5.
 */
/**
 * Created by ShiHukui on 2016/2/22.
 */
//var mongoose = require('mongoose');
// 引入mongoose工具类
var mongoUtils  = require('gmdp').init_gmdp.core_mongoose_utils;
var mongoose = mongoUtils.init();
var Schema    = mongoose.Schema;

var miguSchema = new Schema(
    {
        rt_starttime: String,
        rt_bizcity: String,
        rt_bizname: String,
        rt_activeusernbr: String,
        rt_ultraffic: String,
        rt_dltraffic: String,
        rt_httpsuccrate: String,
        rt_httpdlrate: String,
        rt_httpavgresptime: String

    },
    {collection: "rt_"}//mongodb集合名
);


// model
exports.miguSchema = mongoose.model('miguSchema', miguSchema);
