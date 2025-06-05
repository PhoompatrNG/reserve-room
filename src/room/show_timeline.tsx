import React, { useState } from "react";
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

                                // Check if the cell should be merged
                                const isStartOfReservation = reservation && hour === reservation.startTime;
                                const isEndOfReservation = reservation && hour === reservation.endTime;

                                // If it's the start of a reservation, render the cell
                                if (isStartOfReservation) {
                                    // Calculate how many cells to merge
                                    let mergeCount = 0;
                                    for (let i = 0; i < hours.length; i++) {
                                        if (hours[i] >= reservation.startTime && hours[i] < reservation.endTime) {
                                            mergeCount++;
                                        }
                                    }

                                    return (
                                        <div
                                            key={hourIndex}
                                            className={`grid-cell ${isCurrent ? "current" : "reserved"}`}
                                            style={{ backgroundColor: "#FFCCCC", gridColumnEnd: `span ${mergeCount}` }}
                                            title={reservationStatus}
                                            aria-label={`Room ${room}, ${hour}: ${reservationStatus}`}
                                        >
                                            {reservationStatus}
                                        </div>
                                    );
                                }

                                // If it's not the start of a reservation, return an empty cell
                                if (isReserved) {
                                    return null;
                                }

                                return (
                                    <div
                                        key={hourIndex}
                                        className={`grid-cell ${isCurrent ? "current" : ""}`}
                                    >
                                        {/* {hour} */}
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
