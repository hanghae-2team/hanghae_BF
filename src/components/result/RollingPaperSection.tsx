import cloverSvg from '@/assets/images/result/clover.svg';
import { Card, CardContent, CardHeader } from '@/elements/card';

const RollingPaperSection = () => (
  <Card className="gap-2">
    <CardHeader>
      <h2 className="text-2xl font-bold">롤링페이퍼</h2>
    </CardHeader>
    <CardContent className="text-center my-4">
      <p className="whitespace-pre-line">
        롤링페이퍼는 수료일에 공개됩니다{'\n'}잠시만 기다려주세요
        <img src={cloverSvg} alt="클로버 이모지" className="inline ml-2" width={24} height={24} />
      </p>
    </CardContent>
  </Card>
);

export default RollingPaperSection;
