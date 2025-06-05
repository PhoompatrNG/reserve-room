import React from "react";
import "../css/show_timeline.css";

function ShowTimeline() {
    const rooms = ["Room 1", "Room 2", "Room 3", "Room 4"];
    const hours = Array.from(
        { length: 48 },
        (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`
    );

    const reservations: Record<string, Record<string, string>> = {
        "Room 1": { "8:00": "Reserved", "12:30": "Available", "18:00": "Reserved" },
        "Room 2": { "9:30": "Available", "15:00": "Reserved" },
        "Room 3": { "10:00": "Reserved", "20:30": "Available" },
        "Room 4": { "11:00": "Available", "22:30": "Reserved" },
    };

    const now = new Date();
    const currentHour = `${now.getHours()}:${now.getMinutes() < 30 ? "00" : "30"}`;

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
                    {rooms.map((room, roomIndex) => (
                        <React.Fragment key={roomIndex}>
                            <div className="room-name">{room}</div>
                            {hours.map((hour, hourIndex) => {
                                const isCurrent = hour === currentHour;
                                const reservationStatus = reservations[room]?.[hour] || "Available";
                                const isReserved = reservationStatus === "Reserved";

                                return (
                                    <div
                                        key={hourIndex}
                                        className={`grid-cell ${isCurrent ? "current" : isReserved ? "reserved" : "available"}`}
                                        title={reservationStatus}
                                        aria-label={`Room ${room}, ${hour}: ${reservationStatus}`}
                                    >
                                        {reservationStatus}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShowTimeline;
