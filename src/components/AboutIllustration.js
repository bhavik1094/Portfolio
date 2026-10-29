import React, { useCallback, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import devAnimation from '../assets/dev-lottie.json';

// Decorative media is loaded only as About approaches the viewport. The parent
// reserves its dimensions, so loading the player never shifts the biography.
const AboutIllustration = ({ reducedMotion, visible }) => {
  const animationRef = useRef(null);
  const syncPlayback = useCallback(() => {
    // The animation starts with zero-scale layers. Frame 60 is fully revealed.
    if (reducedMotion || !visible) animationRef.current?.goToAndStop(60, true);
    else animationRef.current?.play();
  }, [reducedMotion, visible]);

  useEffect(syncPlayback, [syncPlayback]);

  return <Lottie lottieRef={animationRef} animationData={devAnimation}
    loop={!reducedMotion} autoplay={false} onDOMLoaded={syncPlayback} />;
};

export default AboutIllustration;
