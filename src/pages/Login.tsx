import { useMutation } from '@tanstack/react-query';
import { AlertCircle, Eye, EyeOff, Github, Heart, Sparkles, Star, User, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { authenticateUser } from '@/apis/users';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/elements/button';
import { Card, CardContent } from '@/elements/card';
import { Input } from '@/elements/input';
import { Label } from '@/elements/label';
import { Layout } from '@/elements/layout';
import { PATH } from '@/routers/router';

interface LoginFormData {
  name: string;
  userId: string;
}

interface LoginFormErrors {
  name?: string;
  userId?: string;
  general?: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext에서 login 함수 가져오기
  const [formData, setFormData] = useState<LoginFormData>({
    name: '',
    userId: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (form: LoginFormData) => authenticateUser(form.userId, form.name),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (res) => {
      login(res.user);
      if (res.user?.isCompleted) {
        navigate(PATH.SURVEY_COMPLETE());
      } else {
        navigate(PATH.HOBBY_SELECT());
      }
    },
    onError: () => {
      setErrors({ general: '로그인에 실패했습니다. 다시 시도해주세요.' });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

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

    mutate(formData);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center px-2 sm:px-4 w-full">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="mb-8 text-center">
            <div className="relative inline-block mb-4">
              {/* 다중 글로우 효과 */}
              <div className="absolute font-PyeongchangPeace inset-0 text-5xl sm:text-5xl lg:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-lg opacity-40 animate-pulse">
                항해 6기
              </div>
              {/* 메인 텍스트 */}
              <h1 className="relative font-PyeongchangPeace text-5xl sm:text-5xl lg:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-shift drop-shadow-sm">
                항해 6기
              </h1>

              {/* 회전하는 장식 요소들 */}
              <div className="absolute z-0 -inset-12 animate-spin-very-slow opacity-60">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <Zap className="w-3 h-3 text-blue-400" />
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                  <Heart className="w-3 h-3 text-purple-400 fill-purple-400" />
                </div>
              </div>

              {/* 반짝이는 점들 */}
              <div className="absolute -top-4 -right-4 animate-ping">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 animate-bounce">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              </div>
              <div className="absolute -top-2 -left-6 animate-pulse">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              </div>
              <div className="absolute -bottom-2 -right-6 animate-ping" style={{ animationDelay: '1s' }}>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              </div>
            </div>

            <h3 className="font-PyeongchangPeace font-bold text-2xl sm:text-3xl lg:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              BP 말고 BF 찾기
            </h3>

            <p className="text-base text-white font-medium">나랑 찰떡궁합인 항해인은 누구?</p>

            {/* 추가 장식 */}
            <div className="flex justify-center gap-1 mt-4">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
              <div
                className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          {/* 기존 카드 스타일 유지 */}
          <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-md">
              <CardContent>
                <div className="space-y-4">
                  {/* 이름 입력 필드 - 약간의 개선 */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      이름
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 h-4 w-4 transition-colors" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`text-sm pl-10 transition-all ${errors.name ? 'border-red-500 focus-visible:border-red-500' : 'focus-visible:border-blue-500'}`}
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

                  {/* 유저 아이디 입력 필드 - 약간의 개선 */}
                  <div className="space-y-2">
                    <Label htmlFor="userId" className="text-sm font-medium">
                      github 아이디
                    </Label>
                    <div className="relative group">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 h-4 w-4 transition-colors" />
                      <Input
                        id="userId"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="깃허브 아이디를 입력하세요"
                        value={formData.userId}
                        onChange={(e) => handleInputChange('userId', e.target.value)}
                        className={`text-sm pl-10 pr-10 transition-all ${errors.userId ? 'border-red-500 focus-visible:border-red-500' : 'focus-visible:border-blue-500'}`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 transition-colors" />
                        ) : (
                          <Eye className="h-4 w-4 transition-colors" />
                        )}
                      </button>
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

                  {/* 로그인 버튼 - 약간의 개선 */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        로그인 중...
                      </div>
                    ) : (
                      '로그인'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </Layout>
  );
};
