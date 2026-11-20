import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request Google Forms and Drive scopes
provider.addScope('https://www.googleapis.com/auth/forms.body');
provider.addScope('https://www.googleapis.com/auth/forms.body.readonly');
provider.addScope('https://www.googleapis.com/auth/forms.responses.readonly');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/drive.readonly');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Google Forms API Helpers
export interface CreatedFormInfo {
  formId: string;
  responderUri: string;
  editUri: string;
  title: string;
}

const STORAGE_FORM_KEY = 'ecogram_created_google_form_v1';

export function getSavedFormInfo(): CreatedFormInfo | null {
  try {
    const saved = localStorage.getItem(STORAGE_FORM_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error reading saved form info", e);
  }
  return null;
}

export function saveFormInfo(info: CreatedFormInfo): void {
  try {
    localStorage.setItem(STORAGE_FORM_KEY, JSON.stringify(info));
  } catch (e) {
    console.error("Error saving form info", e);
  }
}

export async function createGoogleFeedbackForm(accessToken: string): Promise<CreatedFormInfo> {
  // 1. Create the Google Form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title: 'Morgaon Digras Villager Feedback & Complaint Form',
        documentTitle: 'EcoGram Feedback & Complaint Form',
      },
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Form: ${createRes.status} ${errText}`);
  }

  const formData = await createRes.json();
  const formId = formData.formId;
  const responderUri = formData.responderUri;
  const editUri = `https://docs.google.com/forms/d/${formId}/edit`;

  // 2. Add batch update requests to add questions: Name, Complaint/Feedback, Photo/Picture
  const batchRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          createItem: {
            item: {
              title: 'Your Full Name',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: { paragraph: false },
                },
              },
            },
            location: { index: 0 },
          },
        },
        {
          createItem: {
            item: {
              title: 'Complaint or Feedback Details',
              description: 'Please describe your grievance, suggestion, or request regarding village development.',
              questionItem: {
                question: {
                  required: true,
                  textQuestion: { paragraph: true },
                },
              },
            },
            location: { index: 1 },
          },
        },
        {
          createItem: {
            item: {
              title: 'Photo / Picture Attachment (Image URL or description)',
              description: 'Provide an image link or note supporting your complaint/feedback.',
              questionItem: {
                question: {
                  required: false,
                  textQuestion: { paragraph: false },
                },
              },
            },
            location: { index: 2 },
          },
        },
      ],
    }),
  });

  if (!batchRes.ok) {
    console.warn("Form created but batch update questions encountered issues, proceeding with base form.");
  }

  const info: CreatedFormInfo = {
    formId,
    responderUri: responderUri || `https://docs.google.com/forms/d/${formId}/viewform`,
    editUri,
    title: 'Morgaon Digras Villager Feedback & Complaint Form',
  };

  saveFormInfo(info);
  return info;
}
