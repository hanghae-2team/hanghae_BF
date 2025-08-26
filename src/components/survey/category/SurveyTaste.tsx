import tasteQuestions from '@/assets/questions/taste.json';
import { ProgressBar } from '@/components/survey/ProgressBar';
import { useSurvey } from '@/components/survey/SurveyContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/elements/card';

export const SurveyTaste = () => {
  const { currentQuestion, moveToNextCategory, selectQuestionAnswer, answers } = useSurvey();

  // 현재 질문 데이터 가져오기
  const currentQuestionData = tasteQuestions[currentQuestion];

  // 답변 선택 처리
  const handleAnswerSelect = (answer: number) => {
    if (currentQuestion === 9) {
      //최종 질문
      console.log(answers);
      moveToNextCategory();
    } else {
      selectQuestionAnswer(currentQuestionData.id, answer);
    }
  };

  // 진행률 계산
  const progress = ((currentQuestion + 1) / 10) * 100;

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-3">입맛 분석</h1>
      </div>

      {/* 진행률 표시 */}
      <ProgressBar currentQuestion={currentQuestion} progress={progress} />

      {/* 질문 카드 */}
      <Card className="mb-8">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg leading-relaxed">어떤 음식을 더 좋아하시나요?</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 택1 답변 옵션 */}
          <div className="grid grid-cols-1 gap-4">
            {currentQuestionData.choices.map((option, index) => (
              <div
                key={option}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 border-2 p-6 rounded-2xl shadow-md hover:shadow-xl"
                onClick={() => handleAnswerSelect(index + 1)}
              >
                <div className="text-base">{option}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
