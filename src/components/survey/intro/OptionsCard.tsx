import { twMerge } from 'tailwind-merge';

import type { SurveyCategory } from '@/types/survey';
import { SURVEY_CARDS } from '@/utils/SurveyUtils';

export const OptionsCard = ({ category }: { category: SurveyCategory }) => {
  return (
    <div
      className={twMerge(
        `group p-4 bg-gradient-to-r rounded-2xl border hover:shadow-lg hover:scale-105 transition-all duration-300`,
        SURVEY_CARDS[category].colors.bg,
        SURVEY_CARDS[category].colors.border
      )}
    >
      <div className="flex items-center space-x-4">
        <div className={twMerge(`p-3 bg-gradient-to-br rounded-xl shadow-md`, SURVEY_CARDS[category].colors.gradient)}>
          <div className="text-3xl">
            <img src={SURVEY_CARDS[category].icon} alt={SURVEY_CARDS[category].title} />
          </div>
        </div>
        <div className="text-left flex-1">
          <div className={twMerge(`font-bold ${SURVEY_CARDS[category].colors.text} text-base mb-1`)}>
            {SURVEY_CARDS[category].title}
          </div>
          <div className={twMerge(`text-sm ${SURVEY_CARDS[category].colors.textSecondary} leading-relaxed`)}>
            {SURVEY_CARDS[category].description}
          </div>
        </div>
      </div>
    </div>
  );
};
