import Button from "@components/Button";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "@firebase/auth";
import React from "react";

import { AuthModalState } from "./AuthModal";

export interface GoogleSignInViewProps {
  pageState: AuthModalState;
}
export function GoogleSignInView({
  pageState,
}: GoogleSignInViewProps): JSX.Element {
  const auth = getAuth();

  // Implement Google Sign In with OAuth token
  const handleSignInWithGoogle = () => {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (chrome.runtime.lastError || !token) {
        console.log(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`)

        return
      }
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then(res => {
          console.log('signed in!', res)
        })
        .catch(err => {
          console.log(`SSO ended with an error: ${err}`)
        })
    })
  }

  return <Button
    className='mt-6 text-white' // TODO: Get google icon
    iconName='Bell'
    label={pageState === AuthModalState.SignInView ? 'sign in with google' : 'sign up with google'}
    onClick={handleSignInWithGoogle} />;
}
