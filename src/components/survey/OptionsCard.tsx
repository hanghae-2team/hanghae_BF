import { twMerge } from 'tailwind-merge';

import { SURVEY_CARDS } from '@/utils/SurveyUtils';

export const OptionsCard = ({ type }: { type: 'personality' | 'value' | 'taste' }) => {
  return (
    <div
      className={twMerge(
        `group p-4 bg-gradient-to-r rounded-2xl border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`,
        SURVEY_CARDS[type].colors.bg,
        SURVEY_CARDS[type].colors.border
      )}
    >
      <div className="flex items-center space-x-4">
        <div className={twMerge(`p-3 bg-gradient-to-br rounded-xl shadow-md`, SURVEY_CARDS[type].colors.gradient)}>
          <div className="text-3xl">
            <img src={SURVEY_CARDS[type].icon} alt={SURVEY_CARDS[type].title} />
          </div>
        </div>
        <div className="text-left flex-1">
          <div className={twMerge(`font-bold ${SURVEY_CARDS[type].colors.text} text-base mb-1`)}>
            {SURVEY_CARDS[type].title}
          </div>
          <div className={twMerge(`text-sm ${SURVEY_CARDS[type].colors.textSecondary} leading-relaxed`)}>
            {SURVEY_CARDS[type].description}
          </div>
        </div>
      </div>
    </div>
  );
};
