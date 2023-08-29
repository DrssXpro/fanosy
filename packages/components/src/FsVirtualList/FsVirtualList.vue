<template>
  <div :class="ns.e('content')" ref="contentRef">
    <div :class="ns.e('list')" :style="scrollStyle">
      <div
        :class="ns.e('list-item')"
        :style="{ width: '100%', height: `${props.itemHeight}px` }"
        v-for="i in renderList"
        :key="i.id"
      >
        <slot name="item" :item="i"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  reactive,
  computed,
  CSSProperties,
  onUnmounted,
  watch
} from 'vue';
import type { IVirtuallistItem, IVirtuallistProps } from './types';
import { rafThrottle } from '@fanosy/utils';
import { useNameSpace } from '@fanosy/use';
import './style/index.scss';

defineOptions({
  name: 'fs-virtuallist'
});

const props = defineProps<IVirtuallistProps>();

const emit = defineEmits<{
  getMoreData: [];
}>();

defineSlots<{
  item(props: { item: IVirtuallistItem }): any;
}>();

const ns = useNameSpace('virtuallist');

const contentRef = ref<HTMLDivElement>();

const state = reactive({
  startIndex: 0,
  viewHeight: 0
});

// 容器容纳最大item数量
const maxCount = computed(
  () => Math.ceil(state.viewHeight / props.itemHeight) + 1
);

// endIndex 计算
const endIndex = computed(() =>
  Math.min(state.startIndex + maxCount.value, props.dataSource.length - 1)
);

// 渲染item视图列表
const renderList = computed(() =>
  props.dataSource.slice(state.startIndex, endIndex.value)
);

// 滚动样式设置
const scrollStyle = computed(
  () =>
    ({
      height: `${
        props.itemHeight * (props.dataSource.length - state.startIndex)
      }px`,
      transform: `translate3d(0, ${props.itemHeight * state.startIndex}px, 0)`
    }) as CSSProperties
);

// 加载更多数据
watch(
  () => endIndex.value,
  (newValue) => {
    if (newValue >= props.dataSource.length - 1) {
      emit('getMoreData');
    }
  }
);

// 滚动事件：动态计算 startIndex
const handleScroll = rafThrottle(() => {
  const { scrollTop } = contentRef.value!;
  state.startIndex = Math.floor(scrollTop / props.itemHeight);
});

// resize事件：动态计算 viewHeight
const handleResize = rafThrottle(() => {
  state.viewHeight = contentRef.value ? contentRef.value.offsetHeight : 0;
});

const init = () => {
  contentRef.value && contentRef.value.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  handleResize();
};

const destory = () => {
  contentRef.value &&
    contentRef.value.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  destory();
});
</script>
