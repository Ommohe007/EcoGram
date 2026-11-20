import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as fbSignOut, User } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://mail.google.com/profile');
provider.addScope('https://www.googleapis.com/auth/userinfo.email');

let cachedAccessToken: string | null = null;

export async function googleSignInForPanchayatWorker(): Promise<{ user: User; accessToken: string } | null> {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const user = result.user;

  if (user.email !== 'moheom8@gmail.com') {
    await fbSignOut(auth);
    throw new Error('Access Denied: Only Panchayat Worker (moheom8@gmail.com) is authorized to access the Admin Portal.');
  }

  if (credential?.accessToken) {
    cachedAccessToken = credential.accessToken;
  }

  return { user, accessToken: cachedAccessToken || '' };
}

export async function sendOtpViaGmail(accessToken: string, recipientEmail: string, otpCode: string): Promise<boolean> {
  const subject = "EcoGram Panchayat Portal - OTP Verification Code";
  const body = `Namaste,\n\nYour 6-digit OTP verification code for EcoGram Panchayat Portal (Morgaon Digras) is: ${otpCode}\n\nValid for 10 minutes. Do not share this code with anyone.\n\nRegards,\nGram Panchayat Morgaon Digras`;

  const rawMessage = [
    `To: ${recipientEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    "Content-Type: text/plain; charset=utf-8",
    "MIME-Version: 1.0",
    "",
    body
  ].join("\r\n");

  const encodedMessage = btoa(unescape(encodeURIComponent(rawMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: encodedMessage
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Failed to send Gmail OTP:", errText);
    throw new Error("Failed to send OTP via Gmail API.");
  }

  return true;
}

export async function logoutPanchayatWorker() {
  await fbSignOut(auth);
  cachedAccessToken = null;
}
