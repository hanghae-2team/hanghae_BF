import { AlertCircle, Lock, User } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/elements/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/elements/card';
import { Input } from '@/elements/input';
import { Label } from '@/elements/label';

interface LoginFormData {
  name: string;
  userId: string;
}

interface LoginFormErrors {
  name?: string;
  userId?: string;
  general?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    name: '',
    userId: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    // 이름 유효성 검사
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    }

    // 유저 아이디 유효성 검사
    if (!formData.userId) {
      newErrors.userId = '유저 아이디를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // 입력 시 해당 필드의 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // try {
    //   // TODO: 실제 로그인 로직 구현
    //   await new Promise((resolve) => setTimeout(resolve, 1000)); // 임시 딜레이

    //   // 성공 시 처리 (예: 리다이렉트, 토큰 저장 등)
    // } catch (error) {
    //   setErrors({ general: '로그인에 실패했습니다. 다시 시도해주세요.' });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center px-2 sm:px-4 w-full">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* 항해 전용 로고 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/Dolphin.png" alt="돌고래" className="w-16 h-16 object-contain animate-bounce" />
            <img src="/Camping.png" alt="캠핑" className="w-16 h-16 object-contain animate-pulse" />
            <img
              src="/Crab.png"
              alt="게"
              className="w-16 h-16 object-contain animate-bounce"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
        </div>

        <Card className="w-full max-w-sm sm:max-w-md">
          <CardHeader className="space-y-1 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">항해 6기</h1>
            <p className="text-gray-600 font-semibold text-xl">전용 로그인</p>
            <CardDescription>이름과 유저 아이디로 로그인하세요</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 입력 필드 */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  이름
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="이름"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`text-sm pl-10 ${errors.name ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* 유저 아이디 입력 필드 */}
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-sm font-medium">
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="userId"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="깃허브 아이디"
                    value={formData.userId}
                    onChange={(e) => handleInputChange('userId', e.target.value)}
                    className={`text-sm pl-10 pr-10 ${errors.userId ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.userId && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    {errors.userId}
                  </div>
                )}
              </div>

              {/* 일반 에러 메시지 */}
              {errors.general && (
                <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  {errors.general}
                </div>
              )}

              {/* 로그인 버튼 */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    로그인 중...
                  </div>
                ) : (
                  '로그인'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
