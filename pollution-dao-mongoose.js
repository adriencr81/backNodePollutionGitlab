import mongoose, { Mongoose } from "mongoose";
import dbMongoose from './db-mongoose.js'
import genericPromiseMongoose from "./generic-promise-mongoose.js";

var thisSchema;
var thisDb = dbMongoose.thisDb;
var ThisPersistentModel; 


function initMongooseWithSchemaAndModel () {

    
   
    mongoose.Connection = thisDb;
      thisSchema = new mongoose.Schema({
        _id: { type : Object , alias : "id" } ,
        city: { type : String , alias : "ville" } ,
        pm10: { type : Number, alias : "tutu"} ,
        forecast: {type : Object},
        aqi : {type :Object},
        o3 : { type :Object}
        
      });
     
     

      thisSchema.set('id',false); 
      thisSchema.set('toJSON', { virtuals: true , 
                                   versionKey:false,
                                   transform: function (doc, ret) {   delete ret._id;  }
                                 });                             
    
      ThisPersistentModel = mongoose.model("pollution", thisSchema, "pollution");
}

initMongooseWithSchemaAndModel();

function findAll() {
    return genericPromiseMongoose.findAllWithModel(ThisPersistentModel );
}

function findByCriteria(criteria) {
    return genericPromiseMongoose.findByCriteriaWithModel(criteria,ThisPersistentModel);
  }

function findByCity(city) {
    return ThisPersistentModel.find({ city: city })
    .sort({ date:-1 })
    .limit(1)
    .exec();
}

export default { ThisPersistentModel, findAll, findByCriteria, findByCity};