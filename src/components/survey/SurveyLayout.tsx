import { Card, CardContent } from '@/elements/card';

export const SurveyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 relative overflow-hidden">
      <Card className="max-w-sm min-w-sm mx-auto h-[calc(100vh-100px)] bg-white/90 backdrop-blur-sm border-0 shadow-2xl relative z-10">
        <CardContent className="text-center pt-8 pb-8">{children}</CardContent>
      </Card>
    </div>
  );
};
