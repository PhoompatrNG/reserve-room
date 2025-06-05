import React from "react";
import "../css/show_timeline.css";

function ShowTimeline() {
    const rooms = ["Room 1", "Room 2", "Room 3", "Room 4"];
    const hours = Array.from(
        { length: 48 },
        (_, i) => {
            const hour = (8 + Math.floor(i / 2)) % 24;
            return `${hour}:${i % 2 === 0 ? "00" : "30"}`;
        }
    );

    const reservations: Record<string, Array<{ startTime: string; endTime: string; title: string }>> = {
        "Room 1": [
            { startTime: "8:00", endTime: "12:30", title: "Team Meeting" },
            { startTime: "18:00", endTime: "22:00", title: "Project Discussion" }
        ],
        "Room 2": [
            { startTime: "9:30", endTime: "15:00", title: "Client Presentation" },
        ],
        "Room 3": [
            { startTime: "10:00", endTime: "20:30", title: "Workshop" },
        ],
        "Room 4": [
            { startTime: "11:00", endTime: "22:30", title: "Training Session" },
        ]
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

                                const reservation = reservations[room]?.find(res => hour >= res.startTime && hour < res.endTime);

                                const reservationStatus = reservation ? `${reservation.startTime} - ${reservation.endTime}: ${reservation.title}` : "";

                                const isReserved = reservation && reservation.startTime && reservation.endTime;

                                return (
                                    <div
                                        key={hourIndex}
                                        className={`grid-cell ${isCurrent ? "current" : isReserved ? "reserved" : ""}`}
                                        style={!isCurrent ? (isReserved ? { backgroundColor: "#FFCCCC" } : {}) : {}}
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
