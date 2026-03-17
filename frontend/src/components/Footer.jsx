import React from 'react'

const Footer = () => {
    const members = ["Peyush", "Pratik", "Mudit", "Rishabh"]

    return (
        <>
            <style>{footerStyles}</style>

            <footer className="footer-root">

                {/* Top accent gradient line */}
                <div className="footer-accent-line" />

                {/* Main body */}
                <div className="footer-inner">

                    {/* Brand col */}
                    <div className="footer-col footer-col-brand">
                        <div className="footer-logo-row">
                            <span className="footer-dot" />
                            <span className="footer-logo">BETTERLOOP</span>
                        </div>
                        <p className="footer-tagline">
                            Your daily recovery companion.<br />
                            One step at a time. 🌿
                        </p>
                    </div>

                    <div className="footer-vdivider" />

                    {/* Team col */}
                    <div className="footer-col footer-col-team">
                        <p className="footer-col-heading">Built by</p>
                        <p className="footer-team-name">BitByte</p>
                        <div className="footer-members">
                            {members.map((m) => (
                                <span key={m} className="footer-member-chip">{m}</span>
                            ))}
                        </div>
                    </div>

                    <div className="footer-vdivider" />

                    {/* Legal col */}
                    <div className="footer-col footer-col-copy">
                        <p className="footer-col-heading">Legal</p>
                        <p className="footer-copy-text">© 2026 BitByte</p>
                        <p className="footer-copy-sub">All rights reserved.</p>
                    </div>

                </div>

                {/* Bottom strip */}
                <div className="footer-strip">
                    Made with ♥ by BitByte &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; All rights reserved
                </div>

            </footer>
        </>
    )
}

const footerStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');

    .footer-root {
        position: relative;
        width: 100%;
        font-family: 'DM Sans', sans-serif;
        margin-top: 40px;
    }

    /* ── Thin amber gradient rule at the very top ── */
    .footer-accent-line {
        height: 2px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(194,149,90,0.28) 20%,
            rgba(232,184,138,0.65) 50%,
            rgba(194,149,90,0.28) 80%,
            transparent 100%
        );
    }

    /* ── Main footer body ── */
    .footer-inner {
        display: flex;
        flex-direction: column;
        gap: 28px;
        background: rgba(255,255,255,0.52);
        backdrop-filter: blur(28px);
        -webkit-backdrop-filter: blur(28px);
        border-top: 1px solid rgba(255,255,255,0.82);
        padding: 36px 24px 32px;
    }

    @media (min-width: 640px) {
        .footer-inner {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0;
            padding: 44px 56px 40px;
        }
    }

    /* ── Vertical dividers (desktop only) ── */
    .footer-vdivider {
        display: none;
    }
    @media (min-width: 640px) {
        .footer-vdivider {
            display: block;
            width: 1px;
            align-self: stretch;
            background: rgba(44,26,14,0.07);
            flex-shrink: 0;
        }
    }

    /* ── Columns ── */
    .footer-col {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    @media (min-width: 640px) {
        .footer-col-brand { flex: 2.2; padding-right: 32px; }
        .footer-col-team  { flex: 1.6; padding: 0 32px; }
        .footer-col-copy  { flex: 1;   padding-left: 32px; }
    }

    /* ── Brand ── */
    .footer-logo-row {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-bottom: 6px;
    }
    .footer-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e8b88a, #c2955a);
        box-shadow: 0 0 8px rgba(232,184,138,0.60);
        flex-shrink: 0;
    }
    .footer-logo {
        font-size: 0.90rem;
        font-weight: 800;
        letter-spacing: 0.13em;
        color: #2c1a0e;
    }
    .footer-tagline {
        font-size: 0.83rem;
        font-weight: 500;
        color: rgba(44,26,14,0.48);
        line-height: 1.70;
        margin: 0;
    }

    /* ── Column label ── */
    .footer-col-heading {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.10em;
        text-transform: uppercase;
        color: rgba(44,26,14,0.35);
        margin: 0 0 6px;
    }

    /* ── Team ── */
    .footer-team-name {
        font-family: 'Playfair Display', serif;
        font-size: 1.20rem;
        font-weight: 700;
        color: #a8714a;
        margin: 0 0 10px;
        letter-spacing: -0.01em;
    }
    .footer-members {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }
    .footer-member-chip {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        background: rgba(255,255,255,0.68);
        border: 1px solid rgba(194,149,90,0.22);
        border-radius: 99px;
        font-size: 0.78rem;
        font-weight: 600;
        color: #6b4c35;
        letter-spacing: 0.02em;
        cursor: default;
        transition: background 0.2s, border-color 0.2s, color 0.2s;
    }
    .footer-member-chip:hover {
        background: rgba(255,255,255,0.94);
        border-color: rgba(194,149,90,0.50);
        color: #2c1a0e;
    }

    /* ── Legal ── */
    .footer-copy-text {
        font-size: 0.98rem;
        font-weight: 700;
        color: #2c1a0e;
        margin: 0;
    }
    .footer-copy-sub {
        font-size: 0.78rem;
        font-weight: 500;
        color: rgba(44,26,14,0.38);
        margin: 0;
    }

    /* ── Bottom strip ── */
    .footer-strip {
        background: rgba(255,255,255,0.38);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-top: 1px solid rgba(44,26,14,0.06);
        padding: 13px 24px;
        text-align: center;
        font-size: 0.74rem;
        font-weight: 500;
        color: rgba(44,26,14,0.36);
        letter-spacing: 0.04em;
    }
`

export default Footer