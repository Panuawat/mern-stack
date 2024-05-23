//เก็บ token / username => session storage
export const authenticate = (response,next) => {
    /*
        if (window !== 'undefined') เป็นการตรวจสอบว่ากำลังรันโค้ดในเบราว์เซอร์ 
        (ซึ่งมี window object) เพื่อให้แน่ใจว่าโค้ดนี้จะไม่รันในสภาพแวดล้อมอื่น เช่น server-side rendering.
    */
    if (window !== 'undefined') {
        //เก็บข้อมูลลง session storage 
        //JSON.stringify(response.data.token) เปลี่ยนข้อมูลจาก json เป็น string
        sessionStorage.setItem('token',JSON.stringify(response.data.token))
        sessionStorage.setItem('username',JSON.stringify(response.data.username))
    }
    /*
        ฟังก์ชัน next 
        ที่ส่งเข้ามาจะถูกเรียกเพื่อทำขั้นตอนถัดไปหลังจากที่ข้อมูลถูกเก็บลงใน session storage เรียบร้อยแล้ว.
    */
    next()
}

// ดึงข้อมูล token
export const getToken = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            //JSON.parse(sessionStorage.getItem('token')) เปลี่ยนข้อมูลจาก string เป็น json
            return JSON.parse(sessionStorage.getItem('token'))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('username')) {
            //JSON.parse(sessionStorage.getItem('token')) เปลี่ยนข้อมูลจาก string เป็น json
            return JSON.parse(sessionStorage.getItem('username'))
        }else{
            return false
        }
    }
}

export const logout = (next) => {
    if (window !== 'undefinded') {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
    }
    next()
}