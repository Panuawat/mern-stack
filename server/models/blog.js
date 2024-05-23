//ชื่อบทความ,เนื้อหา,ผู้เขียน,slug(url) i%postman -> i-postman
const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true // ใช้ required แทน require
    },
    content: {
        type: String, // ควรกำหนด type เป็น String แทนการใช้ {}
        required: true
    },
    author: {
        type: String,
        default: "Admin" // ให้แน่ใจว่า default ถูกตั้งค่าไว้
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true //ใส่ค่าห้ามซ้ำกัน หรือ ชื่อห้ามซ้ำกัน
    }
},{timestamps:true})

module.exports = mongoose.model("Blogs",blogSchema)
/*
*mongoose.model("Blogs", blogSchema):*
mongoose.model เป็นฟังก์ชันที่ใช้ในการสร้างโมเดลสำหรับคอลเลกชันใน MongoDB โดยอิงตาม schema ที่กำหนด
"Blogs" คือชื่อของคอลเลกชันใน MongoDB ถ้าชื่อคอลเลกชันที่ระบุเป็นพหูพจน์ (เช่น "Blogs"), Mongoose จะใช้ชื่อนี้โดยตรง แต่ถ้าเป็นชื่อเอกพจน์ (เช่น "Blog"), Mongoose จะทำให้เป็นพหูพจน์โดยอัตโนมัติ
blogSchema คือ schema ที่กำหนดโครงสร้างของเอกสารในคอลเลกชันนี้

*module.exports:*
เป็นการส่งออกโมเดลที่สร้างขึ้นเพื่อให้สามารถนำไปใช้ในไฟล์อื่นๆ ได้ใน Node.js
*/