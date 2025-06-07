// นำเข้า React และ useState จาก React
import React, { useState, useEffect } from "react";
// นำเข้า DatePicker จาก react-datepicker
import DatePicker from "react-datepicker";
// นำเข้า CSS สำหรับ DatePicker
import "react-datepicker/dist/react-datepicker.css";
// นำเข้า CSS สำหรับ ShowTimeline
import "../css/show_timeline.css";
import "../css/date_picker.css";
import useFetchData from "../hooks/useFetchDatas";
import useNormalizeTime from "../hooks/useNormalizeTime";

// กำหนดโครงสร้างข้อมูล Reservation
interface Reservation {
    startTime: string; // เวลาเริ่มต้น
    endTime: string; // เวลาสิ้นสุด
    title: string; // ชื่อการจอง
    date: string; // วันที่
}

// สร้าง Component ShowTimeline
const ShowTimeline = () => {
    const normalizeTime = useNormalizeTime();
    const { data: initialReservations, refetch: refetchReservations } = useFetchData('reserve');
    const { data: roomsData, refetch: refetchRoomsData } = useFetchData('room'); // Added refetch for roomsData as well for consistency, though not strictly necessary for the current issue

    const [reservations, setReservations] = useState<Record<string, Array<Reservation>>>({});

    useEffect(() => {
        const processReservations = (data: any) => {
            if (!data) return; // Add a guard clause for undefined data
            const updatedReservations = (data as Array<{
                Room: string;
                Date: string;
                "Start Time": string;
                "End Time": string;
                Title: string;
            }>).reduce(
                (acc: Record<string, Array<Reservation>>, item) => {
                    const {
                        Room,
                        Date: date,
                        ["Start Time"]: startTime,
                        ["End Time"]: endTime,
                        Title: title
                    } = item;

                    if (!acc[Room]) acc[Room] = [];

                    acc[Room].push({
                        startTime: normalizeTime(startTime),
                        endTime: normalizeTime(endTime),
                        title: title,
                        date: date
                    });

                    return acc;
                },
                {}
            );
            setReservations(updatedReservations);
        };

        if (initialReservations) {
            processReservations(initialReservations);
        }

        const interval = setInterval(() => {
            refetchReservations();
            console.log("Refetching reservations..."); // Log to indicate refetching

        }, 600000); // Fetch every 10 minutes

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [initialReservations, normalizeTime, refetchReservations]); // Removed refetchReservations from dependency array as it's stable now due to useCallback in useFetchData


    // แปลงข้อมูลจาก API
    const rooms = roomsData ? roomsData.map((item: any) => item.name) : []; // Added a check for roomsData before mapping

    // สร้างช่วงเวลาในแต่ละวัน
    const hours = Array.from({ length: 48 }, (_, i) => {
        const hour = (8 + Math.floor(i / 2)) % 24; // คำนวณชั่วโมง
        return `${hour.toString().padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`; // แสดงเวลาในรูปแบบ HH:mm
    });


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
                                {roomReservations.length === 0 ? (
                                    <div
                                        className="grid-cell available-all-day"
                                        style={{ gridColumnEnd: `span ${hours.length}` }}
                                        title={`Room ${room} is available all day`}
                                        aria-label={`Room ${room} is available all day`}
                                    >
                                        Available all day
                                    </div>
                                ) : (
                                    hours.map((hour, hourIndex) => {
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
                                                    <div className="scroll-text-container">
                                                        <div className="scroll-text">
                                                            {reservationStatus} {/* แสดงสถานะการจอง */}
                                                        </div>
                                                    </div>
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
                                    })
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShowTimeline; // ส่งออก Component
