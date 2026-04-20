type QuantityButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function QuantityButton({ label, onClick, disabled = false }: QuantityButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[36px] w-[38px] items-center justify-center text-[28px] font-light leading-none text-[#777777] transition-colors hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-40"
      aria-label={label}
    >
      {label}
    </button>
  );
}
