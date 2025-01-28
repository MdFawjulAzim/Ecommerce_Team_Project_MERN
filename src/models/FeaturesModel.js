import mongoose from "mongoose";

const FeaturesSchema = new mongoose.Schema({
    featuresName:{
        type:String,
        required:true,
        unique:true,
        default:""
    },
    featuresDescription:{
        type:String,
        required:true,
        default:""
    },
    featuresImg:{
        type:String,
        required:true,
        default:""
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    }
},{
    timestamps:true,
    versionKey:false
});

const FeaturesModel = mongoose.model('features',FeaturesSchema);

export default FeaturesModel;