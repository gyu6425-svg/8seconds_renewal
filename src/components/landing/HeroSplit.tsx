import { Link } from 'react-router-dom';

interface HeroSplitProps {
  menImage: string;
  womenImage: string;
}

const splitItems = [
  { to: '/men', label: 'MEN' as const },
  { to: '/women', label: 'WOMEN' as const },
];

export default function HeroSplit({ menImage, womenImage }: HeroSplitProps) {
  const imageMap = {
    MEN: menImage,
    WOMEN: womenImage,
  };

  return (
    <section className="relative w-full max-w-[1700px]">
      <div className="mx-auto grid w-full max-w-[1700px] overflow-hidden md:grid-cols-2">
        {splitItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="group relative mx-auto block h-[420px] w-full overflow-hidden sm:h-[540px] md:h-[760px] md:w-[850px] xl:h-[941px]"
          >
            <img
              src={imageMap[item.label]}
              alt={`${item.label} landing`}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] group-hover:opacity-95"
            />
            <span className="pointer-events-none absolute inset-x-0 top-[58%] -translate-y-1/2 text-center text-4xl font-black tracking-[0.06em] text-white sm:text-5xl md:text-6xl xl:text-7xl">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
