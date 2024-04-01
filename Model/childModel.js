const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const addressSchema = new mongoose.Schema(
    {
        city: String,
        street: String,
        building: String,
    },
    {_id: false}
);
const schema = new mongoose.Schema({
    _id: Number,
    fullName: String,
    age: { type: Number, min: 2, max: 11 },
    level: { type: String, enum: ["PREKG", "KG1", "KG2"] },
    address:addressSchema,
});
// Apply the AutoIncrement plugin to the schema
schema.plugin(AutoIncrement, 
    { 
        id: 'child_model_id_counter',
        inc_field: '_id'  
    
    });
module.exports=mongoose.model("childern", schema);
