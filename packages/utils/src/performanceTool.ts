// 防抖
export function debounce(fn: (...args: any[]) => void, delay: number = 300) {
  let timer: NodeJS.Timer | null = null;
  return function (this: any, ...args: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 时间戳节流
export function throttle(fn: (...args: any[]) => void, delay: number = 300) {
  let start = 0;
  return function (this: any, ...args: any[]) {
    const now = Date.now();
    if (now - start >= delay) {
      start = now;
      fn.apply(this, args);
    }
  };
}

// requestAnimationFrame节流，优化动画
export function rafThrottle(fn: (...args: any[]) => void) {
  let lock = false;
  return function (this: any, ...args: any[]) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      lock = false;
    });
  };
}
