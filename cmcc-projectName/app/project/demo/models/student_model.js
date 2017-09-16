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

var studentSchema = new Schema(
    {
        //sno: {type: ObjectId, default: new mongoose.Types.ObjectId},// objectid类型key
        stu_name: String,
        stu_no: String,
        stu_mobile: String,
        stu_sex: {type:Number, default:1},
        stu_status:{type:Number, default:1},
        stu_age: Number
    },
    {collection: "student_list"}//mongodb集合名
);

//studentSchema.index({sid: 1, name: 1});

// 自定义实例方法
studentSchema.methods.findByName = function(callback){
    console.log('student\'s name like : ' + this.name);
    return this.model('Student').find({name: new RegExp(this.name, 'i')}, callback);
}

// 自定义静态方法
studentSchema.statics.findByName = function(doc, callback) {
    console.log('---console-findByName');
    return this.find({name: new RegExp(doc.name, 'i')}, callback);
}


// model
exports.$ = mongoose.model('Student', studentSchema);
