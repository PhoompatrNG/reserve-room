# แอปพลิเคชันจองห้องพัก

![โลโก้ของโครงการ](https://via.placeholder.com/150?text=Reserve+Room)

โครงการนี้พัฒนาด้วย **React**, **Vite**, และ **TypeScript** รวมถึงการผสานการทำงานกับ **n8n** เพื่อการจัดการ Workflow และ **Google Sheets API** สำหรับการจัดการข้อมูล

## คุณสมบัติเด่น

- **React**: ไลบรารี JavaScript ที่ทรงพลังสำหรับสร้างอินเทอร์เฟซผู้ใช้
- **Vite**: เครื่องมือพัฒนาและสร้างแอปพลิเคชันที่รวดเร็ว
- **TypeScript**: ภาษาโปรแกรมที่เพิ่มการตรวจสอบชนิดข้อมูล (static typing) ให้กับ JavaScript ช่วยลดข้อผิดพลาดและเพิ่มความสามารถในการบำรุงรักษาโค้ด
- **n8n Integration**: ระบบ Workflow อัตโนมัติที่สามารถเชื่อมต่อกับบริการต่าง ๆ
- **Google Sheets API**: จัดการข้อมูล เช่น การดึงข้อมูล การอัปเดต และจัดการข้อมูลโดยตรงจาก Google Sheets

## ข้อกำหนดเบื้องต้น

ก่อนเริ่มต้นใช้งาน ให้ตรวจสอบว่ามีการติดตั้งโปรแกรมต่อไปนี้ในระบบของคุณ:

- **Node.js**: เวอร์ชัน 16 หรือสูงกว่า
- **npm** หรือ **yarn**: ตัวจัดการแพ็คเกจ
- **n8n**: ติดตั้งและพร้อมใช้งาน
- **Google Cloud Account**: เพื่อเปิดใช้งาน Sheets API

## การเริ่มต้นใช้งาน

### การดาวน์โหลดโครงการ

```bash
git clone https://github.com/PhoompatrNG/reserve-room.git
cd reserve-room
```

### การติดตั้ง Dependencies

```bash
npm install
```

หรือถ้าคุณใช้ **yarn**:

```bash
yarn install
```

### การตั้งค่าตัวแปร Environment

สร้างไฟล์ `.env` ในโฟลเดอร์หลักของโครงการและเพิ่มรายละเอียดดังนี้:

```env
VITE_REACT_APP_API_URL=

```

### การเริ่มต้นเซิร์ฟเวอร์สำหรับการพัฒนา

```bash
npm run dev
```

หรือถ้าคุณใช้ **yarn**:

```bash
yarn dev
```

### การสร้างแอปพลิเคชัน

```bash
npm run build
```

หรือถ้าคุณใช้ **yarn**:

```bash
yarn build
```

## การผสานการทำงานกับ n8n

**n8n** ใช้สำหรับสร้าง Workflow อัตโนมัติเช่น การแจ้งเตือน การจัดการการจอง หรือการซิงค์ข้อมูลกับ API ภายนอก

1. **ตั้งค่า n8n**: อ่านคู่มือการตั้งค่าจาก [เอกสาร n8n](https://docs.n8n.io/)
2. **สร้าง Workflow**: ใช้ UI ของ n8n เพื่อสร้าง Workflow ที่เชื่อมต่อกับ Google Sheets, ระบบอีเมล หรือบริการอื่น ๆ

## การใช้งาน Google Sheets API

โครงการนี้ใช้ Google Sheets API ในการจัดการข้อมูล เช่น การจองห้องพัก การตรวจสอบความพร้อมใช้งาน หรือข้อมูลผู้ใช้

1. **เปิดใช้งาน API**: ไปที่ [Google Cloud Console](https://console.cloud.google.com/) และเปิดใช้งาน Sheets API

## โครงสร้างโครงการ

```plaintext
reserve-room/
├── public/              # ไฟล์ Static (เช่น vite.svg)
├── src/                 # โค้ดต้นฉบับของโปรเจกต์
│   ├── assets/          # ไฟล์ Assets (เช่น react.svg)
│   ├── components/      # React Components ทั่วไป (เช่น Footer.tsx, Header.tsx)
│   ├── css/             # ไฟล์ CSS สำหรับสไตล์ (เช่น App.css, date_picker.css, header.css, index.css, show_timeline.css, Tailwind.css)
│   ├── hooks/           # Custom React Hooks (เช่น useFetchDatas.ts, useNormalizeTime.ts)
│   ├── room/            # Components และ Pages ที่เกี่ยวข้องกับการจองห้อง (เช่น add_room.tsx, home.tsx, reserve_room.tsx, show_timeline.tsx)
│   ├── App.tsx          # Component หลักของแอปพลิเคชัน
│   ├── main.tsx         # จุดเริ่มต้นหลักของแอปพลิเคชัน (Entry point)
│   └── vite-env.d.ts    # ไฟล์ Type definitions สำหรับ Vite environment
├── .env                 # ไฟล์สำหรับเก็บ Environment variables (ผู้ใช้ต้องสร้างเอง)
├── eslint.config.js     # ไฟล์ตั้งค่า ESLint
├── index.html           # ไฟล์ HTML หลัก
├── package.json         # Metadata ของโปรเจกต์และ Dependencies
├── README.md            # เอกสารของโปรเจกต์ (ไฟล์นี้)
├── tsconfig.app.json    # ไฟล์ตั้งค่า TypeScript สำหรับแอปพลิเคชัน
├── tsconfig.json        # ไฟล์ตั้งค่า TypeScript หลัก
├── tsconfig.node.json   # ไฟล์ตั้งค่า TypeScript สำหรับ Node.js environment (เช่น Vite config)
├── vite.config.ts       # ไฟล์ตั้งค่า Vite
└── z/                   # โฟลเดอร์อื่นๆ (เช่น ReverveRoom.json อาจเป็นข้อมูลตัวอย่างหรือไฟล์ชั่วคราว)
```
