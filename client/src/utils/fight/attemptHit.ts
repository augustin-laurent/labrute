import { AttemptHitStep, FIGHTER_HEIGHT, FIGHTER_WIDTH, weapons } from '@labrute/core';

import { BevelFilter } from '@pixi/filter-bevel';
import { Easing, Tweener } from 'pixi-tweener';
import { Application, Sprite } from 'pixi.js';
import findFighter, { AnimationFighter } from './findFighter';

const attemptHit = async (
  app: Application,
  fighters: AnimationFighter[],
  step: AttemptHitStep,
  speed: React.MutableRefObject<number>,
) => {
  if (!app.loader) {
    return;
  }
  const { loader: { resources: { '/images/game/misc.json': { spritesheet } } } } = app;

  if (!spritesheet) {
    throw new Error('Spritesheet not found');
  }

  const fighter = findFighter(fighters, step.fighter);
  if (!fighter) {
    throw new Error('Fighter not found');
  }

  const target = findFighter(fighters, step.target);
  if (!target) {
    throw new Error('Target not found');
  }

  // Custom animation for brutes
  const animation = step.fighter.type === 'brute'
    ? weapons.find((w) => w.name === step.weapon)?.animation || 'fist'
    : 'attack';

  const hitTriggered = fighter.animation.waitForEvent(`${animation}:hit`);
  const animationEnded = fighter.animation.waitForEvent(`${animation}:end`);

  // Set animation to the correct hitting animation
  fighter.animation.setAnimation(animation);

  // Wait for animation to hit
  await hitTriggered;

  animationEnded.then(() => {
    // Set animation to `idle`
    fighter.animation.setAnimation('idle');
  }).catch(console.error);

  // Handle shield breaking
  if (step.brokeShield) {
    target.animation.shield = false;

    // Create trashed shield sprite
    const trashedShield = new Sprite(spritesheet.textures['shield.png']);
    trashedShield.filters = [new BevelFilter()];
    trashedShield.zIndex = 1;

    // Anchor to left center
    trashedShield.anchor.set(0, 0.5);

    // Set position
    trashedShield.position.set(
      target.animation.team === 'left'
        ? target.animation.container.x + FIGHTER_WIDTH.brute / 4
        : target.animation.container.x + FIGHTER_WIDTH.brute * 0.75,
      target.animation.container.y - FIGHTER_HEIGHT.brute * 0.5,
    );

    // Set angle
    trashedShield.angle = target.animation.team === 'left' ? -110 : 70;

    // Add to stage
    app.stage.addChild(trashedShield);

    // Animate the fall
    Tweener.add({
      target: trashedShield,
      duration: 0.3 / speed.current,
      ease: Easing.linear,
    }, {
      x: target.animation.team === 'left'
        ? trashedShield.x - 20
        : trashedShield.x + 20,
      y: trashedShield.y + 50,
      angle: target.animation.team === 'left' ? -180 : 0,
    }).then(() => {
      // Wait a bit
      setTimeout(() => {
        // Decrease opacity
        Tweener.add({
          target: trashedShield,
          duration: 0.5 / speed.current,
          ease: Easing.linear,
        }, {
          alpha: 0,
        }).then(() => {
          // Remove from stage
          app.stage.removeChild(trashedShield);
        }).catch(console.error);
      }, 500 / speed.current);
    }).catch(console.error);
  }
};

export default attemptHit;