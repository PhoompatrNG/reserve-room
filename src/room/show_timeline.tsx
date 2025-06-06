// นำเข้า React และ useState จาก React
import React, { useState } from "react";
// นำเข้า DatePicker จาก react-datepicker
import DatePicker from "react-datepicker";
// นำเข้า CSS สำหรับ DatePicker
import "react-datepicker/dist/react-datepicker.css";
// นำเข้า CSS สำหรับ ShowTimeline
import "../css/show_timeline.css";
import "../css/date_picker.css";
import useFetchData from "../hooks/useFetchDatas";

// กำหนดโครงสร้างข้อมูล Reservation
interface Reservation {
    startTime: string; // เวลาเริ่มต้น
    endTime: string; // เวลาสิ้นสุด
    title: string; // ชื่อการจอง
    date: string; // วันที่
}

// สร้าง Component ShowTimeline
const ShowTimeline = () => {
    const roomsData = useFetchData('room');
    // const reservationsData = useFetchData('room');
    // แปลงข้อมูลจาก API
    const rooms = roomsData.map((item: any) => item.name);
    console.log("Rooms fetched:", rooms); // แสดงรายชื่อห้องประชุมในคอนโซล

    // สร้างช่วงเวลาในแต่ละวัน
    const hours = Array.from({ length: 48 }, (_, i) => {
        const hour = (8 + Math.floor(i / 2)) % 24; // คำนวณชั่วโมง
        return `${hour.toString().padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`; // แสดงเวลาในรูปแบบ HH:mm
    });

    // ข้อมูลการจองตัวอย่าง
    const reservations: Record<string, Array<Reservation>> = {
        "Room1": [
            {
                startTime: "16:00", // เวลาเริ่มต้น
                endTime: "17:00", // เวลาสิ้นสุด
                title: "Team Meeting", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            },
            {
                startTime: "18:00", // เวลาเริ่มต้น
                endTime: "22:00", // เวลาสิ้นสุด
                title: "Project Discussion", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            }
        ],
        "Room2": [],
        "Room3": [
            {
                startTime: "10:00", // เวลาเริ่มต้น
                endTime: "20:30", // เวลาสิ้นสุด
                title: "Workshop", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            }
        ],
        "Room4": [
            {
                startTime: "11:00", // เวลาเริ่มต้น
                endTime: "22:30", // เวลาสิ้นสุด
                title: "Training Session", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            }
        ],
        "Room5": [
            {
                startTime: "08:00", // เวลาเริ่มต้น
                endTime: "09:00", // เวลาสิ้นสุด
                title: "Morning Meeting", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            },
            {
                startTime: "13:00", // เวลาเริ่มต้น
                endTime: "17:00", // เวลาสิ้นสุด
                title: "Afternoon Workshop", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            }
        ],
        "Room6": [
            {
                startTime: "09:00", // เวลาเริ่มต้น
                endTime: "11:00", // เวลาสิ้นสุด
                title: "Strategy Session", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            },
            {
                startTime: "14:00", // เวลาเริ่มต้น
                endTime: "18:00", // เวลาสิ้นสุด
                title: "Team Building", // ชื่อการจอง
                date: "2025-06-05" // วันที่
            }
        ]
    };

    // กำหนดวันที่ปัจจุบัน
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(
        today.toISOString().split("T")[0] // แปลงวันที่เป็นรูปแบบ ISO
    );

    // คำนวณเวลาปัจจุบัน
    const currentHour = `${today.getHours().toString().padStart(2, "0")}:${today.getMinutes() < 30 ? "00" : "30"}`;
    const isToday = selectedDate === today.toISOString().split("T")[0]; // ตรวจสอบว่าเป็นวันนี้หรือไม่

    return (
        <div className="container"> {/* ส่วนแสดงผลหลัก */}
            <h2 className="title">ห้องประชุม</h2> {/* หัวข้อ */}

            <div className="date-picker"> {/* ส่วนเลือกวันที่ */}
                <label htmlFor="date-select">เลือกวันที่:</label>
                <DatePicker
                    selected={new Date(selectedDate)} // วันที่ที่เลือก
                    onChange={(date) =>
                        setSelectedDate(date?.toISOString().split("T")[0] || "") // อัปเดตวันที่ที่เลือก
                    }
                    dateFormat="yyyy-MM-dd" // รูปแบบวันที่
                    popperPlacement="bottom-start" // ตำแหน่งของป๊อปอัพ
                    popperModifiers={[
                        {
                            name: "preventOverflow", // ป้องกันการล้นของป๊อปอัพ
                            options: {
                                boundary: "viewport" // กำหนดขอบเขตเป็น viewport
                            },
                            fn: (state) => state // ฟังก์ชันที่ใช้ใน popperModifiers
                        }
                    ]}
                />
            </div>
            <br />
            <div className="scroll-container"> {/* ส่วนเลื่อน */}
                <div className="grid"> {/* ตารางเวลา */}
                    <div className="grid-header">Rooms / Time</div> {/* หัวตาราง */}
                    {hours.map((hour, idx) => {
                        const isCurrent = isToday && hour === currentHour; // ตรวจสอบว่าเป็นเวลาปัจจุบันหรือไม่
                        return (
                            <div
                                key={idx}
                                className={`grid-cell ${isCurrent ? "current" : "available"}`} // กำหนดคลาสของเซลล์
                            >
                                {hour.endsWith(":00") && hour} {/* แสดงเวลา */}
                            </div>
                        );
                    })}
                    {rooms.map((room, roomIndex) => {
                        // กรองการจองตามวันที่ที่เลือก
                        const roomReservations = (reservations[room] || [])
                            .filter((res) => res.date === selectedDate)
                            .sort((a, b) => a.startTime.localeCompare(b.startTime)); // เรียงลำดับตามเวลาเริ่มต้น

                        return (
                            <React.Fragment key={roomIndex}> {/* แสดงห้องประชุม */}
                                <div className="room-name">{room}</div> {/* ชื่อห้อง */}
                                {hours.map((hour, hourIndex) => {
                                    const isCurrent = isToday && hour === currentHour; // ตรวจสอบว่าเป็นเวลาปัจจุบันหรือไม่

                                    // ตรวจสอบว่ามีการจองเริ่มต้นที่เวลานี้หรือไม่
                                    const reservationStarting = roomReservations.find(
                                        (res) => res.startTime === hour
                                    );

                                    if (reservationStarting) {
                                        // คำนวณจำนวนเซลล์ที่ต้องรวม
                                        let mergeCount = 0;
                                        for (let i = hourIndex; i < hours.length; i++) {
                                            if (
                                                hours[i] >= reservationStarting.startTime &&
                                                hours[i] < reservationStarting.endTime
                                            ) {
                                                mergeCount++;
                                            }
                                        }

                                        const reservationStatus = `${reservationStarting.startTime} - ${reservationStarting.endTime}: ${reservationStarting.title}`; // สถานะการจอง

                                        return (
                                            <div
                                                key={`${roomIndex}-${hourIndex}`}
                                                className={`grid-cell ${isCurrent ? "current" : "reserved"}`} // กำหนดคลาสของเซลล์
                                                style={{
                                                    backgroundColor: "#FFCCCC", // สีพื้นหลัง
                                                    gridColumnEnd: `span ${mergeCount}` // รวมเซลล์ตามจำนวน
                                                }}
                                                title={reservationStatus} // แสดงสถานะการจอง
                                                aria-label={`Room ${room}, ${hour}: ${reservationStatus}`} // คำอธิบายสำหรับผู้ใช้
                                            >
                                                {reservationStatus} {/* แสดงสถานะการจอง */}
                                            </div>
                                        );
                                    }

                                    // ตรวจสอบว่าเวลานี้อยู่ในช่วงการจองหรือไม่
                                    const isInsideReservation = roomReservations.some(
                                        (res) => res.startTime < hour && hour < res.endTime
                                    );

                                    if (isInsideReservation) {
                                        return null; // ไม่แสดงเซลล์
                                    }

                                    // เซลล์ว่างเปล่า
                                    return (
                                        <div
                                            key={`${roomIndex}-${hourIndex}`}
                                            className={`grid-cell ${isCurrent ? "current" : ""}`} // กำหนดคลาสของเซลล์
                                        ></div>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShowTimeline; // ส่งออก Component
