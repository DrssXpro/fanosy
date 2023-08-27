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
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/option/style/css';
const props = defineProps<{
  title: string;
  options: IOptions;
}>();

const emit = defineEmits<{
  selectChange: [value: string];
  clearSelect: [];
}>();

const selectValue = ref('');

const handleSelectChange = (value: string) => {
  emit('selectChange', value);
};
</script>
