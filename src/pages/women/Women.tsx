import WomenClickLanking from '../../components/women/WomenClickLanking';
import WomenCurationMoodboard from '../../components/women/WomenCurationMoodboard';
import WomenHeroSlider from '../../components/women/WomenHeroSlider';
import WomenNew from '../../components/women/WomenNew';
import WomenWeeklyRanking from '../../components/women/WomenWeeklyRanking';

export default function Women() {
    return (
        <main className="women-page w-full">
            <style>{`
                .women-page .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .women-page .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <WomenHeroSlider />
            <WomenClickLanking />
            <WomenCurationMoodboard />
            <WomenWeeklyRanking />
            <WomenNew />
        </main>
    );
}
