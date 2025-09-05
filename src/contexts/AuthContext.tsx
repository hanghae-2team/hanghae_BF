import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { User } from '@/apis/users';

// AuthContext 타입 정의
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData?: User) => void;
  logout: () => void;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props 타입
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 localStorage에서 사용자 정보 복원
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('저장된 사용자 정보를 불러오는데 실패했습니다:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    } else {
      // savedUser가 없는 경우에도 로딩 완료 처리
      setIsLoading(false);
    }
  }, []);

  // 로그인 함수 - 사용자 정보를 저장하고 인증 상태를 true로 설정
  const login = (userData?: User) => {
    if (!userData) return;

    setUser(userData);
    // localStorage에도 저장하여 새로고침 시에도 유지되도록 함
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 로그아웃 함수 - 사용자 정보를 삭제하고 인증 상태를 false로 설정
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // 인증 상태 계산
  const isAuthenticated = user !== null;

  // Context value 객체
  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth 커스텀 훅 - AuthContext를 사용하기 위한 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};

export default AuthContext;
