<template>
  <div class="fs-message-box-container">
    <Transition name="mask">
      <div class="fs-message-box__mask" v-show="state.isShow"></div>
    </Transition>
    <Transition name="box">
      <div class="fs-message-box__content" v-show="state.isShow">
        <div class="message-box-container">
          <div class="message-box-title">{{ state.title }}</div>
          <div class="message-box-content">{{ state.content }}</div>
          <div class="operator">
            <div class="confirm btn" @click="onConfirm('confirm')">确定</div>
            <div class="cancel btn" @click="onConfirm('cancel')">取消</div>
          </div>
          <el-icon class="message-box-icon" @click="onConfirm('cancel')">
            <Close
          /></el-icon>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { IMessageBoxProps } from './types';
import { Close } from '@element-plus/icons-vue';
import './style/index.scss';

defineOptions({
  inheritAttrs: false
});

const state = reactive({
  title: '',
  content: '',
  isShow: false,
  beforeClose: (() => true) as Required<IMessageBoxProps>['beforeClose'],
  promise: null as null | {
    resolve: (v: boolean) => void;
    reject: () => void;
  }
});

// 操作状态
const onConfirm = async (type: 'cancel' | 'confirm') => {
  const needClose = await state.beforeClose();
  if (needClose) {
    state.isShow = false;
    switch (type) {
      case 'confirm': {
        state.promise!.resolve(true);
        break;
      }
      case 'cancel': {
        state.promise!.reject();
        break;
      }
    }
  }
};

// 初始化message-box内容
const init = (props: IMessageBoxProps) => {
  if (props) {
    state.title = props.title;
    state.content = props.content;
    state.isShow = true;
    props.beforeClose && (state.beforeClose = props.beforeClose);
  }
  // 通过Promise控制message-box cancel / confirm状态
  return new Promise<boolean>((resolve, reject) => {
    state.promise = { resolve, reject };
  });
};

defineExpose({
  init
});
</script>
