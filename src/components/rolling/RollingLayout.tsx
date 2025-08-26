export const RollingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-2 py-8 relative overflow-hidden">
      {children}
    </div>
  );
};
