<template>
  <div class="fs-virtual-waterfall-container">
    <div class="fs-virtual-waterfall-content" ref="contentRef">
      <div class="fs-virtual-waterfall-list" :style="contentStyle">
        <div
          class="fs-virtual-waterfall-item"
          v-for="{ item, style } in renderList"
          :key="item.id"
          :style="style"
        >
          <slot name="item" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CSSProperties,
  computed,
  markRaw,
  onMounted,
  onUnmounted,
  reactive,
  ref
} from 'vue';
import {
  IColumnQueue,
  IDataItem,
  IItemRect,
  IRenderItem,
  IVirtualWaterFallProps
} from './types';
import { debounce, rafThrottle } from '@fanosy/utils';
import './style/index.scss';

const props = withDefaults(defineProps<IVirtualWaterFallProps>(), {
  request: async () => ({ list: [], total: 0 }),
  gap: 20,
  column: 4,
  columnItemCount: 6,
  requestSize: 30
});

const emit = defineEmits<{
  finishLoadData: [];
  'update:loading': [boolean];
}>();

defineSlots<{
  item(props: { item: IDataItem }): any;
}>();

const dataState = reactive({
  loading: false,
  isFinish: false,
  currentPage: 1,
  total: 0,
  list: [] as IDataItem[]
});

const contentRef = ref<HTMLDivElement>();

const columnState = reactive({
  queue: Array(props.column)
    .fill(0)
    .map<IColumnQueue>(() => ({ list: [], height: 0 })),
  len: 0
});

const scrollState = reactive({
  viewWidth: 0,
  viewHeight: 0,
  start: 0,
  get end() {
    return this.start + this.viewHeight;
  }
});

const columnList = computed(() =>
  columnState.queue.reduce<IRenderItem[]>(
    (pre, current) => pre.concat(current.list),
    []
  )
);

const renderList = computed(() =>
  columnList.value.filter(
    (i) => i.h + i.y > scrollState.start && i.y < scrollState.end
  )
);
const itemSizeInfo = computed(() =>
  dataState.list.reduce<Map<IDataItem['id'], IItemRect>>((pre, current) => {
    const itemWidth = Math.floor(
      (scrollState.viewWidth - (props.column - 1) * props.gap) / props.column
    );
    pre.set(current.id, {
      width: itemWidth,
      height: Math.floor((itemWidth * current.height) / current.width)
    });
    return pre;
  }, new Map())
);

const computedHeight = computed(() => {
  let minIndex = 0,
    maxIndex = 0,
    minHeight = Infinity,
    maxHeight = -Infinity;
  columnState.queue.forEach(({ height }, index) => {
    if (height <= minHeight) {
      minHeight = height;
      minIndex = index;
    }
    if (height >= maxHeight) {
      maxHeight = height;
      maxIndex = index;
    }
  });

  return {
    minIndex,
    maxIndex,
    minHeight,
    maxHeight
  };
});
const contentStyle = computed(
  () => ({ height: `${computedHeight.value.maxHeight}px` }) as CSSProperties
);
const requestSize = computed(
  () => props.requestSize || props.column * props.columnItemCount
);

const hasMoreData = computed(() => columnState.len < dataState.list.length);

const loadDataList = async () => {
  if (dataState.isFinish) return;
  emit('update:loading', true);
  const { list, total } = await props.request(
    dataState.currentPage++,
    requestSize.value
  );
  if (!list.length) {
    dataState.isFinish = true;
    emit('finishLoadData');
    return;
  }
  dataState.list.push(...markRaw(list));
  dataState.total = total;
  emit('update:loading', false);
};

const addInQueue = (size = Math.floor(props.column)) => {
  for (let i = 0; i < size; i++) {
    if (!hasMoreData.value) return;
    const dataItem = dataState.list[columnState.len];
    const minIndex = computedHeight.value.minIndex;
    const currentQueue = columnState.queue[minIndex];
    const before = currentQueue.list[currentQueue.list.length - 1] || null;
    const genItem = generatorItem(dataItem, before, minIndex);
    currentQueue.list.push(genItem);
    currentQueue.height += genItem.h;
    columnState.len++;
  }
};

const generatorItem = (
  item: IDataItem,
  before: IRenderItem | null,
  index: number
): IRenderItem => {
  const rect = itemSizeInfo.value.get(item.id);
  const width = rect?.width || 0;
  const height = rect?.height || 0;
  let y = 0;
  if (before) y = before.y + before.h + props.gap;

  return markRaw({
    item,
    y,
    h: height,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate3d(${
        index === 0 ? 0 : (width + props.gap) * index
      }px, ${y}px, 0)`
    }
  });
};

const reComputedColumn = () => {
  columnState.queue = columnState.queue.map((q, index) => {
    let height = 0;
    const list = q.list.reduce<IRenderItem[]>((pre, { item }, i) => {
      const before = pre[i - 1] || null;
      const result = generatorItem(item, before, index);
      height += result.h;
      pre.push(result);
      return pre;
    }, []);

    return {
      height,
      list
    };
  });
};

const handleScroll = rafThrottle(() => {
  const { scrollTop, clientHeight } = contentRef.value!;
  scrollState.start = scrollTop;
  if (!props.loading && !hasMoreData.value) {
    loadDataList().then(() => {
      addInQueue();
    });
    return;
  }
  if (scrollTop + clientHeight > computedHeight.value.minHeight) addInQueue();
});

const handleResize = debounce(() => {
  initScrollState();
  reComputedColumn();
}, 300);

const initScrollState = () => {
  scrollState.viewWidth = contentRef.value?.clientWidth || 0;
  scrollState.viewHeight = contentRef.value?.clientHeight || 0;
  scrollState.start = contentRef.value?.scrollTop || 0;
};

const init = async () => {
  initScrollState();
  await loadDataList();
  addInQueue(requestSize.value);
  contentRef.value?.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
};

const destroy = () => {
  contentRef.value?.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  destroy();
});
</script>
