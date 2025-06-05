import { useState } from 'react';

const ReserveRoomModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button onClick={openModal} className="btn btn-primary">Reserve Room</button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Reserve a Room</h2>
                        <form>
                            <label>
                                Name:
                                <input type="text" name="name" required />
                            </label>
                            <label>
                                Date:
                                <input type="date" name="date" required />
                            </label>
                            <label>
                                Time:
                                <input type="time" name="time" required />
                            </label>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReserveRoomModal;