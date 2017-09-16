/**
 * Created by ShiHukui on 2016/2/22.
 */
var express = require('express');
var router = express.Router();

// model
//var model = require('../models/student_model');
var service = require('../services/nrt_service');
var utils = require('gmdp').init_gmdp.core_app_utils;
//var logger = require('../../../common/log/utils/log_util.js').getLogger('service_log');

router.route('/')
// query查询列表
    .get(function(req,res){



        /*logger.info("业务日志：info");

         logger.trace("业务跟踪日志：trace");



         logger.info("业务日志：第一步",{sequence:req.locals.sequence});


         //业务操作
         logger.info("业务日志：第二步",{sequence:req.locals.sequence});*/

        var name = req.query.search.value;
        console.log('查询条件：'+name);
        var start = req.query.start;
        var length = req.query.length;
        //start=0&length=10
        //recordsTotal
        console.log('分页参数：start='+req.query.start+',length='+req.query.length);

        service.getStudentList(start, length, name, function(result){
            utils.respJsonData(res, result);
        });
    })
    // create添加
    .post(function(req,res){

        // 获取提交信息
        var stu_no = req.body.stu_no;
        var stu_name = req.body.stu_name;
        var stu_mobile = req.body.stu_mobile;
        var stu_sex = req.body.stu_sex;
        var stu_age = req.body.stu_age;
        var stu_status = req.body.stu_status;
        // 验证姓名和年龄是否为空
        if(!stu_no) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2001', '工号不能为空。', null, null);
        }
        else if(!stu_name) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2002', '姓名不能为空。', null, null);
        }
        else if(!stu_mobile) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2003', '手机不能为空。', null, null);
        }
        else if(!stu_sex) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2004', '性别不能为空。', null, null);
        }
        else if(!stu_age) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2005', '年龄不能为空。', null, null);
        }
        else if(!stu_status) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2006', '状态不能为空。', null, null);
        }
        else {

            var studentEntity = {
                stu_no:stu_no,
                stu_name:stu_name,
                stu_mobile:stu_mobile,
                stu_sex:stu_sex,
                stu_age:stu_age,
                stu_status:stu_status
            };

            service.saveStudent(studentEntity, function(result){
                utils.respJsonData(res, result);
            });
        }

    });


router.route('/eui')
// query查询列表
    .get(function(req,res){
        var starttime = req.query.starttime;
        var endtime = req.query.endtime;
        var city = req.query.city;
        var type = req.query.type;
        console.log('查询条件：'+starttime+'，'+endtime+'，'+city+'，'+type);
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForEui(page, length, starttime, endtime, city, type,function(result){
            utils.respJsonData(res, result);
        });
    });

router.route('/month')
// query查询列表
    .get(function(req,res){
        var starttime = req.query.starttime;
        var endtime = req.query.endtime;
        var city = req.query.city;
        var type = req.query.type;
        console.log('查询条件：'+starttime+'，'+endtime+'，'+city+'，'+type);
        var page = req.query.page;
        var length = req.query.rows;
        //start=0&length=10
        //recordsTotal

        if(page == 0){
            page = 1;
        }

        console.log('分页参数：page='+req.query.page+',length='+req.query.rows);

        service.getStudentListForMonth(page, length, starttime, endtime, city, type,function(result){
            utils.respJsonData(res, result);
        });
    });

router.route('/bp_overall')
// query查询列表
    .get(function(req,res){
        var time_day = req.query.time_day;
        var city = req.query.city;
        console.log('查询条件：'+city+'，'+time_day);

        service.getStudentListForOverall(time_day, city, function(result){
            utils.respJsonData(res, result);
        });
    });

router.route('/bp_month')
// query查询列表
    .get(function(req,res){
        var time_day = req.query.time_day;
        var city = req.query.city;
        console.log('查询条件：'+city+'，'+time_day);

        service.getStudentListForPointMonth(time_day, city, function(result){
            utils.respJsonData(res, result);
        });
    });

router.route('/:id')
// update修改
    .put(function(req,res) {
        var id = req.params.id;// where条件
        // 获取提交信息
        var stu_no = req.body.stu_no;
        var stu_name = req.body.stu_name;
        var stu_mobile = req.body.stu_mobile;
        var stu_sex = req.body.stu_sex;
        var stu_age = req.body.stu_age;
        var stu_status = req.body.stu_status;

        // 验证姓名和年龄是否为空
        if(!id) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2000', 'ID不能为空。', null, null);
        }
        if(!stu_no) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2001', '工号不能为空。', null, null);
        }
        else if(!stu_name) {
            //{'success':false,'code':'2000','msg':'姓名不能为空。'}
            utils.respMsg(res, false, '2002', '姓名不能为空。', null, null);
        }
        else if(!stu_mobile) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2003', '手机不能为空。', null, null);
        }
        else if(!stu_sex) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2004', '性别不能为空。', null, null);
        }
        else if(!stu_age) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2005', '年龄不能为空。', null, null);
        }
        else if(!stu_status) {
            //{'success':false,'code':'2001','msg':'年龄不能为空。'}
            utils.respMsg(res, false, '2006', '状态不能为空。', null, null);
        }
        else {

            var studentEntity = {
                stu_no:stu_no,
                stu_name:stu_name,
                stu_mobile:stu_mobile,
                stu_sex:stu_sex,
                stu_age:stu_age,
                stu_status:stu_status
            };

            service.updateStudent(id, studentEntity, function(result){
                utils.respJsonData(res, result);
            });
        }
    })
    // get获取详情
    .get(function(req,res){
        var id = req.params.id;
        if (!id) {
            //{'success': false, 'code': '2000', 'msg': 'id不能为空。'}
            utils.respMsg(res, false, '2000', 'id不能为空。', null, null);
        }
        else {
            service.getStudent(id, function(result){
                utils.respJsonData(res, result);
            });
        }
    })
    // delete删除
    .delete(function(req,res){
        var id = req.params.id;

        if (!id) {
            //{'success': false, 'code': '2000', 'msg': 'id不能为空。'}
            utils.respMsg(res, false, '2000', 'id不能为空。', null, null);
        }
        else {
            service.deleteStudent(id, function(result){
                utils.respJsonData(res, result);
            });
        }
    });

router.route('/nrt_day')
    .get(function (req,res) {
        var str1 = "2017/07/11 8:08";
        var day = new Date(str1).getTime();
        var sta='贵阳';
        service.getRtDay(day,sta,function (result) {
            utils.respJsonData(res,result);

            for(var i in res){
                console.log(res[i]);
            }


        });
    // ，function (result) {
    //         utils.respJsonData(res, result);
    //     });
    });




module.exports = router;