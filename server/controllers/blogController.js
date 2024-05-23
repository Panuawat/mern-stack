// ติดต่อฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blog")
const { v4: uuidv4 } = require('uuid');
//บันทึกข้อมูล
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  // http://localhost:5500/i-React
  let slug = slugify(title);

  //validate / ตรวจสอบความถูกต้องของข้อมูล
  if (!slug) {
    slug = uuidv4()
  }
  switch (true) {
    case !title:
        return res.status(400).json({error:"โปรดป้อนชื่อบทความ"})
        break;
    case !content:
        return res.status(400).json({error:"โปรดป้อนเนื้อหา"})
        break;
  }
  //บันทึกข้อมูล
  Blogs.create({title,content,author,slug}, (err,blog) => {
    if (err) {
        res.status(400).json({error:"ชื่อบทความซ้ำกัน"})
    }
    res.json(blog) //ไม่มีข้อผิดพลาด
  })
//   res.json({
//     data: { title, content, author, slug },
//   });
};

//ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs = (req,res) => {
  Blogs.find({}).exec((err,blogs) => {
    res.json(blogs)
  })
}

//ดึงข้อมูลบทความที่สนใจอ้างอิงตาม slug
exports.singleBlog = ((req,res) => {
  const { slug } = req.params
  Blogs.findOne({slug}).exec((err,blog) => {
    res.json(blog)
  })
})

exports.remove = (req,res) => {
  const { slug } = req.params
  Blogs.findOneAndRemove({slug}).exec((err,blog) => {
    if (err) {
      console.log(err);
    }
    res.json({
      message:"ลบบทความเรียบร้อย"
    })
  })
}

exports.update = (req, res) => {
  // เริ่มต้นการประกาศฟังก์ชัน update โดยการใช้ exports เพื่อให้อื่นๆ สามารถเรียกใช้ฟังก์ชันนี้ได้

  const { slug } = req.params
  // ดึงค่า slug จากพารามิเตอร์ของ URL (เช่น /blog/:slug)
  // ค่าที่ดึงมาได้จะถูกเก็บในตัวแปร slug

  const { title, content, author } = req.body
  // ดึงค่า title, content, และ author จาก body ของ request (ข้อมูลที่ส่งมาจากฝั่ง client)
  // ค่าที่ดึงมาได้จะถูกเก็บในตัวแปร title, content, และ author

  Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true })
  // ใช้โมเดล Blogs เพื่อค้นหาเอกสาร (document) ที่มี slug ตรงกับค่าที่ได้จาก req.params
  // และอัพเดตค่า title, content, และ author ในเอกสารนั้น
  // { new: true } เป็นอ็อบเจ็กต์ option ที่ทำให้การอัพเดตส่งคืนเอกสารที่ถูกอัพเดตแล้วแทนที่จะส่งคืนเอกสารเก่า

    .exec((err, blog) => {
    // หลังจากทำการค้นหาและอัพเดตเสร็จ จะทำการเรียก callback function ซึ่งมีพารามิเตอร์สองตัวคือ err และ blog
    // err คือข้อผิดพลาด (ถ้ามี) และ blog คือเอกสารที่ถูกอัพเดตแล้ว

      if (err) {
        // ถ้ามีข้อผิดพลาดเกิดขึ้น
        console.log(err);
        // แสดงข้อผิดพลาดใน console

        res.status(500).json({ error: 'An error occurred' });
        // ส่ง response กลับไปยัง client พร้อมกับสถานะ 500 (Internal Server Error) และข้อความแสดงข้อผิดพลาด
        return;
      }

      res.json(blog);
      // ถ้าไม่มีข้อผิดพลาด ส่ง response กลับไปยัง client โดยมีเนื้อหาเป็นเอกสารที่ถูกอัพเดตแล้วในรูปแบบ JSON
    });
}
