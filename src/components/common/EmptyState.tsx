import { Link } from 'react-router-dom';

type EmptyStateProps = {
    title: string;
    description?: string;
    actionLabel?: string;
    actionTo?: string;
};

export default function EmptyState({ title, description, actionLabel, actionTo }: EmptyStateProps) {
    return (
        <div className="flex min-h-[360px] flex-col items-center justify-center border-y border-[#e5e5e5] px-6 py-16 text-center">
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111111]">{title}</h2>
            {description ? (
                <p className="mt-3 text-[16px] leading-7 text-[#777777]">{description}</p>
            ) : null}
            {actionLabel && actionTo ? (
                <Link
                    to={actionTo}
                    className="mt-8 flex h-[52px] min-w-[180px] items-center justify-center bg-[#111111] px-7 text-[16px] font-semibold text-white transition-opacity hover:opacity-85"
                >
                    {actionLabel}
                </Link>
            ) : null}
        </div>
    );
}
