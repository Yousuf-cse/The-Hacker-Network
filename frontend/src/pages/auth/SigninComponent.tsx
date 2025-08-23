import React from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface SigninComponentProps {
  formData: SignupData;
  errors: Record<string, string>;
  submitStatus: { type: 'success' | 'error' | null; message: string };
  showPassword: boolean;
  isLoading: boolean;
  onInputChange: (field: keyof SignupData, value: string) => void;
  onTogglePassword: () => void;
  onSubmit: () => void;
  onToggleMode?: () => void;
}

const SigninComponent: React.FC<SigninComponentProps> = ({
  formData,
  errors,
  submitStatus,
  showPassword,
  isLoading,
  onInputChange,
  onTogglePassword,
  onSubmit,
  onToggleMode
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 font-inter">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 font-brand">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-600 font-montserrat">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <div>
          <CardContent className="space-y-4">
            {/* Status Alert */}
            {submitStatus.type && (
              <Alert className={`${
                submitStatus.type === 'success' 
                  ? 'border-green-200 bg-green-50 text-green-800' 
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription className="font-inter">{submitStatus.message}</AlertDescription>
              </Alert>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 font-inter">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  className={`pl-9 font-inter ${errors.email ? 'border-red-300 focus:border-red-500' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 font-inter">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => onInputChange('password', e.target.value)}
                  className={`pl-9 pr-9 font-inter ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1 font-inter">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={onSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl font-inter"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            {onToggleMode && (
              <div className="text-center text-sm text-gray-600 font-inter">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onToggleMode}
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </div>
            )}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default SigninComponent;