import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        unique:true,
        default:""
    },
    categoryImg:{
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

const CategoryModel = mongoose.model('Category',CategorySchema);

export default CategoryModel;