import { describe, it, expect } from 'vitest';
import { finalScoreFromBase, baseScoreFromTsum, isFinalLastDigitTarget } from '../utils/calculators';

describe('calculators', () => {
  it('computes final score with floor rounding', () => {
    const base = 1000;
    const final = finalScoreFromBase(base, 3); // level 3 -> 1%
    expect(final).toBe(Math.floor(1000 * 1.01));
  });

  it('base from tsum works', () => {
    expect(baseScoreFromTsum(50, 3)).toBe(50 * 3 + 300);
  });

  it('last digit check works', () => {
    const base = 1234;
    const level = 10; // 5%
    const final = finalScoreFromBase(base, level);
    const digit = final % 10;
    expect(isFinalLastDigitTarget(base, level, digit)).toBe(true);
  });
});