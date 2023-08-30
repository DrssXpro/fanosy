<template>
  <div :class="ns.e('container')" :style="{ backgroundColor: props.bgColor }">
    <div :class="ns.e('search')">
      <div class="search-container" ref="searchContentRef">
        <slot name="search" ref="test"></slot>
      </div>
      <div class="search-group">
        <div
          :class="ns.em('search', 'expand-button')"
          v-if="isShowFold"
          @click="handleFold"
        >
          <span>{{ isFold ? '展开' : '收起' }}</span>
          <el-icon>
            <CaretBottom v-if="isFold" />
            <CaretTop v-else />
          </el-icon>
        </div>
        <el-button
          type="primary"
          :class="ns.em('search', 'action-button')"
          @click="emit('search')"
          >查询</el-button
        >
        <el-button
          type="success"
          :class="ns.em('search', 'action-button')"
          @click="emit('reset')"
          v-if="props.showReset"
          >重置</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, useSlots } from 'vue';
import { CaretTop, CaretBottom } from '@element-plus/icons-vue';
import { useResizeListener, useNameSpace } from '@fanosy/use';
import { rafThrottle } from '@fanosy/utils';
import './style/container.scss';

defineOptions({
  name: 'fs-search-container'
});

const slots = useSlots();
const instance = getCurrentInstance() as any;
const props = withDefaults(
  defineProps<{
    showReset?: boolean;
    itemWidth?: number;
    bgColor?: string;
  }>(),
  {
    showReset: false,
    itemWidth: 230,
    bgColor: '#f9f9f9'
  }
);
const emit = defineEmits<{
  search: [];
  reset: [];
}>();

const ns = useNameSpace('form');

const test = ref<any>();
const searchContentRef = ref<HTMLDivElement>();

// 监听容器大小变化，重新计算 lineCount，控制展示效果
useResizeListener(searchContentRef, rafThrottle(handleResize));

// 单行最多容纳 item 数量
const lineCount = ref(0);

// slot个数：item 总数量
const slotsCount = computed(() => (slots.search ? slots.search().length : 0));

const isShowFold = computed(
  () => slots.search && slots.search().length > lineCount.value
);

const isFold = ref(true);

onMounted(() => {
  computedlineCount();
  hiddenItems();
});

// 计算每行最多容纳量
const computedlineCount = () => {
  lineCount.value = searchContentRef.value
    ? Math.floor(searchContentRef.value.clientWidth / (props.itemWidth + 20))
    : 0;
};

function handleResize() {
  computedlineCount();
  showItems();
  isFold.value && hiddenItems();
}

// 隐藏剩下的 item 项
const hiddenItems = () => {
  if (lineCount.value < slotsCount.value) {
    for (let i = lineCount.value; i < slotsCount.value; i++) {
      instance.controlItem[i].hidden();
    }
  }
};

// 显示所有项
const showItems = () => {
  instance.controlItem.forEach((i: any) => {
    i.show();
  });
};

// 处理折叠逻辑
const handleFold = () => {
  isFold.value = !isFold.value;

  isFold.value ? hiddenItems() : showItems();
};
</script>
