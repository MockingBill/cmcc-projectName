// model
var model = require('../models/nrt_model');
var utils = require('gmdp').init_gmdp.core_app_utils;

/**
 * datatables分页查询
 * @param start
 * @param size
 * @param name
 * @param cb
 */
exports.getStudentList = function(start, size, name, cb) {

    var query=model.$.find({});
    query.skip(parseInt(start));
    query.limit(parseInt(size));
    if(name){
        query.where('stu_name',new RegExp(name));
    }
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        }else{
            //计算数据总数
            model.$.find({'stu_name':new RegExp(name)},function(err,result){
                if(err){
                    cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
                }else {
                    cb(utils.returnMsg4Paging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
};

/**
 * easyui分页查询
 * @param page
 * @param size
 * @param name
 * @param cb
 */
exports.getStudentListForEui = function(page, size, starttime, endtime, city, type, cb) {

    var query;
    var str2 = "2017/04/15 10:08";
    var curr_time = new Date(str2);
    var pre_time = new Date(str2);
    var endtime = new Date( endtime + ' 7:59:59');
    endtime.setDate( endtime.getDate() + 1 );
    pre_time.setHours(-16,0,0,0);
    curr_time.setHours(7,59,59,999);
    if( city && city != ''){
        query = model.$DaySchema.find({'nrtday_starttime': { $gte: starttime , $lte: endtime },'nrtday_bizcity':new RegExp(city),'nrtday_cmperel':new RegExp(type)}) ;
        query.skip((parseInt(page) - 1) * size);
        query.limit(parseInt(size));
    }else{
        query = model.$DaySchema.find({'nrtday_starttime': { $gte: pre_time , $lte: curr_time },'nrtday_bizcity':'贵州','nrtday_cmperel':new RegExp('咪咕阅读')}) ;
        query.skip((parseInt(page) - 1) * size);
        query.limit(parseInt(size));
    }
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        }else{
            //计算数据总数
            if(( !city || city == '')){
                model.$DaySchema.find({'nrtday_starttime': { $gte: pre_time , $lte: curr_time },'nrtday_bizcity':'贵州','nrtday_cmperel':new RegExp('咪咕阅读')},function(err,result){
                    if(err){
                        cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                    }else {
                        for(var ii in result){
                            console.log(result[ii]);
                        }
                        cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));

                    }
                });
            }else{
                model.$DaySchema.find({'nrtday_starttime': { $gte: starttime , $lte: endtime },'nrtday_bizcity':new RegExp(city),'nrtday_cmperel':new RegExp(type)},function(err,result){
                    if(err){
                        cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                    }else {
                        cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                    }
                });
            }
        }
    });
};

exports.getStudentListForMonth = function(page, size, starttime, endtime, city, type, cb) {

    var query;

    var str2 = "2017/04/15 10:08";
    var curr_time = new Date(str2);
    var pre_time = new Date(str2);

    pre_time.setMonth(pre_time.getMonth()-3);
    pre_time.setDate(2);
    pre_time.setHours(-16,0,0,0);
    curr_time.setDate(1);
    curr_time.setHours(7,59,59,999);
    if( city && city != ''){
        query = model.$MonthSchema.find({'nrtmonth_starttime': { $gte: starttime , $lte: endtime },'nrtmonth_bizcity':new RegExp(city),'nrtmonth_cmperel':new RegExp(type)}) ;
        query.skip((parseInt(page) - 1) * size);
        query.limit(parseInt(size));
    }else{
        query = model.$MonthSchema.find({'nrtmonth_starttime': { $gte: pre_time , $lte: curr_time },'nrtmonth_bizcity':'贵州','nrtmonth_cmperel':new RegExp('咪咕阅读')}) ;
        query.skip((parseInt(page) - 1) * size);
        query.limit(parseInt(size));
    }
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        }else{
            //计算数据总数
            if(( !city || city == '')){
                model.$MonthSchema.find({'nrtmonth_starttime': { $gte: pre_time , $lte: curr_time },'nrtmonth_bizcity':'贵州','nrtmonth_cmperel':new RegExp('咪咕阅读')},function(err,result){
                    if(err){
                        cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                    }else {
                        cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                    }
                });
            }else{
                model.$MonthSchema.find({'nrtmonth_starttime': { $gte: starttime , $lte: endtime },'nrtmonth_bizcity':new RegExp(city),'nrtmonth_cmperel':new RegExp(type)},function(err,result){
                    if(err){
                        cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                    }else {
                        cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                    }
                });
            }
        }
    });
};

