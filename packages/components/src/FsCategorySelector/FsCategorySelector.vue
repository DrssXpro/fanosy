<template>
  <div
    class="fs-category-container"
    v-loading="showLoading"
    element-loading-text="加载中..."
  >
    <div
      class="fs-category-item"
      v-for="(i, index) in categoryData"
      :key="index"
    >
      <div class="category-title">{{ LEVEL[index] }}</div>
      <ul class="category-list">
        <li
          v-for="(item, index) in i.data"
          :key="item.id"
          :style="i.currentIndex === index ? activeStyle : {}"
          @click="handleGetCurrentCategory(item, index)"
          :title="item.content"
        >
          {{ item.content }}
          <div class="icon" v-if="item.isMore">
            <ArrowRight />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import type { ICategoryItem, IRequestFunction } from './types';
import { LEVEL } from './constant';
import './style/index.scss';
import { CSSProperties } from 'vue';

interface ICategoryGroup {
  data: ICategoryItem[];
  currentIndex: number;
}

const props = withDefaults(
  defineProps<{
    currentColor?: string;
    currentBg?: string;
    isLoading?: boolean;
    request: IRequestFunction;
  }>(),
  {
    currentColor: '#005FCD',
    currentBg: '#E6EFFA',
    isLoading: true
  }
);

const emit = defineEmits<{
  selectCategory: [
    result: Array<Pick<ICategoryItem, 'id' | 'level' | 'content'>>
  ];
}>();

const categoryData = ref<ICategoryGroup[]>([]);
const showLoading = ref(false);

onMounted(async () => {
  showLoading.value = props.isLoading;
  const res = await props.request(1, 0);
  categoryData.value[0] = {
    data: res.data,
    currentIndex: -1
  };
  showLoading.value = false;
});

/**
 * @param item 点击的分类item项
 * @param index 点击当前分类项的index位置
 */
const handleGetCurrentCategory = async (item: ICategoryItem, index: number) => {
  // 更改 currentIndex，添加聚焦样式
  categoryData.value[item.level - 1].currentIndex = index;
  // 提前操作：删除所点击层级分类的的后续分类数据
  categoryData.value.splice(item.level, categoryData.value.length - item.level);
  if (item.isMore !== false && !item.children.length) {
    showLoading.value = props.isLoading;
    const res = await props.request(item.level + 1, item.id);
    // 成功获取下一级分类数据
    if (res.success) {
      // 下一级分类数据存在
      if (res.data.length) {
        item.children = res.data;
        item.isMore = true;
      } else {
        // 分类数据不存在，更改标志
        item.isMore = false;
      }
    }
    showLoading.value = false;
  }
  // 通过标志判断存在孩子节点，直接使用孩子节点数据
  if (item.isMore !== false) {
    categoryData.value[item.level] = {
      data: item.children,
      currentIndex: -1
    };
  }
  // 判断已经没有分类数据，则发送选择结果
  if (item.isMore === false) {
    emit('selectCategory', handleGetSelect());
  }
};

// 拿到选择类目的所有结果
const handleGetSelect = () => {
  return categoryData.value.map((i) => {
    const item = i.data.find((_, index) => index === i.currentIndex)!;
    return {
      id: item.id,
      level: item.level,
      content: item.content
    };
  });
};

const activeStyle = computed<CSSProperties>(() => ({
  color: props.currentColor,
  backgroundColor: props.currentBg,
  fontWeight: 600
}));
</script>
