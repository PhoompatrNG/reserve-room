# แอปพลิเคชันจองห้องพัก

![โลโก้ของโครงการ](https://via.placeholder.com/150?text=Reserve+Room)

โครงการนี้พัฒนาด้วย **React** และ **Vite** รวมถึงการผสานการทำงานกับ **n8n** เพื่อการจัดการ Workflow และ **Google Sheets API** สำหรับการจัดการข้อมูล

## คุณสมบัติเด่น

- **React**: ไลบรารี JavaScript ที่ทรงพลังสำหรับสร้างอินเทอร์เฟซผู้ใช้
- **Vite**: เครื่องมือพัฒนาและสร้างแอปพลิเคชันที่รวดเร็ว
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
VITE_GOOGLE_API_KEY=<Google API Key ของคุณ>
VITE_GOOGLE_SHEET_ID=<Google Sheet ID ของคุณ>
N8N_WORKFLOW_URL=<URL ของ Workflow ใน n8n>
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
3. **เชื่อม Workflow**: ใช้ `N8N_WORKFLOW_URL` ในไฟล์ `.env` เพื่อเชื่อมต่อแอปพลิเคชันกับ Workflow ที่สร้าง

## การใช้งาน Google Sheets API

โครงการนี้ใช้ Google Sheets API ในการจัดการข้อมูล เช่น การจองห้องพัก การตรวจสอบความพร้อมใช้งาน หรือข้อมูลผู้ใช้

1. **เปิดใช้งาน API**: ไปที่ [Google Cloud Console](https://console.cloud.google.com/) และเปิดใช้งาน Sheets API
2. **สร้าง API Key**: สร้าง API Key และเพิ่มลงในไฟล์ `.env`
3. **กำหนด Sheet ID**: ได้รับ Sheet ID จาก URL ของ Google Sheet และเพิ่มลงในไฟล์ `.env`

## โครงสร้างโครงการ

```
reserve-room/
├── public/              # ไฟล์ Static
├── src/                 # โค้ดต้นฉบับ
│   ├── components/      # React Components
│   ├── pages/           # React Pages
│   ├── services/        # API Services (Google Sheets API, n8n)
│   ├── styles/          # ไฟล์ CSS
│   └── utils/           # ฟังก์ชัน Utility
├── .env                 # ตัวแปร Environment
├── package.json         # Metadata ของโครงการ
├── vite.config.ts       # การตั้งค่า Vite
└── README.md            # เอกสารโครงการ
```

## การมีส่วนร่วม

เรายินดีต้อนรับการมีส่วนร่วมในโครงการนี้ โปรดทำตามขั้นตอนดังนี้:

1. Fork รีโพซิทอรี
2. สร้าง Branch ใหม่สำหรับฟีเจอร์หรือการแก้ไขของคุณ
3. ส่ง Pull Request พร้อมรายละเอียดการเปลี่ยนแปลงของคุณ

## ใบอนุญาต

โครงการนี้ได้รับอนุญาตภายใต้ MIT License

## ติดต่อ

สำหรับคำถามหรือการสนับสนุน กรุณาติดต่อ [PhoompatrNG](https://github.com/PhoompatrNG)
