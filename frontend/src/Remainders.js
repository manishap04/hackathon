import React, { useState } from "react";
import "./RemainderForm.css";
import { base_url } from "./port";

export default function ReminderForm() {
    const [reminderMsg, setReminderMsg] = useState("");
    const [email, setEmail] = useState("");
    const [selectedDates, setSelectedDates] = useState([]); 
    const [selectedTimes, setSelectedTimes] = useState([]); 
    const [tempDate, setTempDate] = useState(""); // Temporary state for date input
    const [tempTime, setTempTime] = useState(""); // Temporary state for time input
    const [submitted, setSubmitted] = useState(false);

    const handleDateBlur = () => {
        if (tempDate && !selectedDates.includes(tempDate)) {
            setSelectedDates([...selectedDates, tempDate]);
        }
        setTempDate(""); // Reset input after adding
    };

    const handleTimeBlur = () => {
        if (tempTime && !selectedTimes.includes(tempTime)) {
            setSelectedTimes([...selectedTimes, tempTime]);
        }
        setTempTime(""); // Reset input after adding
    };

    const removeDate = (date) => {
        setSelectedDates(selectedDates.filter((d) => d !== date));
    };

    const removeTime = (time) => {
        setSelectedTimes(selectedTimes.filter((t) => t !== time));
    };

    const handleClick = async () => {
        if (reminderMsg && email && selectedDates.length > 0 && selectedTimes.length > 0) {
            try {
                const response = await fetch(`${base_url}/api/setReminder`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ reminderMsg, selectedDates, selectedTimes, email }),
                });

                if (response.ok) {
                    setSubmitted(true);
                    setReminderMsg("");
                    setEmail("");
                    setSelectedDates([]);
                    setSelectedTimes([]);
                } else {
                    alert("Failed to set reminder.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            alert("Please fill out all fields.");
        }
    };

    return (
        <div className="container reminder-form">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h2 className="form-title">Set a Reminder</h2>
                    <div className="form-group">
                        <label className="form-label">Reminder Message</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={reminderMsg} 
                            onChange={(e) => setReminderMsg(e.target.value)} 
                            placeholder="Enter your reminder message" 
                            required 
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">Select Dates</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={tempDate} 
                            onChange={(e) => setTempDate(e.target.value)} 
                            onBlur={handleDateBlur} // Store value only after blur
                        />
                        <div className="selected-items">
                            {selectedDates.map((date) => (
                                <span key={date} className="badge bg-secondary m-1">
                                    {date} <button type="button" onClick={() => removeDate(date)}>✖</button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">Select Times</label>
                        <input 
                            type="time" 
                            className="form-control" 
                            value={tempTime} 
                            onChange={(e) => setTempTime(e.target.value)} 
                            onBlur={handleTimeBlur} // Store value only after blur
                        />
                        <div className="selected-items">
                            {selectedTimes.map((time) => (
                                <span key={time} className="badge bg-info m-1">
                                    {time} <button type="button" onClick={() => removeTime(time)}>✖</button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">Your Gmail</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your Gmail" 
                            required 
                        />
                    </div>
                    <button type="button" className="btn btn-primary mt-4 reminder-btn" onClick={handleClick}>
                        Set Reminder
                    </button>
                    {submitted && (
                        <div className="alert alert-success mt-3 alert-pop" role="alert">
                            Reminder successfully set and email sent to {email}!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
