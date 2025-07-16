import React, { useState } from 'react';
import { Heart, Shield, Users, Activity, CheckCircle, Clock } from 'lucide-react';

const ReviewFunnel: React.FC = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  // Replace with your actual Google Reviews URL
  const GOOGLE_REVIEWS_URL = "https://g.page/r/CZt9oxmB6eXUEBM/review";
  
  // Replace with your actual webhook URL
  const WEBHOOK_URL = "https://g.page/r/CZt9oxmB6eXUEBM/review";

  // Replace with your hospital name
  const HOSPITAL_NAME = "DR PRATEEK BANSAL";

  const logFeedback = async (rating: string) => {
    try {
      if (WEBHOOK_URL && WEBHOOK_URL !== "https://your-webhook-url.com/feedback") {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating,
            timestamp: new Date().toISOString(),
            source: 'hospital-qr-review-system',
            type: 'patient-feedback',
            hospital: HOSPITAL_NAME
          }),
        });
      }
    } catch (error) {
      console.log('Webhook logging failed:', error);
    }
  };

  const handleRatingClick = async (rating: string) => {
    setSelectedRating(rating);
    setIsLoading(true);
    await logFeedback(rating);
    
    if (rating === 'good') {
      setTimeout(() => {
        window.location.href = GOOGLE_REVIEWS_URL;
      }, 1500);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setShowThankYou(true);
      }, 1800);
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 relative overflow-hidden">
        {/* Calming Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/3 via-green-500/3 to-blue-500/3"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/8 to-green-400/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-green-400/8 to-blue-400/8 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-300/6 to-green-300/6 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl border border-blue-200 shadow-2xl p-8 md:p-12 max-w-lg mx-auto text-center transform animate-scale-in">
          <div className="mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle shadow-xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Heart className="w-6 h-6 text-green-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
            Thank you for your feedback
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 font-medium leading-relaxed">
            We will work to improve and provide you with better care.
            <span className="block mt-2 text-blue-600">Your health is our priority</span>
          </p>
          
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="flex space-x-3">
              {[
                { icon: Heart, color: 'text-red-500' },
                { icon: Shield, color: 'text-blue-500' },
                { icon: Users, color: 'text-green-500' },
                { icon: Activity, color: 'text-blue-600' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 ${item.color} animate-bounce`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <item.icon className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Heart className="w-5 h-5 text-red-500" />
              <p className="text-gray-700 font-semibold">Patient-Centered Care</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your feedback helps us continuously improve our services and patient experience.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Thank you for helping <span className="font-semibold text-blue-600">{HOSPITAL_NAME}</span> improve patient care.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Calming Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft Medical Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/8 to-green-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400/8 to-blue-400/8 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/5 to-green-300/5 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating Medical Icons */}
        <div className="absolute top-20 left-10 text-blue-300/30 animate-float">
          <Heart className="w-8 h-8" />
        </div>
        <div className="absolute top-40 right-20 text-green-300/30 animate-float-delayed">
          <Shield className="w-7 h-7" />
        </div>
        <div className="absolute bottom-32 left-20 text-blue-300/30 animate-float">
          <Users className="w-9 h-9" />
        </div>
        <div className="absolute bottom-20 right-10 text-green-300/30 animate-float-delayed">
          <Activity className="w-6 h-6" />
        </div>
        <div className="absolute top-60 left-1/2 text-blue-300/20 animate-float">
          <Heart className="w-5 h-5" />
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* Hospital Logo Placeholder */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block border border-blue-200 shadow-lg">
            <p className="text-blue-700 font-bold text-lg">{HOSPITAL_NAME}</p>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            How was your experience with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-blue-600">
              {HOSPITAL_NAME}?
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg font-medium mb-4">
            Your feedback helps us serve you better
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Takes less than 30 seconds</span>
          </div>
        </div>

        {/* Rating Buttons */}
        <div className="space-y-4">
          {/* Good Experience Button */}
          <button
            onClick={() => handleRatingClick('good')}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-green-500 via-green-600 to-green-500 hover:from-green-400 hover:via-green-500 hover:to-green-400 text-white font-bold text-xl py-7 px-8 rounded-3xl shadow-xl hover:shadow-green-500/25 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-green-300/50 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden ${
              selectedRating === 'good' ? 'scale-95 shadow-inner' : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="flex items-center justify-center space-x-4 relative z-10">
              <span className="text-3xl">😊</span>
              <span className="font-bold">Good</span>
              <Heart className="w-6 h-6 group-hover:animate-pulse" />
            </div>
          </button>

          {/* Bad Experience Button */}
          <button
            onClick={() => handleRatingClick('bad')}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-400 text-white font-bold text-xl py-7 px-8 rounded-3xl shadow-xl hover:shadow-yellow-500/25 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-yellow-300/50 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden ${
              selectedRating === 'bad' ? 'scale-95 shadow-inner' : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="flex items-center justify-center space-x-4 relative z-10">
              <span className="text-3xl">😐</span>
              <span className="font-bold">Bad</span>
              <Shield className="w-6 h-6 group-hover:animate-pulse" />
            </div>
          </button>

          {/* Worst Experience Button */}
          <button
            onClick={() => handleRatingClick('worst')}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-400 hover:via-red-500 hover:to-red-400 text-white font-bold text-xl py-7 px-8 rounded-3xl shadow-xl hover:shadow-red-500/25 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-red-300/50 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden ${
              selectedRating === 'worst' ? 'scale-95 shadow-inner' : 'hover:scale-105 hover:-translate-y-1'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="flex items-center justify-center space-x-4 relative z-10">
              <span className="text-3xl">😞</span>
              <span className="font-bold">Worst</span>
              <Activity className="w-6 h-6 group-hover:animate-pulse" />
            </div>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-10 text-center">
            <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-green-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                </div>
                <div className="text-center">
                  <p className="text-gray-800 font-bold text-lg mb-2">
                    {selectedRating === 'good' ? '🏥 Redirecting to reviews...' : '💙 Processing your feedback...'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {selectedRating === 'good' ? 'Thank you for choosing our hospital!' : 'Your feedback helps us improve patient care!'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 inline-block">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <p className="text-gray-700 font-semibold">Patient-Centered Care</p>
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-gray-600 text-sm">
              Thank you for helping <span className="font-semibold text-blue-600">{HOSPITAL_NAME}</span> improve patient care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFunnel;