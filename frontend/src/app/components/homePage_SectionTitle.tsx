export function HomePageSectionTitle({ title, subtitle }: { title: string, subtitle?: string }) {
    return (
        <div className="flex flex-col gap-4 mb-6 md:mb-12">
            <div className="flex items-center gap-4">
                <div className="w-1 h-12 xl:h-16 bg-secondary" />
                <h2 className="font-primary text-4xl xl:text-5xl text-primary tracking-wide">
                    {title}
                </h2>
            </div>
            {subtitle && (
                <p className="text-xl text-primary-accent leading-5">
                    {subtitle}
                </p>
            )}
        </div>
    );
}