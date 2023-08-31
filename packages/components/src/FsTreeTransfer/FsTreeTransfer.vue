<template>
  <div :class="ns.b()">
    <div :class="ns.e('search')">
      <el-input
        clearable
        v-model="searchContent"
        :placeholder="$attrs.placeholder ? ($attrs.placeholder as string) : ''"
        @clear="handleClearText"
      ></el-input>
      <el-button type="primary" @click="handleSearchTree">查询</el-button>
    </div>
    <div :class="ns.e('content')">
      <div class="content-list">
        <div class="list-title">{{ props.title[0] }}</div>
        <div class="list-content">
          <el-tree
            ref="treeRef"
            :props="TreeItemProps"
            :data="treeData"
            node-key="id"
            show-checkbox
            :filter-node-method="handleFilterTreeNode"
            @check="handleTreeCheck"
          >
            <template v-slot="{ data }"
              ><div
                v-html="
                  data.isActive
                    ? setActiveText(data.label, searchContent)
                    : data.label
                "
              ></div
            ></template>
          </el-tree>
        </div>
      </div>
      <div class="content-opeartor">
        <el-button
          :type="selectList.length ? 'primary' : 'default'"
          :disabled="!selectList.length"
          :icon="ArrowRight"
          circle
          :style="{ width: '40px', height: '40px' }"
          @click="handleAddCheck"
        />
        <el-button
          :type="rightCheckList.length && checks.length ? 'primary' : 'default'"
          :disabled="!rightCheckList.length && !checks.length"
          :icon="ArrowLeft"
          circle
          :style="{ width: '40px', height: '40px', margin: 0 }"
          @click="handleBackTree"
        />
      </div>
      <div class="content-list">
        <div class="list-title">{{ props.title[1] }}</div>
        <div class="list-content">
          <el-checkbox-group class="check-item" v-model="checks">
            <el-checkbox v-for="i in checkEachs" :key="i" :label="i">
              <div class="check_label" :title="treeMap.get(i)?.value.label">
                {{ treeMap.get(i)?.value.label }}
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref, watch, computed } from 'vue';
import {
  ElInput,
  ElTree,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup
} from 'element-plus';
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue';
import { useNameSpace } from '@fanosy/use';
import type { ITreeTransferProps, ITreeItem, ICheckItem } from './types';
import './style/index.scss';

defineOptions({
  name: 'fs-tree-transfer'
});

const props = withDefaults(defineProps<ITreeTransferProps>(), {
  title: () => ['列表1', '列表2'],
  activeColor: '#f00',
  divider: '/'
});

const emit = defineEmits<{
  selectValue: [check: ICheckItem[]];
}>();

const ns = useNameSpace('tree-transfer');

const TreeItemProps = {
  label: 'label',
  children: 'children',
  disbaled: 'disabled'
};

// tree组件实例
const treeRef = ref<any>();

// 搜索内容
const searchContent = ref('');

const treeData = ref(props.dataSource);

// 扁平存储树形数据
const treeMap: Map<string | number, Ref<ITreeItem>> = new Map();

// 右侧勾选内容
const checks = ref<Array<string | number>>([]);

// 右侧勾选列表
const rightCheckList = ref<ICheckItem[]>([]);

// 右侧check遍历列表
const checkEachs = computed(() => rightCheckList.value.map((i) => i.id));

// 左侧树形结构勾选保存
const selectList = ref<ICheckItem[]>([]);

onMounted(() => {
  genTreeMap(treeData.value);
});

// 搜索逻辑
const handleSearchTree = () => {
  treeRef.value.filter(searchContent.value);
};

// 清空搜索文本时将所有节点状态设置为 unactive
const handleClearText = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, item] of treeMap) {
    item.value.isActive = false;
  }
};

watch(
  () => searchContent.value,
  (newValue) => {
    if (!newValue.length) handleClearText();
  }
);

// 搜索查询节点
const handleFilterTreeNode = (value: string, data: { [key: string]: any }) => {
  if (data.label.includes(value)) {
    data.isActive = true;
  }
  return true;
};

