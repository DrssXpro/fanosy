import { Ref, onMounted, onUnmounted, unref } from 'vue';

function useResizeListener(
  el: Ref<HTMLDivElement | undefined>,
  cb: ResizeObserverCallback
) {
  let ob: ResizeObserver | null;

  const startObserve = () => {
    const element = unref(el);
    if (element && !ob) {
      ob = new ResizeObserver(cb);
      ob.observe(element);
    }
  };

  const endObserve = () => {
    ob!.disconnect();
    ob = null;
  };

  onMounted(() => {
    startObserve();
  });

  onUnmounted(() => {
    endObserve();
  });
}

export { useResizeListener };
