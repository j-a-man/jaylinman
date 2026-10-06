import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// A Moon square with the changelog rail: two commits and the hollow initial one
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#232136',
                    borderRadius: 7,
                }}
            >
                <svg width="32" height="32" viewBox="0 0 32 32">
                    <line x1="16" y1="7" x2="16" y2="23" stroke="#44415a" strokeWidth="2" />
                    <circle cx="16" cy="8" r="3.2" fill="#9ccfd8" />
                    <circle cx="16" cy="16" r="3.2" fill="#9ccfd8" />
                    <circle cx="16" cy="24" r="3" fill="#232136" stroke="#9ccfd8" strokeWidth="1.6" />
                </svg>
            </div>
        ),
        size
    );
}
