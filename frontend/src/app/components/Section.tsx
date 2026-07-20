export function Section({ children, className, width_subdiv = 1280 }: { children: React.ReactNode, className?: string, width_subdiv?: number }) {
  return (
    <section className={`py-8 md:py-10 ${className}`}>
      <div className={`max-w-[${width_subdiv}px] mx-auto px-6`}>
        {children}
      </div>
    </section>
  );
}