export {};

declare global {
  interface NumberConstructor {
    toArray(num:number): Array<number> | null;
  }
}

Number.toArray = function(num:number) {
  return Array.from({length: num}, (v, k) => k);
}