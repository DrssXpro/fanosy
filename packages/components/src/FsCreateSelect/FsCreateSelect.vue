<template>
  <el-select v-model="selectContent" @change="handleSelect">
    <div :class="ns.e('add-box')">
      <el-input
        v-model="addValue"
        placeholder="输入添加新的选项"
        @keydown.enter="handleAddOption"
      ></el-input>
      <el-button type="primary" @click="handleAddOption">添加</el-button>
    </div>
    <el-option
      v-for="i in optionsList"
      :key="i.value"
      :label="i.label"
      :value="`${i.value}-${i.label}`"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNameSpace } from '@fanosy/use';
import { nanoid } from 'nanoid';
import { ISelectOptions } from './types';
import './style/index.scss';

defineOptions({
  name: 'fs-create-select'
});

const props = defineProps<{
  options: ISelectOptions[];
  modelValue: any;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: any];
}>();

const ns = useNameSpace('create-select');

const selectContent = ref<string | string[]>(props.modelValue);

const optionsList = ref<ISelectOptions[]>(props.options);

const addValue = ref('');

// 添加新选项
const handleAddOption = () => {
  optionsList.value.unshift({
    value: nanoid(6),
    label: addValue.value.trim()
  });
  addValue.value = '';
};

// 选择
const handleSelect = (value: string | string[]) => {
  emit(
    'update:modelValue',
    typeof value === 'string'
      ? { value: value.split('-')[0], label: value.split('-')[1] }
      : handleMultiResult(value)
  );
};

// 处理多选
const handleMultiResult = (value: string[]) => {
  return value.map((i) => ({
    value: i.split('-')[0],
    label: i.split('-')[1]
  }));
};
</script>
