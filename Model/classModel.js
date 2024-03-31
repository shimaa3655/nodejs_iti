const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = new mongoose.Schema({
    _id: Number,
    name: String,
    supervisor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "teachers"
    },
    children: [{
        type: Number, 
        ref: "childern"//ref:collection name in db 
    }],
});

schema.plugin(AutoIncrement,{
    id: 'class_model_id_counter',
    inc_field: "_id"
});
module.exports=mongoose.model("classes", schema);
