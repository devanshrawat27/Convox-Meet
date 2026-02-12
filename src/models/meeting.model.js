import {Schema } from 'mongoose';
import mongoose from 'mongoose';

const meetingSchema=new Schema({
        meetingId:{type:String , required:true},
        meetingCode:{type:String , required:true,unique:true},
        date:{type:Date , default:Date.now(),required:true}
})

const Meeting=mongoose.model('Meeting',meetingSchema);

export  {Meeting};