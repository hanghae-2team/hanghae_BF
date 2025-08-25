import personalityQuestions from '@/assets/questions/personality.json';
import { ProgressBar } from '@/components/survey/ProgressBar';
import { useSurvey } from '@/components/survey/SurveyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/elements/card';
import { SURVEY_PERSONALITY_OPTIONS } from '@/utils/SurveyUtils';

export const SurveyPersonality = () => {
  const { currentQuestion, selectQuestionAnswer } = useSurvey();

  // 현재 질문 데이터 가져오기
  const currentQuestionData = personalityQuestions[currentQuestion];

  // 답변 선택 처리
  const handleAnswerSelect = (answer: number) => {
    selectQuestionAnswer(currentQuestionData.id, answer);
  };

  // 진행률 계산
  const progress = ((currentQuestion + 1) / 10) * 100;

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-3">성향 조사</h1>
      </div>

      {/* 진행률 표시 */}
      <ProgressBar currentQuestion={currentQuestion} progress={progress} />

      {/* 질문 카드 */}
      <Card className="mb-8">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg leading-relaxed">{currentQuestionData.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 5지선다 답변 옵션 */}
          <div className="grid grid-cols-1 gap-4">
            {SURVEY_PERSONALITY_OPTIONS.map((option) => (
              <div
                key={option.label}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 border-2 p-6 rounded-2xl shadow-md hover:shadow-xl"
                onClick={() => handleAnswerSelect(option.value)}
              >
                <div className="text-base">{option.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
