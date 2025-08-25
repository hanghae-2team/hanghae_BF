import { SurveyStart } from '@/components/survey/intro/SurveyStart';
import { SurveyComplete } from '@/components/survey/SurveyComplete';

export const Survey = () => {
  return (
    <div className="bg-amber-200">
      <SurveyStart />
      <SurveyComplete />
    </div>
  );
};
