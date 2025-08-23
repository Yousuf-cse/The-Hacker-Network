import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2, MapPin, Home, GraduationCap, Code, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ExLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface SignupFormData {
  // Step 1: Basic Info
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Address
  address: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    countryCode?: string;
    landmark?: string;
  };
  
  // Step 3: Education & Skills
  education: {
    college_name: string;
    year_of_study: number;
    department: string;
  };
  skills: {
    technical: string;
    non_technical: string;
  };
  experience_level: ExLevel;
}

const MultiStepSignup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  const [formData, setFormData] = useState<SignupFormData>({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      countryCode: '',
      landmark: ''
    },
    education: {
      college_name: '',
      year_of_study: 1,
      department: ''
    },
    skills: {
      technical: '',
      non_technical: ''
    },
    experience_level: 'Beginner'
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        const parentValue = prev[parent as keyof SignupFormData];
        
        // Type guard to ensure parentValue is an object
        if (parentValue && typeof parentValue === 'object' && !Array.isArray(parentValue)) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value
            }
          };
        }
      }
      return {
        ...prev,
        [field]: value
      };
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.full_name.trim()) newErrors['full_name'] = 'Full name is required';
      if (!formData.email.trim()) newErrors['email'] = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors['email'] = 'Invalid email format';
      if (!formData.password) newErrors['password'] = 'Password is required';
      else if (formData.password.length < 8) newErrors['password'] = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors['confirmPassword'] = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors['confirmPassword'] = 'Passwords do not match';
    }

    if (step === 2) {
      if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
      if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
      if (!formData.address.postalCode.trim()) newErrors['address.postalCode'] = 'Postal code is required';
      if (!formData.address.country.trim()) newErrors['address.country'] = 'Country is required';
    }

    if (step === 3) {
      if (!formData.education.college_name.trim()) newErrors['education.college_name'] = 'College name is required';
      if (!formData.education.department.trim()) newErrors['education.department'] = 'Department is required';
      if (formData.education.year_of_study < 1 || formData.education.year_of_study > 8) {
        newErrors['education.year_of_study'] = 'Year of study must be between 1-8';
      }
      if (!formData.skills.technical.trim()) newErrors['skills.technical'] = 'Technical skills are required';
      if (!formData.skills.non_technical.trim()) newErrors['skills.non_technical'] = 'Non-technical skills are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Remove confirmPassword from final data
      const { confirmPassword, ...finalData } = formData;
      
      console.log('Signup Data:', finalData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Account created successfully! Welcome aboard!'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to create account. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            step === currentStep 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110' 
              : step < currentStep 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md' 
                : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-2 mx-3 rounded-full transition-all duration-500 ${
              step < currentStep ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <CardContent className="space-y-6 px-8 py-6">
      {/* Status Alert */}
      {submitStatus.type && (
        <Alert className={`border-l-4 shadow-sm ${
          submitStatus.type === 'success' 
            ? 'border-l-green-500 border-green-200 bg-green-50 text-green-800' 
            : 'border-l-red-500 border-red-200 bg-red-50 text-red-800'
        }`}>
          {submitStatus.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription className="font-inter">{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="full_name" className="text-sm font-medium text-gray-700 font-inter">
          Full Name
        </Label>
        <div className="relative group">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <Input
            id="full_name"
            type="text"
            placeholder="Enter your full name"
            value={formData.full_name}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            className={`pl-10 h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors.full_name ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
        </div>
        {errors.full_name && (
          <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
            <AlertCircle className="h-3 w-3" />
            {errors.full_name}
          </p>
        )}
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700 font-inter">
          Email Address
        </Label>
        <div className="relative group">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`pl-10 h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors.email ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
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
        <div className="relative group">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`pl-10 pr-10 h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors.password ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
            <AlertCircle className="h-3 w-3" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 font-inter">
          Confirm Password
        </Label>
        <div className="relative group">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`pl-10 pr-10 h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
            <AlertCircle className="h-3 w-3" />
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </CardContent>
  );

  const renderStep2 = () => (
    <CardContent className="space-y-6 px-8 py-6">
      {/* Street Address */}
      <div className="space-y-2">
        <Label htmlFor="street" className="text-sm font-medium text-gray-700 font-inter">
          Street Address
        </Label>
        <div className="relative group">
          <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <Input
            id="street"
            type="text"
            placeholder="Enter your street address"
            value={formData.address.street}
            onChange={(e) => handleInputChange('address.street', e.target.value)}
            className={`pl-10 h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['address.street'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
        </div>
        {errors['address.street'] && (
          <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
            <AlertCircle className="h-3 w-3" />
            {errors['address.street']}
          </p>
        )}
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700 font-inter">
            City
          </Label>
          <div className="relative group">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              id="city"
              type="text"
              placeholder="City"
              value={formData.address.city}
              onChange={(e) => handleInputChange('address.city', e.target.value)}
              className={`pl-10 h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['address.city'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
            />
          </div>
          {errors['address.city'] && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-3 w-3" />
              {errors['address.city']}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium text-gray-500 font-lightItalic">
            State (Optional)
          </Label>
          <Input
            id="state"
            type="text"
            placeholder="State"
            value={formData.address.state || ''}
            onChange={(e) => handleInputChange('address.state', e.target.value)}
            className="h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Postal Code and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700 font-inter">
            Postal Code
          </Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="Postal Code"
            value={formData.address.postalCode}
            onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
            className={`h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['address.postalCode'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
          {errors['address.postalCode'] && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-3 w-3" />
              {errors['address.postalCode']}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium text-gray-700 font-inter">
            Country
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="Country"
            value={formData.address.country}
            onChange={(e) => handleInputChange('address.country', e.target.value)}
            className={`h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['address.country'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
          {errors['address.country'] && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-3 w-3" />
              {errors['address.country']}
            </p>
          )}
        </div>
      </div>

      {/* Optional fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="countryCode" className="text-sm font-medium text-gray-500 font-lightItalic">
            Country Code (Optional)
          </Label>
          <Input
            id="countryCode"
            type="text"
            placeholder="e.g., US, IN, UK"
            value={formData.address.countryCode || ''}
            onChange={(e) => handleInputChange('address.countryCode', e.target.value)}
            className="h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="landmark" className="text-sm font-medium text-gray-500 font-lightItalic">
            Landmark (Optional)
          </Label>
          <Input
            id="landmark"
            type="text"
            placeholder="Nearby landmark"
            value={formData.address.landmark || ''}
            onChange={(e) => handleInputChange('address.landmark', e.target.value)}
            className="h-12 font-inter transition-all duration-200 focus:shadow-lg hover:border-gray-400 focus:border-blue-500"
          />
        </div>
      </div>
    </CardContent>
  );

  const renderStep3 = () => (
    <CardContent className="space-y-6 px-8 py-6">
      {/* Education Section */}
      <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 font-main-heading">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          Education
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="college_name" className="text-sm font-medium text-gray-700 font-inter">
            College Name
          </Label>
          <Input
            id="college_name"
            type="text"
            placeholder="Enter your college name"
            value={formData.education.college_name}
            onChange={(e) => handleInputChange('education.college_name', e.target.value)}
            className={`h-12 font-inter bg-white transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['education.college_name'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
          {errors['education.college_name'] && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-3 w-3" />
              {errors['education.college_name']}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year_of_study" className="text-sm font-medium text-gray-700 font-inter">
              Year of Study
            </Label>
            <Input
              id="year_of_study"
              type="number"
              min="1"
              max="8"
              placeholder="1-8"
              value={formData.education.year_of_study}
              onChange={(e) => handleInputChange('education.year_of_study', parseInt(e.target.value) || 1)}
              className={`h-12 font-inter bg-white transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['education.year_of_study'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
            />
            {errors['education.year_of_study'] && (
              <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
                <AlertCircle className="h-3 w-3" />
                {errors['education.year_of_study']}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium text-gray-700 font-inter">
              Department
            </Label>
            <Input
              id="department"
              type="text"
              placeholder="e.g., Computer Science"
              value={formData.education.department}
              onChange={(e) => handleInputChange('education.department', e.target.value)}
              className={`h-12 font-inter bg-white transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['education.department'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
            />
            {errors['education.department'] && (
              <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
                <AlertCircle className="h-3 w-3" />
                {errors['education.department']}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 font-main-heading">
          <Code className="h-6 w-6 text-purple-600" />
          Skills
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="technical_skills" className="text-sm font-medium text-gray-700 font-inter">
            Technical Skills
          </Label>
          <Input
            id="technical_skills"
            type="text"
            placeholder="e.g., JavaScript, Python, React"
            value={formData.skills.technical}
            onChange={(e) => handleInputChange('skills.technical', e.target.value)}
            className={`h-12 font-inter bg-white transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['skills.technical'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
          {errors['skills.technical'] && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-3 w-3" />
              {errors['skills.technical']}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="non_technical_skills" className="text-sm font-medium text-gray-700 font-inter">
            Non-Technical Skills
          </Label>
          <Input
            id="non_technical_skills"
            type="text"
            placeholder="e.g., Communication, Leadership, Project Management"
            value={formData.skills.non_technical}
            onChange={(e) => handleInputChange('skills.non_technical', e.target.value)}
            className={`h-12 font-inter bg-white transition-all duration-200 focus:shadow-lg hover:border-gray-400 ${errors['skills.non_technical'] ? 'border-red-300 focus:border-red-500 shadow-red-100' : 'focus:border-blue-500'}`}
          />
          {errors['skills.non_technical'] && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-inter animate-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-3 w-3" />
              {errors['skills.non_technical']}
            </p>
          )}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <Label htmlFor="experience_level" className="text-sm font-medium text-gray-700 flex items-center gap-2 font-inter">
          <Award className="h-5 w-5 text-amber-500" />
          Experience Level
        </Label>
        <select
          id="experience_level"
          value={formData.experience_level}
          onChange={(e) => handleInputChange('experience_level', e.target.value)}
          className="w-full px-4 py-3 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-inter bg-white shadow-sm hover:border-gray-400 focus:shadow-lg"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
    </CardContent>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Create Account';
      case 2: return 'Address Information';
      case 3: return 'Education & Skills';
      default: return 'Create Account';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Enter your basic information to get started';
      case 2: return 'Tell us where you are located';
      case 3: return 'Share your educational background and skills';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 font-inter">
      <Card className="w-full max-w-3xl shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
        <CardHeader className="space-y-6 text-center bg-gradient-to-r from-blue-600/5 to-purple-600/5 px-8 py-8">
          {renderStepIndicator()}
          <CardTitle className="text-3xl font-bold text-gray-900 font-brand">
            {getStepTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg font-montserrat">
            {getStepDescription()}
          </CardDescription>
        </CardHeader>

        <div className="min-h-[500px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <CardFooter className="flex justify-between items-center px-8 py-6 bg-gray-50/50 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1 || isLoading}
            className="flex items-center gap-2 px-6 py-3 h-12 font-inter transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-gray-500 font-inter">
            Step {currentStep} of 3
          </div>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 px-6 py-3 h-12 font-inter transform hover:scale-105"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl px-8 py-3 h-12 font-inter transform hover:scale-105 disabled:transform-none disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MultiStepSignup;