<template>
  <div class="test-container">
    <fs-create-select v-model="value" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { FsCreateSelect } from '@fanosy/components';
import { ref } from 'vue';

const value = ref('');

const options = [
  {
    label: 'test1',
    value: '1'
  },
  {
    label: 'test2',
    value: '2'
  },
  {
    label: 'test3',
    value: '3'
  }
];
</script>

<style scoped lang="scss">
.test-container {
  margin: 0 auto;
  width: 90vw;
  height: 90vh;
  border: 1px solid red;
  box-sizing: border-box;
  padding: 10px;
}
</style>
