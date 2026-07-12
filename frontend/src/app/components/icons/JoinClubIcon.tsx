export function JoinClubIcon({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="9" cy="8" r="3" />
            <path d="M4 19a5 5 0 0 1 10 0" />
            <path d="M17 8v6" />
            <path d="M14 11h6" />
        </svg>
    );
}