import { SurveyProvider } from '@/components/survey/SurveyContext';
import { SurveyLayout } from '@/components/survey/SurveyLayout';
import { SurveyMain } from '@/components/survey/SurveyMain';

export const Survey = () => {
  return (
    <SurveyProvider>
      <SurveyLayout>
        <SurveyMain />
      </SurveyLayout>
    </SurveyProvider>
  );
};
