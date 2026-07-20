export function ShopIcon({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            viewBox="2 2 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M4 10h16" />
            <path d="M5 10l1.5-4h11L19 10" />
            <path d="M6 10v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8" />
            <path d="M10 19v-4h4v4" />
            <path d="M4 10a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2" />
        </svg>
    );
}