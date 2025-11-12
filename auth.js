// auth.js - phone auth (web) using Firebase
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from './firebase.js';

export function setupRecaptcha(containerId='recaptcha-container') {
  // create invisible recaptcha verifier
  if(window.recaptchaVerifier) return window.recaptchaVerifier;
  window.recaptchaVerifier = new RecaptchaVerifier(containerId, { 'size': 'invisible' }, auth);
  return window.recaptchaVerifier;
}

export async function sendOtp(phone) {
  try {
    const verifier = setupRecaptcha();
    const confirmationResult = await signInWithPhoneNumber(auth, phone, verifier);
    // confirmationResult can be used to verify OTP
    window.confirmationResult = confirmationResult;
    return { success:true };
  } catch(err) {
    return { success:false, error: err.message || err.toString() };
  }
}

export async function verifyOtp(code) {
  try {
    const res = await window.confirmationResult.confirm(code);
    // res.user contains Firebase user
    return { success:true, user: res.user };
  } catch(err) {
    return { success:false, error: err.message || err.toString() };
  }
}
