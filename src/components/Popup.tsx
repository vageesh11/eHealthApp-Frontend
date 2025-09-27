import React, { useEffect, useRef } from "react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { title: string; time: string; location: string }) => void;
    selectedTime: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = React.useState("");
    const [time, setTime] = React.useState("");
    const [location, setLocation] = React.useState("");

    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ title, time, location });
        setTitle("");
        setTime("");
        setLocation("");
        onClose();
    };

    const handleDiscard = () => {
        setTitle("");
        setTime("");
        setLocation("");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                ref={popupRef}
                className="bg-white rounded-xl shadow-lg w-11/12 max-w-xs p-4"
            >
                <h2 className="text-lg font-bold mb-3 text-gray-800">Add Event</h2>

                <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter title"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Timings
                    </label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-1.5 text-sm"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-1.5 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
                        placeholder="Enter location"
                    />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={handleDiscard}
                        className="px-3 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-3 py-1.5 rounded-lg bg-[rgb(0,109,111)] hover:bg-[rgb(89,214,216)] text-white text-sm"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
