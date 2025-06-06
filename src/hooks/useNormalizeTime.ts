import { useCallback } from "react"; // นำเข้า useCallback จาก React เพื่อช่วยในการสร้างฟังก์ชันที่ถูก Memoized

const useNormalizeTime = () => { // สร้าง Custom Hook ชื่อ useNormalizeTime
    const normalizeTime = useCallback((time: string) => { // สร้างฟังก์ชัน normalizeTime โดยใช้ useCallback เพื่อลดการสร้างฟังก์ชันใหม่ทุกครั้ง
        if (!time || typeof time !== "string") return "00:00"; // ตรวจสอบว่า time เป็น null หรือไม่ใช่ string หากใช่ คืนค่า "00:00"
        const parts = time.split(":"); // แยก time ด้วยเครื่องหมาย ":" เช่น "8:30" จะได้ ["8", "30"]
        if (parts.length < 2) return "00:00"; // ตรวจสอบว่ามีส่วนของเวลาไม่ครบ 2 ส่วน หากไม่ครบ คืนค่า "00:00"
        const hours = parts[0].padStart(2, "0"); // เติม "0" ด้านหน้าชั่วโมงให้มีความยาว 2 ตัวอักษร เช่น "8" จะกลายเป็น "08"
        const minutes = parts[1].padStart(2, "0"); // เติม "0" ด้านหน้านาทีให้มีความยาว 2 ตัวอักษร เช่น "5" จะกลายเป็น "05"
        return `${hours}:${minutes}`; // รวมชั่วโมงและนาทีในรูปแบบ "HH:mm" เช่น "08:30"
    }, []); // Memoize ฟังก์ชัน normalizeTime โดยไม่มี Dependency

    return normalizeTime; // ส่งออกฟังก์ชัน normalizeTime เพื่อใช้งานใน Component อื่น
};

export default useNormalizeTime; // ส่งออก Custom Hook useNormalizeTime