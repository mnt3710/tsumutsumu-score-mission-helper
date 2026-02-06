import { describe, it, expect } from 'vitest';
import { getLevelBonusRate } from '../utils/levelBonus';

describe('getLevelBonusRate', () => {
  it('returns correct rates for sample levels', () => {
    expect(getLevelBonusRate(1)).toBe(0);
    expect(getLevelBonusRate(3)).toBeCloseTo(0.01);
    expect(getLevelBonusRate(10)).toBeCloseTo(0.05);
    expect(getLevelBonusRate(150)).toBeCloseTo(0.25);
    expect(getLevelBonusRate(706)).toBeCloseTo(0.293);
  });
});