exports.getStudentListForOverall = function(time_day, city, cb) {

    var str2 = "2017/04/15 10:08";
    var curr_time = new Date(str2);
    var pre_time = new Date(str2);

    var starttime;
    var endtime;
    if(time_day&&time_day!='') {
        starttime = new Date( time_day + ' 8:00:00');
        endtime = new Date( time_day + ' 7:59:59');
        endtime.setDate( endtime.getDate() + 1 );
    }
    pre_time.setHours(-16,0,0,0);
    curr_time.setHours(7,59,59,999);

    var fields = {}; // 待返回的字段
    var options = {};
    if(( time_day && time_day != '')) {
        model.$DaySchema.find({ 'nrtday_bizcity': city , 'nrtday_starttime': {$gte: starttime, $lte: endtime}}, fields, options, function (err, result) {
            if (err) {
                cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
            } else {
                cb(utils.returnMsg(true, '0000', '根据姓名查询成功。', result, null));
            }
        });
    }else{
        model.$DaySchema.find({ 'nrtday_bizcity': '贵州', 'nrtday_starttime': {$gte: pre_time, $lte: curr_time}}, fields, options, function (err, result) {
            if (err) {
                cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
            } else {
                cb(utils.returnMsg(true, '0000', '根据姓名查询成功。', result, null));
            }
        });
    }
};

exports.getStudentListForPointMonth = function(time_day, city, cb) {

    var endtime = new Date( time_day );
    var starttime = new Date( time_day );

    endtime.setMonth( endtime.getMonth() + 1);
    endtime.setDate(1);
    endtime.setHours(7,59,59,999);

    var fields = {}; // 待返回的字段
    var options = {};
    if(( time_day && time_day != '')) {
        model.$MonthSchema.find({ 'nrtmonth_bizcity': city , 'nrtmonth_starttime': {$gte: starttime, $lte: endtime}}, fields, options, function (err, result) {
            if (err) {
                cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
            } else {
                cb(utils.returnMsg(true, '0000', '根据姓名查询成功。', result, null));
            }
        });
    }
};

exports.saveStudent = function(studentEntity, cb) {
    // 实例模型，调用保存方法
    model.$(studentEntity).save(function(error){
        if(error) {
            //{'success':false,'code':'1000','msg':'添加信息时出现异常。','reason':error}
            cb(utils.returnMsg(false, '1000', '添加信息时出现异常。', null, error));
        }
        else {
            //{'success':true,'code':'0000','msg':'添加信息成功。'}
            cb(utils.returnMsg(true, '0000', '添加信息成功。', null, null));
        }
    });
};

exports.getStudent = function(id, cb) {
    var criteria = {_id: id}; // 查询条件
    var fields = {}; // 待返回的字段
    var options = {};
    model.$.find(criteria, fields, options, function (error, result) {
        if(error) {
            cb(utils.returnMsg(false, '1000', '查询详情出现异常。', null, error));
        }
        else {
            cb(utils.returnMsg(true, '0000', '查询详情成功。', result, null));
        }
    });
};

exports.updateStudent = function(id, studentEntity, cb) {
    var conditions = {_id: id};
    var update = {$set: studentEntity};
    var options = {};
    model.$.update(conditions, update, options, function (error) {
        if(error) {
            //{'success':false,'code':'1000','msg':'修改信息时出现异常。','reason':error}
            cb(utils.returnMsg(false, '1000', '修改信息时出现异常。', null, error));
        }
        else {
            //{'success':true,'code':'0000','msg':'修改信息成功。'}
            cb(utils.returnMsg(true, '0000', '修改信息成功。', null, null));
        }
    });
};

exports.deleteStudent = function(id, cb) {
    var conditions = {_id: id};
    model.$.remove(conditions, function (error) {
        if (error) {
            cb(utils.returnMsg(false, '1000', '删除信息时出现异常。', null, error));
        }
        else {
            cb(utils.returnMsg(true, '0000', '删除信息成功。', null, null));
        }
    });
};

exports.getRtDay = function (day,sta,cb) {

    var find1 =model.$DaySchema.find({'nrtday_starttime':ISODate("2017-05-07T00:00:00.000+0000")}
        ,function(error,result){
        if(error){
            cb(utils.returnMsg(false, '1000', '查询失败', null, error));
        }else{
            cb(utils.returnMsg(true, '0000', '查询成功', null, null,result));

        }
    }

    );

    for(var i in find1){
        console.log(find1[i]);
    }


};