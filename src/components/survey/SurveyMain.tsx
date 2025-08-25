import { SurveyComplete } from '@/components/survey/category/SurveyComplete';
import { SurveyPersonality } from '@/components/survey/category/SurveyPersonality';
import { SurveyStart } from '@/components/survey/category/SurveyStart';
import { SurveyTaste } from '@/components/survey/category/SurveyTaste';
import { SurveyValues } from '@/components/survey/category/SurveyValues';
import { useSurvey } from '@/components/survey/SurveyContext';

export const SurveyMain = () => {
  const { currentCategory } = useSurvey();

  // 현재 상태에 따라 적절한 컴포넌트 렌더링
  switch (currentCategory) {
    case 'start':
      return <SurveyStart />;
    case 'personality':
      return <SurveyPersonality />;
    case 'values':
      return <SurveyValues />;
    case 'taste':
      return <SurveyTaste />;
    case 'complete':
      return <SurveyComplete />;
    default:
      return <SurveyStart />;
  }
};
