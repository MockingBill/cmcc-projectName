var express = require('express');
var router = express.Router();

// model
var service = require('../services/day_mon_service');
var utils = require('gmdp').init_gmdp.core_app_utils;
//var logger = require('../../../common/log/utils/log_util.js').getLogger('service_log');

/**
 * 配置获取天的配置路由，当前台传入路由为‘/getDay’时间，便自动进入下一层service
 */
router.route('/getDay').get(function (req,res) {
var area=req.query.area;
    service.getListByDay(area,function(result){

            utils.respJsonData(res, result);

    });

});

/**
 * 配置获取月的配置路由，当前台传入路由为‘/getMon’时间，便自动进入下一层service
 */
router.route('/getMon').get(function (req,res) {
    var area=req.query.area;
    service.getListByMon(area,function(result){
        utils.respJsonData(res, result);

    });

});


module.exports = router;