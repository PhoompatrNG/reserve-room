import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/show_timeline.css";
import "../css/date_picker.css";

interface Reservation {
    startTime: string;
    endTime: string;
    title: string;
    date: string; // Added date property
}

const ShowTimeline: React.FC = () => {
    const rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"];
    const hours = Array.from({ length: 48 }, (_, i) => {
        const hour = (8 + Math.floor(i / 2)) % 24;
        return `${hour.toString().padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`;
    });

    // Sample reservation data with date property
    const reservations: Record<string, Array<Reservation>> = {
        "Room 1": [
            {
                startTime: "16:00",
                endTime: "17:00",
                title: "Team Meeting",
                date: "2025-06-05"
            },
            {
                startTime: "18:00",
                endTime: "22:00",
                title: "Project Discussion",
                date: "2025-06-05"
            }
        ],
        "Room 2": [],
        "Room 3": [
            {
                startTime: "10:00",
                endTime: "20:30",
                title: "Workshop",
                date: "2025-06-05"
            }
        ],
        "Room 4": [
            {
                startTime: "11:00",
                endTime: "22:30",
                title: "Training Session",
                date: "2025-06-05"
            }
        ],
        "Room 5": [
            {
                startTime: "08:00",
                endTime: "09:00",
                title: "Morning Meeting",
                date: "2025-06-05"
            },
            {
                startTime: "13:00",
                endTime: "17:00",
                title: "Afternoon Workshop",
                date: "2025-06-05"
            }
        ],
        "Room 6": [
            {
                startTime: "09:00",
                endTime: "11:00",
                title: "Strategy Session",
                date: "2025-06-05"
            },
            {
                startTime: "14:00",
                endTime: "18:00",
                title: "Team Building",
                date: "2025-06-05"
            }
        ]
    };

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(
        today.toISOString().split("T")[0]
    );

    const currentHour = `${today.getHours().toString().padStart(2, "0")}:${today.getMinutes() < 30 ? "00" : "30"}`;
    const isToday = selectedDate === today.toISOString().split("T")[0];

    return (
        <div className="container">
            <h2 className="title">ห้องประชุม</h2>

            <div className="date-picker">
                <label htmlFor="date-select">เลือกวันที่:</label>
                <DatePicker
                    selected={new Date(selectedDate)}
                    onChange={(date) =>
                        setSelectedDate(date?.toISOString().split("T")[0] || "")
                    }
                    dateFormat="yyyy-MM-dd"
                    popperPlacement="bottom-start"
                    popperModifiers={[
                        {
                            name: "preventOverflow",
                            options: {
                                boundary: "viewport"
                            },
                            fn: (state) => state // Add a simple function implementation for 'fn'
                        }
                    ]}
                />
            </div>
            <br />
            <div className="scroll-container">
                <div className="grid">
                    <div className="grid-header">Rooms / Time</div>
                    {hours.map((hour, idx) => {
                        const isCurrent = isToday && hour === currentHour;
                        return (
                            <div
                                key={idx}
                                className={`grid-cell ${isCurrent ? "current" : "available"}`}
                            >
                                {hour.endsWith(":00") && hour}
                            </div>
                        );
                    })}
                    {rooms.map((room, roomIndex) => {
                        // Filter reservations by selectedDate
                        const roomReservations = (reservations[room] || [])
                            .filter((res) => res.date === selectedDate)
                            .sort((a, b) => a.startTime.localeCompare(b.startTime));

                        return (
                            <React.Fragment key={roomIndex}>
                                <div className="room-name">{room}</div>
                                {hours.map((hour, hourIndex) => {
                                    const isCurrent = isToday && hour === currentHour;

                                    // Check if a reservation starts at this hour
                                    const reservationStarting = roomReservations.find(
                                        (res) => res.startTime === hour
                                    );

                                    if (reservationStarting) {
                                        // Calculate merge count
                                        let mergeCount = 0;
                                        for (let i = hourIndex; i < hours.length; i++) {
                                            if (
                                                hours[i] >= reservationStarting.startTime &&
                                                hours[i] < reservationStarting.endTime
                                            ) {
                                                mergeCount++;
                                            }
                                        }

                                        const reservationStatus = `${reservationStarting.startTime} - ${reservationStarting.endTime}: ${reservationStarting.title}`;

                                        return (
                                            <div
                                                key={`${roomIndex}-${hourIndex}`}
                                                className={`grid-cell ${isCurrent ? "current" : "reserved"}`}
                                                style={{
                                                    backgroundColor: "#FFCCCC",
                                                    gridColumnEnd: `span ${mergeCount}`
                                                }}
                                                title={reservationStatus}
                                                aria-label={`Room ${room}, ${hour}: ${reservationStatus}`}
                                            >
                                                {reservationStatus}
                                            </div>
                                        );
                                    }

                                    // Check if this hour is inside any reservation but not at the start
                                    const isInsideReservation = roomReservations.some(
                                        (res) => res.startTime < hour && hour < res.endTime
                                    );

                                    if (isInsideReservation) {
                                        return null;
                                    }

                                    // Default empty cell
                                    return (
                                        <div
                                            key={`${roomIndex}-${hourIndex}`}
                                            className={`grid-cell ${isCurrent ? "current" : ""}`}
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

export default ShowTimeline;
