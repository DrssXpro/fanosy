<template>
  <el-select
    v-model="selectValue"
    :placeholder="props.title"
    clearable
    @change="handleSelectChange"
    @clear="emit('clearSelect')"
  >
    <el-option
      v-for="i of props.options"
      :key="i.id"
      :label="i.name"
      :value="`${i.id}-${i.name}`"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import type { IOptions } from './types';

defineOptions({
  name: 'fs-selector'
});

const props = defineProps<{
  title: string;
  options: IOptions;
}>();

const emit = defineEmits<{
  selectChange: [value: string];
  clearSelect: [];
}>();

const selectValue = ref('');

const clearSelect = () => (selectValue.value = '');

const handleSelectChange = (value: string) => {
  emit('selectChange', value);
};

defineExpose({
  clearSelect
});
</script>