// 设置关键词文本展示
const setActiveText = (value: string, kw: string) => {
  const reg = new RegExp(kw, 'gu');
  return value.replace(
    reg,
    `<span style="color: ${props.activeColor}">${kw}</span>`
  );
};

// 勾选树形节点事件
const handleTreeCheck = (treeItem: ITreeItem, treeStatus: any) => {
  const { checkedKeys } = treeStatus;
  // 判断当前点击节点是否在 checkKeys 中，不存在说明为取消选择
  if (!checkedKeys.includes(treeItem.id)) {
    selectList.value = selectList.value.filter((i) => i.id !== treeItem.id);
  } else {
    let flag = false;
    // 需要获取该节点的所有父节点，从根节点查询，如果存在则直接保存并break
    const fatherNodes = getFatherNode(treeItem);
    while (fatherNodes.length) {
      const fatherNode = fatherNodes.pop()!;
      if (checkedKeys.includes(fatherNode.id)) {
        flag = true;
        const parentLabel = fatherNode.label;
        selectList.value = selectList.value.filter(
          (i) => !i.label.includes(parentLabel)
        );
        selectList.value.push({
          id: fatherNode.id,
          label: genTreeText(fatherNode)
        });
        break;
      }
    }
    if (!flag) {
      selectList.value.push({
        id: treeItem.id,
        label: genTreeText(treeItem)
      });
    }
  }
};

// 左 -> 右
const handleAddCheck = () => {
  if (!selectList.value.length) return;
  // 需要移动的树形节点设置为dsiabled
  const checkNodes = treeRef.value.getCheckedKeys() as Array<string | number>;
  checkNodes.forEach((i: number | string) => {
    const node = treeMap.get(i)!;
    node.value.disabled = true;
  });

  // 右列结果先进行合并处理
  rightCheckList.value = rightCheckList.value.filter((i) => {
    for (const item of selectList.value) {
      if (i.label.includes(item.label)) {
        return false;
      }
    }
    return true;
  });

  rightCheckList.value = [...selectList.value, ...rightCheckList.value];

  selectList.value = [];

  // 每次移动操作向外发送所选类目
  emit('selectValue', rightCheckList.value);
};

// 右 -> 左
const handleBackTree = () => {
  checks.value.forEach((i) => {
    const node = treeMap.get(i)!;
    resetNodeDisabled(node.value);
    treeRef.value.setChecked(i, false, true);
  });

  // 删除右边勾选的选项
  rightCheckList.value = rightCheckList.value.filter((i) => {
    for (const item of checks.value) {
      if (item === i.id) return false;
    }
    return true;
  });

  // 勾选项设为空
  checks.value = [];

  // 每次移动操作向外发送所选类目
  emit('selectValue', rightCheckList.value);
};

// 重置节点禁用状态，同时解除节点的子节点状态
const resetNodeDisabled = (node: ITreeItem) => {
  node.disabled = false;
  if (node.children) {
    node.children.forEach((i) => resetNodeDisabled(i));
  }
};

// 获取一个子节点的所有父节点
const getFatherNode = (treeItem: ITreeItem) => {
  const parentNode = treeMap.get(treeItem.parentId!);
  const result: ITreeItem[] = [];
  if (parentNode) {
    let parent = parentNode;
    while (parent) {
      result.push(parent.value);
      if (!parent.value.parentId) return result;
      parent = treeMap.get(parent.value.parentId)!;
    }
  }

  return result;
};

// 根据点击的节点生成对应的文本
const genTreeText = (treeItem: ITreeItem) => {
  let text = treeItem.label;
  const parentNode = treeMap.get(treeItem.parentId!);
  if (parentNode) {
    let parent = parentNode;
    while (parent) {
      text = `${parent.value.label}${props.divider}${text}`;
      if (!parent.value.parentId) {
        break;
      }
      parent = treeMap.get(parent.value.parentId)!;
    }
  }

  return text;
};

// 将树形数据扁平存储
const genTreeMap = (treeData: ITreeItem[]) => {
  treeData.forEach((i) => {
    treeMap.set(i.id, ref<ITreeItem>(i));
    if (i.children && i.children.length) {
      genTreeMap(i.children);
    }
  });
};
</script>
