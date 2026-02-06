/**
 * クラス名を結合するユーティリティ関数
 * clsx と同様の機能を提供
 */

type ClassValue = string | undefined | null | false | ClassValue[];

/**
 * 複数のクラス名を結合する
 * falsy な値は無視される
 * 
 * @example
 * cn('foo', 'bar') // => 'foo bar'
 * cn('foo', false && 'bar', 'baz') // => 'foo baz'
 * cn(['foo', 'bar'], 'baz') // => 'foo bar baz'
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    }
  }
  
  return classes.join(' ');
}

/**
 * 条件に応じてクラス名を返す
 * 
 * @example
 * conditionalClass(isActive, 'active', 'inactive') // isActive ? 'active' : 'inactive'
 */
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass: string = ''
): string {
  return condition ? trueClass : falseClass;
}
