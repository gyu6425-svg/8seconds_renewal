import MenClickLanking from '../../components/men/MenClickLanking';
import MenCurationMoodboard from '../../components/men/MenCurationMoodboard';
import MenHeroSlider from '../../components/men/MenHeroSlider';
import MenWeeklyRanking from '../../components/men/MenWeeklyRanking';
import New from '../../components/men/New';

export default function Men() {
    return (
        <main className="men-page w-full">
            <style>{`
                .men-page .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .men-page .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <MenHeroSlider />
            <MenClickLanking />
            <MenCurationMoodboard />
            <MenWeeklyRanking />
            <New />
        </main>
    );
}
