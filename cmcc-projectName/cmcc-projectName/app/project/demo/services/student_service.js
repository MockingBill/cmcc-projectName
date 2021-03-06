// model
var model = require('../models/student_model');
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
exports.getStudentListForEui = function(page, size, name, cb) {

    var query=model.$.find({});
    query.skip((parseInt(page) - 1) * size);
    query.limit(parseInt(size));
    if(name && name != ''){
        query.where('stu_name',new RegExp(name));
    }
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            //{'success':false,'code':'1000','msg':'根据姓名查询出现异常。','reason':err}
            cb(utils.returnMsg(false, '1000', '根据姓名查询出现异常。', null, err));
        }else{
            //计算数据总数
            model.$.find({'stu_name':new RegExp(name)},function(err,result){
                if(err){
                    cb(utils.returnMsg(false, '1001', '根据姓名查询出现异常。', null, err));
                }else {
                    cb(utils.returnMsg4EasyuiPaging(true, '0000', '根据姓名查询成功。', rs, result.length));
                }
            });
        }
    });
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