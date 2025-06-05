import React, { useState } from 'react';

function AddRoom() {
    const [roomName, setRoomName] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Room Added:', { roomName, capacity });
        // Add logic to save room details
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Add Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Room Name</label>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Capacity</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Room
                </button>
            </form>
        </div>
    );
}

export default AddRoom;
