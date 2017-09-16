// var model = require('../models/nrt_model');
// var utils = require('gmdp').init_gmdp.core_app_utils;
//
// test();
//
// function test(){
//     var curr_time = new Date('2017/07/01 8:08');
//     var pre_time = new Date('2017/08/01 8:08');
//     pre_time.setHours((pre_time.getHours() + 8),(pre_time.getMinutes() - 35),0,0);
//     curr_time.setHours((curr_time.getHours() + 8),curr_time.getMinutes() - 31,59,999);
//     model.$RtSchema.find({'rt_starttime': { $gte: pre_time , $lte: curr_time },'rt_bizcity':'贵州'},function (err,result) {
//         if(result){
//             for(var i in result){
//                 console.log(result.data[i]);
//             }
//         }else{
//             if(result){
//                 console.log('00000000000000000');
//             }
//         }
//     })
//
//
//
// }