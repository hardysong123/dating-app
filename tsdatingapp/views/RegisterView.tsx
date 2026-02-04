
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { generateBio } from '../services/geminiService';

interface RegisterViewProps {
  onComplete: (user: UserProfile) => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: 20,
    gender: '',
    pronouns: '',
    bio: '',
    traits: [] as string[]
  });

  const traitsOptions = ['Cooking', 'Art', 'Gaming', 'Music', 'Hiking', 'Photography', 'Travel', 'Coding'];

  const toggleTrait = (trait: string) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.includes(trait) 
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait]
    }));
  };

  const handleGenerateBio = async () => {
    if (formData.traits.length === 0) return;
    setLoading(true);
    const bio = await generateBio(formData.traits);
    setFormData(prev => ({ ...prev, bio }));
    setLoading(false);
  };

  const handleSubmit = () => {
    onComplete({
      id: 'me',
      ...formData,
      photos: ['https://picsum.photos/seed/me/400/600']
    });
  };

  return (
    <div className="p-6 pt-12 min-h-full">
      <div className="mb-8">
        <div className="flex gap-1 mb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-pink-400' : 'bg-slate-200'}`} />
          ))}
        </div>
        <h2 className="text-2xl font-bold">
          {step === 1 && "Basic Info"}
          {step === 2 && "Your Identity"}
          {step === 3 && "About You"}
        </h2>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">What's your name?</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData(p => ({...p, name: e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-pink-300 outline-none" 
              placeholder="Display name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
            <input 
              type="number" 
              value={formData.age}
              onChange={e => setFormData(p => ({...p, age: parseInt(e.target.value)}))}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-pink-300 outline-none" 
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gender Identity</label>
            <input 
              type="text" 
              value={formData.gender}
              onChange={e => setFormData(p => ({...p, gender: e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-pink-300 outline-none" 
              placeholder="e.g. Transfeminine, Non-binary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pronouns</label>
            <input 
              type="text" 
              value={formData.pronouns}
              onChange={e => setFormData(p => ({...p, pronouns: e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-pink-300 outline-none" 
              placeholder="e.g. She/They"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {traitsOptions.map(t => (
                <button
                  key={t}
                  onClick={() => toggleTrait(t)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.traits.includes(t) ? 'bg-pink-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-sm font-medium text-slate-700">Bio</label>
              <button 
                onClick={handleGenerateBio}
                disabled={loading || formData.traits.length === 0}
                className="text-xs text-pink-500 font-semibold hover:underline flex items-center gap-1 disabled:opacity-50"
              >
                {loading ? 'Thinking...' : '✨ Magic AI Bio'}
              </button>
            </div>
            <textarea 
              value={formData.bio}
              onChange={e => setFormData(p => ({...p, bio: e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-pink-300 outline-none h-32 resize-none" 
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      )}

      <div className="mt-12 flex gap-3">
        {step > 1 && (
          <button 
            onClick={() => setStep(s => s - 1)}
            className="flex-1 py-4 bg-slate-200 text-slate-700 rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            Back
          </button>
        )}
        <button 
          onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
          disabled={step === 1 && !formData.name}
          className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-lg active:scale-95 transition-transform disabled:opacity-50"
        >
          {step === 3 ? "Complete" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default RegisterView;
