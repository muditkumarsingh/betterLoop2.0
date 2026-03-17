import React from 'react'
import NotificationItem from './NotificationItem'
import RiskSummary from './RiskSummary'
import API from '../../services/api'
import { FaBell } from 'react-icons/fa';

const UserInfo = ({ todayLog, setTodayLog, handleLogCreated,isModalOpen,setIsModalOpen }) => {

    const getUser = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const user = await API.get(`/profile/${userId}`)
            console.log(user)
        } catch (err) {
            console.log(err)
        }
    }

    getUser()

    const statusColor =
        todayLog?.status === "clean"   ? "#4ade80" :
        todayLog?.status === "relapse" ? "#f87171" :
        "rgba(245,230,211,0.55)";

    const planColor = todayLog?.completedPlan ? "#4ade80" : "#fb923c";

    const logRows = [
        { label: "Status",  value: todayLog?.status    || "Not Logged", color: statusColor },
        { label: "Trigger", value: todayLog?.trigger   || "None" },
        { label: "Type",    value: todayLog?.triggerType || "Other", capitalize: true },
        { label: "Urge",    value: todayLog?.urgeLevel ? `${todayLog.urgeLevel} / 5` : "N/A" },
        { label: "Mood",    value: todayLog?.mood       || "Not set", capitalize: true },
        { label: "Plan",    value: todayLog?.completedPlan ? "Done ✓" : "Pending", color: planColor },
        { label: "Time",    value: todayLog?.logTime    || "--:--" },
    ];

    return (
        <>
            <style>{userInfoStyles}</style>

            <div className='ui-root'>

                {/* ── Welcome / Log Card ── */}
                <div className="welcome-card">

                    {/* Top row: greeting + avatar */}
                    <div className="welcome-top">
                        <div>
                            <p className="welcome-eyebrow">Good morning 🌤</p>
                            <h1 className="welcome-name">Hi, George!</h1>
                            <p className="welcome-sub">What are we doing today?</p>
                        </div>

                        <div className="welcome-avatar">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                                alt="avatar"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="ui-divider" />

                    {/* Today's Log */}
                    <div className="log-section">
                        <p className="log-heading">Today's Log</p>

                        <div className="log-grid">
                            {logRows.map(row => (
                                <div className="log-row" key={row.label}>
                                    <span className="log-label">{row.label}</span>
                                    <span
                                        className={`log-value ${row.capitalize ? 'capitalize' : ''}`}
                                        style={row.color ? { color: row.color } : {}}
                                    >
                                        {row.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Notes full row */}
                        <div className="log-notes-row">
                            <span className="log-label">Notes</span>
                            <span className="log-notes-value">
                                {todayLog?.notes || "No notes added yet."}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Notifications Panel ── */}
                <div className="notif-panel">
                    <div className="notif-header">
                        <p className="notif-title">Notifications</p>
                        <div className="notif-bell">
                            <FaBell size={13} />
                        </div>
                    </div>

                    <NotificationItem
                        isTodayLogAdded={todayLog}
                        handleLogCreated={handleLogCreated}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />

                    <RiskSummary />
                </div>

            </div>
        </>
    )
}

const userInfoStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');

    .ui-root {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
        font-family: 'DM Sans', sans-serif;
    }
    @media (min-width: 768px) {
        .ui-root { flex-direction: row; align-items: flex-start; }
    }

    /* ── Welcome card ── */
    .welcome-card {
        flex: 3;
        background: rgba(255, 255, 255, 0.18);
        backdrop-filter: blur(28px);
        -webkit-backdrop-filter: blur(28px);
        border: 1px solid rgba(255, 255, 255, 0.38);
        border-radius: 22px;
        padding: 22px 22px 20px;
        box-shadow:
            0 8px 32px rgba(44, 26, 14, 0.14),
            inset 0 1px 0 rgba(255,255,255,0.55);
    }

    /* ── Top greeting row ── */
    .welcome-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
    }
    .welcome-eyebrow {
        font-size: 0.75rem;
        font-weight: 600;
        color: rgba(44, 26, 14, 0.55);
        letter-spacing: 0.04em;
        margin: 0 0 4px;
        text-transform: uppercase;
    }
    .welcome-name {
        font-family: 'Playfair Display', serif;
        font-size: 1.75rem;
        font-weight: 700;
        color: #2c1a0e;
        margin: 0 0 4px;
        line-height: 1.15;
        letter-spacing: -0.02em;
    }
    .welcome-sub {
        font-size: 0.88rem;
        font-weight: 500;
        color: rgba(44, 26, 14, 0.60);
        margin: 0;
    }
    .welcome-avatar {
        flex-shrink: 0;
        width: 72px;
        height: 72px;
        background: rgba(255,255,255,0.45);
        border: 1px solid rgba(255,255,255,0.65);
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 12px rgba(44,26,14,0.10);
    }
    .welcome-avatar img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }

    /* ── Divider ── */
    .ui-divider {
        border: none;
        border-top: 1px solid rgba(44, 26, 14, 0.09);
        margin: 16px 0;
    }

    /* ── Log section ── */
    .log-section {}
    .log-heading {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(44, 26, 14, 0.45);
        margin: 0 0 12px;
    }

    /* Grid of key-value pairs */
    .log-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
        margin-bottom: 10px;
    }
    @media (min-width: 480px) {
        .log-grid { grid-template-columns: 1fr 1fr 1fr; }
    }

    .log-row {
        display: flex;
        flex-direction: column;
        gap: 2px;
        background: rgba(255,255,255,0.30);
        border: 1px solid rgba(255,255,255,0.50);
        border-radius: 11px;
        padding: 8px 10px;
    }
    .log-label {
        font-size: 0.70rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgba(44, 26, 14, 0.45);
    }
    .log-value {
        font-size: 0.88rem;
        font-weight: 700;
        color: #2c1a0e;
        line-height: 1.3;
    }
    .log-value.capitalize { text-transform: capitalize; }

    /* Notes row — full width */
    .log-notes-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        background: rgba(255,255,255,0.28);
        border: 1px solid rgba(255,255,255,0.48);
        border-radius: 11px;
        padding: 9px 12px;
    }
    .log-notes-value {
        font-size: 0.83rem;
        font-weight: 500;
        color: rgba(44, 26, 14, 0.72);
        line-height: 1.55;
    }

    /* ── Notifications panel ── */
    .notif-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 0;
    }
    .notif-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .notif-title {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(44, 26, 14, 0.50);
        margin: 0;
    }
    .notif-bell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: rgba(255,255,255,0.45);
        border: 1px solid rgba(255,255,255,0.70);
        border-radius: 8px;
        color: #a8714a;
        box-shadow: 0 1px 4px rgba(44,26,14,0.08);
        cursor: pointer;
        transition: background 0.2s;
    }
    .notif-bell:hover {
        background: rgba(255,255,255,0.70);
    }
`

export default UserInfo