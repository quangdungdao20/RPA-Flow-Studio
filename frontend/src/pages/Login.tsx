import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Mail, AlertTriangle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock Login Validation
    setTimeout(() => {
      if (email === 'admin@novaspark.io' && password === 'admin123') {
        localStorage.setItem('token', 'mock-jwt-token');
        navigate('/dashboard');
      } else {
        setError('Invalid username or password. Use admin@novaspark.io / admin123');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-nova-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nova-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-spark-orange/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white/95 border border-gray-300 rounded-radius-xl p-8 shadow-xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-nova-blue rounded-radius-lg flex items-center justify-center font-bold text-white shadow-md mx-auto mb-3">
            NS
          </div>
          <h2 className="text-h2 font-bold text-gray-900">Sign in to NovaSpark</h2>
          <p className="text-body-sm text-gray-600 mt-1">RPA Flow Studio & Orchestrator</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-spark-red/20 text-spark-red text-body-sm rounded-radius-md flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-body-sm font-semibold text-gray-600 mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-600">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@novaspark.io"
                className="w-full h-10 pl-10 pr-4 bg-white border border-gray-300 rounded-radius-md text-body-sm focus:border-2 focus:border-nova-blue focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-body-sm font-semibold text-gray-600 mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-600">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-4 bg-white border border-gray-300 rounded-radius-md text-body-sm focus:border-2 focus:border-nova-blue focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-nova-blue text-white rounded-radius-md text-body-sm font-semibold hover:bg-nova-blue/90 shadow-md transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-600">
          Demo Account: <span className="font-semibold text-gray-900">admin@novaspark.io</span> / <span className="font-semibold text-gray-900">admin123</span>
        </div>
      </div>
    </div>
  );
}
