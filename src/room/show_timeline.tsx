import React from "react";
import "../css/show_timeline.css";

function ShowTimeline() {
    const rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"];
    const hours = Array.from(
        { length: 48 },
        (_, i) => {
            const hour = (8 + Math.floor(i / 2)) % 24;
            return `${hour.toString().padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`;
        }
    );

    const reservations: Record<string, Array<{ startTime: string; endTime: string; title: string }>> = {
        "Room 1": [
            { startTime: "16:00", endTime: "17:00", title: "Team Meeting" },
            { startTime: "18:00", endTime: "22:00", title: "Project Discussion" }
        ],
        "Room 2": [],
        "Room 3": [
            { startTime: "10:00", endTime: "20:30", title: "Workshop" },
        ],
        "Room 4": [
            { startTime: "11:00", endTime: "22:30", title: "Training Session" },
        ],
        "Room 5": [
            { startTime: "08:00", endTime: "09:00", title: "Morning Meeting" },
            { startTime: "13:00", endTime: "17:00", title: "Afternoon Workshop" }
        ],
        "Room 6": [
            { startTime: "09:00", endTime: "11:00", title: "Strategy Session" },
            { startTime: "14:00", endTime: "18:00", title: "Team Building" }
        ]
    };

    const now = new Date();
    const currentHour = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes() < 30 ? "00" : "30"}`;

    return (
        <div className="container">
            <h2 className="title">Room Reservation Calendar</h2>
            <div className="scroll-container">
                <div className="grid">
                    <div className="grid-header">Rooms / Time</div>
                    {hours.map((hour, idx) => {
                        const isCurrent = hour === currentHour;
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
                        const roomReservations = (reservations[room] || []).sort(
                            (a, b) => a.startTime.localeCompare(b.startTime)
                        );
                        return (
                            <React.Fragment key={roomIndex}>
                                <div className="room-name">{room}</div>
                                {hours.map((hour, hourIndex) => {
                                    const isCurrent = hour === currentHour;

                                    // Check if a reservation starts at this hour
                                    const reservationStarting = roomReservations.find(
                                        res => res.startTime === hour
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
                                        res => res.startTime < hour && hour < res.endTime
                                    );

                                    if (isInsideReservation) {
                                        // Skip this cell since it’s already merged
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
}

export default ShowTimeline;
