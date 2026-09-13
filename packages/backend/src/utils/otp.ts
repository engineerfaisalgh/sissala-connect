import { randomBytes } from 'crypto';

export interface OTPRecord {
  phone: string;
  code: string;
  expiresAt: Date;
  attempts: number;
}

const otpStore = new Map<string, OTPRecord>();

const OTP_LENGTH = parseInt(process.env.OTP_LENGTH || '6');
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '10');
const OTP_MAX_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS || '5');

export const generateOTP = (phone: string): string => {
  const code = String(Math.floor(Math.random() * Math.pow(10, OTP_LENGTH)));
  const paddedCode = code.padStart(OTP_LENGTH, '0');
  
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

  otpStore.set(phone, {
    phone,
    code: paddedCode,
    expiresAt,
    attempts: 0,
  });

  return paddedCode;
};

export const verifyOTP = (phone: string, code: string): boolean => {
  const record = otpStore.get(phone);

  if (!record) {
    return false;
  }

  if (record.expiresAt < new Date()) {
    otpStore.delete(phone);
    return false;
  }

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    otpStore.delete(phone);
    return false;
  }

  if (record.code !== code) {
    record.attempts++;
    return false;
  }

  otpStore.delete(phone);
  return true;
};

export const getOTPAttempts = (phone: string): number => {
  return otpStore.get(phone)?.attempts || 0;
};
