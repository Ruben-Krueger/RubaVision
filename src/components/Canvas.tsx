import React, { useEffect } from 'react';
import sketch from '../lib/sketch';
import p5 from 'p5';

export default function Canvas(): JSX.Element {
  useEffect(() => {
    new p5(sketch, document.getElementById('sketch') ?? undefined);

    return () => {
      document.getElementById('sketch')?.remove();
    };
  }, []);

  return <div id="sketch"></div>;
}

// Hi Ruben! This is looking great! One suggestion would be for a menu option to choose the location of the circle.
// In the example you sent, the big circle moves around locations, which is fine (and is what I had originally described),
// but during James’ clinical trial, the circle was in a static location (i.e. top left part of his visual field).
// Maybe you could insert a menu option to choose the location of the big circle as like XY coordinates?
// But then if you *do* have the big circle move around as you showed, it would be cool to have the scoring part
// indicate the location of incorrect / correct answers in the XY field.
// I’m picturing almost like a heat map where one color indicates passes and another color indicates misses.
// If the big circle moves around and you have a bunch of trials, it should be able to spit out some data….
// That we could then download and track over time 😊 Happy to talk in person if that was confusing.
// This is amazing though Ruben, thanks for taking the time to work on it.
