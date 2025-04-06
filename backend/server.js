require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let reminders = []; // In-memory reminder storage

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Set reminder endpoint
app.post("/api/setReminder", (req, res) => {
    const { reminderMsg, selectedDates, selectedTimes, email } = req.body;

    if (!reminderMsg || !email || selectedDates.length === 0 || selectedTimes.length === 0) {
        return res.status(400).json({ error: "All fields are required" });
    }

    selectedDates.forEach((date) => {
        selectedTimes.forEach((time) => {
            reminders.push({ reminderMsg, date, time, email });
        });
    });

    console.log(`Reminders set for ${email} on ${selectedDates.join(", ")} at times: ${selectedTimes.join(", ")}`);
    res.status(200).json({ message: "Reminder scheduled successfully!" });
});

// Cron job to check every minute
cron.schedule("* * * * *", async () => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM

    reminders.forEach(async (reminder) => {
        if (reminder.date === currentDate && reminder.time === currentTime) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: reminder.email,
                    subject: "Reminder Notification",
                    text: `Reminder: ${reminder.reminderMsg}`,
                });
                console.log(`Email sent to ${reminder.email} for reminder: ${reminder.reminderMsg}`);
            } catch (error) {
                console.error("Failed to send email:", error);
            }
        }
    });
});

app.listen(process.env.PORT, () => console.log("✅ Server running on port 4000"));
