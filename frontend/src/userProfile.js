import React from "react";
import { Link } from 'react-router-dom';

export default function UserProfile() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-primary bg-gradient">
            <div className="card p-4 shadow-lg" style={{ width: '24rem', borderRadius: '1rem' }}>
                <div className="text-center mb-4">
                    <h2 className="text-dark fw-bold">Welcome to Your Dashboard</h2>
                    <p className="text-muted">Manage your tasks efficiently</p>
                </div>

                <Link to="/remainder" className="text-decoration-none">
                    <div className="btn btn-warning d-flex flex-column align-items-center py-3 px-2 shadow-sm hover-shadow rounded">
                        <img
                            src="https://i.etsystatic.com/22233963/r/il/e38750/2421870738/il_1588xN.2421870738_6jb6.jpg"
                            alt="Reminders"
                            className="mb-2 rounded-circle border border-2 border-light"
                            style={{ width: "100px", height: "100px", objectFit: 'cover' }}
                        />
                        <strong className="text-white">Reminders</strong>
                    </div>
                </Link>
            </div>
        </div>
    );
}
