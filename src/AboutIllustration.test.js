import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { vi } from 'vitest';
import AboutIllustration from './components/AboutIllustration';

const player = vi.hoisted(() => ({ props: null }));
vi.mock('lottie-react', () => ({ default: (props) => {
  player.props = props;
  return <div />;
} }));

afterEach(() => { cleanup(); player.props = null; });

const finishLoading = () => {
  const controls = { play: vi.fn(), goToAndStop: vi.fn() };
  player.props.lottieRef.current = controls;
  act(() => player.props.onDOMLoaded());
  return controls;
};

test('a late-loaded illustration remains visible and static for reduced motion', () => {
  render(<AboutIllustration reducedMotion visible />);
  const controls = finishLoading();
  expect(controls.goToAndStop).toHaveBeenCalledWith(60, true);
  expect(controls.play).not.toHaveBeenCalled();
  expect(player.props.autoplay).toBe(false);
  expect(player.props.loop).toBe(false);
});

test('the illustration plays only while visible and stops when motion is reduced', () => {
  const view = render(<AboutIllustration reducedMotion={false} visible={false} />);
  const controls = finishLoading();
  expect(controls.goToAndStop).toHaveBeenLastCalledWith(60, true);
  expect(controls.play).not.toHaveBeenCalled();

  view.rerender(<AboutIllustration reducedMotion={false} visible />);
  expect(controls.play).toHaveBeenCalledTimes(1);

  controls.goToAndStop.mockClear();
  view.rerender(<AboutIllustration reducedMotion visible />);
  expect(controls.goToAndStop).toHaveBeenCalledWith(60, true);
  expect(controls.play).toHaveBeenCalledTimes(1);
});
