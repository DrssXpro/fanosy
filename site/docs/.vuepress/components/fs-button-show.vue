<template>
  <div class="button-container">
    <div class="button-line">
      <fs-button type="primary" :time="1000" throttle @click="handleClick"
        >节流~
      </fs-button>
      <fs-button type="danger" :time="1000" debounce @click="handleClick"
        >防抖~
      </fs-button>
      <fs-button type="success" :time="1000" @click="handleClick"
        >无效果
      </fs-button>
      <fs-button type="info" :time="1000" @click="handleClick"
        >无效果
      </fs-button>
    </div>
    <div class="button-line">
      <fs-button type="primary" plain :time="1000" throttle @click="handleClick"
        >节流~
      </fs-button>
      <fs-button type="danger" plain :time="1000" debounce @click="handleClick"
        >防抖~
      </fs-button>
      <fs-button type="success" plain :time="1000" @click="handleClick"
        >无效果
      </fs-button>
      <fs-button type="info" :time="1000" plain @click="handleClick"
        >无效果
      </fs-button>
    </div>
    <div class="button-line">
      <fs-button type="primary" round :time="1000" throttle @click="handleClick"
        >节流~
      </fs-button>
      <fs-button type="danger" round :time="1000" debounce @click="handleClick"
        >防抖~
      </fs-button>
      <fs-button type="success" round :time="1000" @click="handleClick"
        >无效果
      </fs-button>
      <fs-button type="info" round :time="1000" @click="handleClick"
        >无效果
      </fs-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FsButton } from 'fanosy';
// 二次封装element-plus: 需手动导入样式或全局导入
import 'element-plus/es/components/button/style/css';
const handleClick = () => {
  console.log('点击事件');
};
</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
