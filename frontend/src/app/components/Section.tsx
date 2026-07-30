export function Section({
  children,
  className,
  width_subdiv = 1280,
}: {
  children: React.ReactNode;
  className?: string;
  width_subdiv?: number;
}) {
  // Prefer named utilities so Tailwind can detect them (dynamic max-w-[…] is purged).
  const maxWidthClass =
    width_subdiv === 1280
      ? 'max-w-7xl'
      : width_subdiv === 1600
        ? 'max-w-400'
        : null;

  return (
    <section className={`py-8 md:py-10 ${className}`}>
      <div
        className={`${maxWidthClass ?? ''} mx-auto px-6`}
        style={maxWidthClass ? undefined : { maxWidth: width_subdiv }}
      >
        {children}
      </div>
    </section>
  );
}
