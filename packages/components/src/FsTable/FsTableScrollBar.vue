<template>
  <div class="fs-table-scrollbar" @mouseenter="handleComputedScrollbar">
    <el-scrollbar>
      <div class="fs-table-scrollbar-content" ref="contentRef">
        <slot></slot>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue';
import { ITableScrollbarProps } from './types';
import { debounce, rafThrottle } from '@fanosy/utils';
import './style/scrollbar.scss';

const props = withDefaults(defineProps<ITableScrollbarProps>(), {
  headerSticky: false,
  bottom: 10,
  scrollDelay: 300
});

// 水平滚动条 DOM
const scrollHorizontalEl = ref<HTMLDivElement>();

// 获取容器插槽 DOM
const contentRef = ref<HTMLDivElement>();

// 查找滚动容器
const scrollContainer = ref<Element>();

const tableRect = reactive({
  width: 0,
  height: 0,
  offsetLeft: 0,
  offsetTop: 0
});

const isBottom = ref(false);

const delay = ref(300);

// 挂载前规范 delay
onBeforeMount(() => {
  delay.value =
    props.scrollDelay < 200 || props.scrollDelay > 1000
      ? 300
      : props.scrollDelay;
});

onMounted(() => {
  init();
});

onUnmounted(() => {
  destory();
});

const init = () => {
  initScroll(true);
  findScrollElement();

  bindEvent();
};

const destory = () => {
  scrollContainer.value?.removeEventListener('scroll', handleComputedScrollbar);
  scrollContainer.value?.removeEventListener('scroll', handleComputedFixHead);
};

const bindEvent = () => {
  scrollContainer.value?.addEventListener('scroll', handleComputedFixHead);
  scrollContainer.value?.addEventListener('scroll', handleComputedScrollbar);
};

const initScroll = (isFirst: boolean) => {
  if (props.isFixed && isFirst) {
    // key: 初次渲染 nextTick 无法拿到el-table最终渲染的高度，在宏任务获取DOM
    setTimeout(() => {
      handleGetTableInfo();
    }, 0);
  } else if (props.isFixed && !isFirst) {
    // 初次如果是异步未找到滚动元素，则 table 的具体信息也会找不到，需要重新获取，并且无需宏任务（DOM已渲染）
    handleGetTableInfo();
  }

  function handleGetTableInfo() {
    const slotEl = contentRef.value?.children[0] as any;
    const rect = slotEl.getBoundingClientRect();
    tableRect.height = rect.height;
    tableRect.width = rect.width;
    tableRect.offsetLeft = rect.left;
    tableRect.offsetTop = tableRect.offsetTop ? tableRect.offsetTop : rect.top; // 第一次获取之后不再改变
    if (!scrollHorizontalEl.value) {
      scrollHorizontalEl.value = contentRef.value!.querySelector(
        '.fs-table-scrollbar  .is-horizontal'
      )! as HTMLDivElement;
    }
  }
};

// 鼠标进入滚动
const handleComputedScrollbar = debounce(() => {
  // 滚动时判断：可能存在异步情况scrollContainer没有找到，因此滚动时再次寻找
  if (!scrollContainer.value) {
    findScrollElement();
    bindEvent();
  }
  initScroll(false);
  const clientHeight = scrollContainer.value?.clientHeight || 0;
  const scrollTop = scrollContainer.value?.scrollTop || 0;
  isBottom.value = scrollTop + clientHeight >= tableRect.height;
  resetScrollbar();
}, delay.value);

// 重置水平滚动条样式，固定在视口下方，而不是表格底部
const resetScrollbar = () => {
  if (scrollHorizontalEl.value) {
    // 判断是否已滚动到底部，已到达底部则需要将滚动条还原至表格底部
    if (!isBottom.value) {
      scrollHorizontalEl.value.style.display = 'none';
      const computedBottom =
        document.documentElement.clientHeight -
        ((scrollContainer.value?.clientHeight || 0) + tableRect.offsetTop);
      scrollHorizontalEl.value.style.position = `fixed`;
      scrollHorizontalEl.value.style.width = `${tableRect.width}px`;
      scrollHorizontalEl.value.style.left = `${tableRect.offsetLeft}px`;
      scrollHorizontalEl.value.style.bottom = `${
        computedBottom + props.bottom
      }px`;
      scrollHorizontalEl.value.style.display = '';
    } else {
      scrollHorizontalEl.value.style.width = '';
      scrollHorizontalEl.value.style.position = '';
      scrollHorizontalEl.value.style.left = '';
      scrollHorizontalEl.value.style.bottom = '';
      scrollHorizontalEl.value.style.display = '';
    }
  }
};

// 根据滚动重新计算头部位置，始终固定
const handleComputedFixHead = rafThrottle(() => {
  const headEl = contentRef.value!.querySelector(
    '.el-table__header-wrapper'
  ) as HTMLDivElement;
  if (scrollContainer.value?.scrollTop !== 0) {
    headEl.style.top = `${scrollContainer.value?.scrollTop}px`;
    headEl.style.boxShadow = `0 2px 10px rgba(0, 0, 0, 0.1)`;
    headEl.style.zIndex = '2';
  } else {
    headEl.style.boxShadow = `none`;
    headEl.style.zIndex = '0';
  }
});

// 从该组件开始向上寻找是否存在一个具有滚动条的元素
const findScrollElement = () => {
  const el = contentRef.value!;
  const parent = el?.parentElement;
  if (parent) {
    findScrollParent(parent);
  }
  // 递归向上查找滚动元素
  function findScrollParent(el: any) {
    if (!el) return null;

    if (el.scrollHeight > el.clientHeight) {
      scrollContainer.value = el;

      return;
    }
    findScrollParent(el.parentElement);
  }
};
</script>
