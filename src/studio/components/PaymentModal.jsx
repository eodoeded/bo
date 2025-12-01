import React, { useState } from 'react';
import { X, Check, CreditCard, Zap, Star, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanCard = ({ title, credits, price, features, recommended, onSelect, selected }) => (
  <div 
    onClick={onSelect}
    className={`
      relative p-6 rounded-sm border cursor-pointer transition-all duration-200
      ${selected 
        ? 'bg-[#E3E3FD]/10 border-[#E3E3FD] shadow-[0_0_20px_rgba(227,227,253,0.1)]' 
        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
      }
    `}
  >
    {recommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E3E3FD] text-[#12110d] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
        Most Popular
      </div>
    )}
    <div className="flex justify-between items-start mb-4">
        <div>
            <h3 className="text-[#E3E3FD] font-medium text-sm uppercase tracking-wider">{title}</h3>
            <div className="flex items-baseline gap-1 mt-2">
                <span className="text-2xl font-bold text-white">${price}</span>
                <span className="text-[#E3E3FD]/40 text-xs">/one-time</span>
            </div>
        </div>
        {selected ? (
            <div className="w-5 h-5 bg-[#E3E3FD] rounded-full flex items-center justify-center">
                <Check size={12} className="text-[#12110d]" />
            </div>
        ) : (
            <div className="w-5 h-5 rounded-full border border-white/20" />
        )}
    </div>
    
    <div className="text-[#E3E3FD] font-mono text-xl mb-6 flex items-center gap-2">
        <Zap size={16} className="fill-[#E3E3FD]" /> {credits} <span className="text-sm text-[#E3E3FD]/40">Credits</span>
    </div>

    <ul className="space-y-3">
        {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-xs text-[#E3E3FD]/70">
                <Check size={12} className="text-[#E3E3FD]" /> {feature}
            </li>
        ))}
    </ul>
  </div>
);

export const PaymentModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState('plans'); // 'plans' | 'payment' | 'success'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
        id: 'starter',
        title: 'Starter',
        credits: 50,
        price: 19,
        features: ['10 High-Res Generations', 'Standard Support', 'Commercial License']
    },
    {
        id: 'pro',
        title: 'Professional',
        credits: 150,
        price: 49,
        recommended: true,
        features: ['30 High-Res Generations', 'Priority Queue', 'Commercial License', 'PSD Export']
    },
    {
        id: 'studio',
        title: 'Agency',
        credits: 500,
        price: 149,
        features: ['100 High-Res Generations', 'Dedicated Support', 'Commercial License', 'PSD + 3D Export']
    }
  ];

  const handlePayment = async (e) => {
      e.preventDefault();
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 2000)); // Simulating Stripe
      setIsProcessing(false);
      setStep('success');
      
      // Update credits after delay
      setTimeout(() => {
          if (selectedPlan) {
              onComplete(selectedPlan.credits);
          }
      }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-inter-light">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-[#1C1A14] border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#12110d]">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#3B3B3B] text-[#E3E3FD] flex items-center justify-center rounded-sm">
                    <Star size={16} className="fill-current" />
                </div>
                <div>
                    <h2 className="text-[#E3E3FD] font-medium text-sm tracking-wide">Upgrade Workspace</h2>
                    <p className="text-[#E3E3FD]/40 text-[10px] uppercase tracking-widest">Add credits to generate more</p>
                </div>
            </div>
            <button onClick={onClose} className="text-[#E3E3FD]/40 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
            {step === 'plans' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map(plan => (
                        <PlanCard 
                            key={plan.id} 
                            {...plan} 
                            selected={selectedPlan?.id === plan.id}
                            onSelect={() => setSelectedPlan(plan)}
                        />
                    ))}
                </div>
            )}

            {step === 'payment' && (
                <div className="max-w-md mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-sm p-6 mb-6">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                            <span className="text-[#E3E3FD] text-sm">{selectedPlan.title} Pack</span>
                            <span className="text-white font-bold">${selectedPlan.price}.00</span>
                        </div>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider text-[#E3E3FD]/60">Card Number</label>
                                <div className="relative">
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#12110d] border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-sm text-white focus:border-[#E3E3FD] focus:outline-none placeholder:text-white/20 font-mono" />
                                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E3E3FD]/40" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider text-[#E3E3FD]/60">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full bg-[#12110d] border border-white/10 rounded-sm py-2.5 px-4 text-sm text-white focus:border-[#E3E3FD] focus:outline-none placeholder:text-white/20 font-mono" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider text-[#E3E3FD]/60">CVC</label>
                                    <input type="text" placeholder="123" className="w-full bg-[#12110d] border border-white/10 rounded-sm py-2.5 px-4 text-sm text-white focus:border-[#E3E3FD] focus:outline-none placeholder:text-white/20 font-mono" />
                                </div>
                            </div>
                            <button 
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#E3E3FD] text-[#12110d] font-medium py-3 rounded-sm mt-4 hover:bg-white transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {isProcessing ? <div className="w-4 h-4 border-2 border-[#12110d] border-t-transparent rounded-full animate-spin"/> : `Pay $${selectedPlan.price}`}
                            </button>
                        </form>
                    </div>
                    <button onClick={() => setStep('plans')} className="text-[#E3E3FD]/40 text-xs hover:text-[#E3E3FD] flex items-center gap-2 mx-auto">
                        ← Back to plans
                    </button>
                </div>
            )}

            {step === 'success' && (
                <div className="flex flex-col items-center justify-center text-center h-full py-12">
                    <div className="w-16 h-16 bg-[#E3E3FD] rounded-full flex items-center justify-center mb-6">
                        <Check size={32} className="text-[#12110d]" />
                    </div>
                    <h3 className="text-2xl text-white font-light mb-2">Payment Successful!</h3>
                    <p className="text-[#E3E3FD]/60 text-sm mb-8">
                        {selectedPlan.credits} credits have been added to your account.
                    </p>
                    <button 
                        onClick={onClose}
                        className="bg-[#3B3B3B] text-white px-8 py-3 rounded-sm hover:bg-[#4B4B4B] transition-colors"
                    >
                        Return to Studio
                    </button>
                </div>
            )}
        </div>

        {step === 'plans' && (
            <div className="p-6 border-t border-white/5 bg-[#12110d] flex justify-end">
                <button 
                    disabled={!selectedPlan}
                    onClick={() => setStep('payment')}
                    className="bg-[#E3E3FD] text-[#12110d] px-8 py-2.5 rounded-sm font-medium hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue to Checkout
                </button>
            </div>
        )}
      </motion.div>
    </div>
  );
};

