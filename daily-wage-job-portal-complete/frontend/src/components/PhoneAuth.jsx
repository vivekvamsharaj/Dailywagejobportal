import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase';
import { useTranslation } from 'react-i18next';

const PhoneAuth = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [expandForm, setExpandForm] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setupRecaptcha();
      const formattedNumber = `+91${phoneNumber.trim()}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setExpandForm(true);
    } catch (err) {
      alert('Error sending OTP: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      onLoginSuccess(result.user);
    } catch (err) {
      alert('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
      {!expandForm ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <label className="block text-sm font-medium">{t('enter_mobile')}</label>
          <div className="flex">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l font-bold">+91</span>
            <input 
              type="tel" 
              maxLength="10"
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="9876543210" 
              required
              className="flex-1 p-2 border rounded-r text-lg"
            />
          </div>
          <div id="recaptcha-container"></div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 text-white font-bold rounded">
            {loading ? "..." : t('get_otp')}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input 
            type="text" 
            maxLength="6"
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            placeholder="123456" 
            required
            className="w-full p-3 border rounded text-center text-2xl tracking-widest"
          />
          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded">
            {loading ? "..." : t('verify_otp')}
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneAuth;
