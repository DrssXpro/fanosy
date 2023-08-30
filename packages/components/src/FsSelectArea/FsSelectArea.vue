<template>
  <el-space :size="props.gap" :direction="props.direction">
    <fs-selector
      title="请选择 - 省"
      :options="provinceList"
      @select-change="selectProvince"
      @clear-select="clearProvince"
      :size="$attrs.size"
    ></fs-selector>
    <fs-selector
      ref="cityRef"
      title="请选择 - 市"
      :options="cityList"
      @select-change="selectCity"
      @clear-select="clearCity"
      :size="$attrs.size"
      :disabled="disabledCity"
    ></fs-selector>
    <fs-selector
      ref="countyRef"
      title="请选择 - 区县"
      :options="countyList"
      @select-change="selectCounty"
      @clear-select="clearCounty"
      :size="$attrs.size"
      :disabled="disabledCounty"
    ></fs-selector>
  </el-space>
</template>

<script setup lang="ts">
import { computed, ref, toRaw } from 'vue';
import FsSelector from './FsSelector.vue';
import cityData from './cityData/city';
import type { IAreaList, ICity, ICounty, IProvince } from './types';

defineOptions({
  name: 'fs-selector-area'
});

const props = withDefaults(
  defineProps<{
    gap?: number;
    direction?: 'vertical' | 'horizontal';
  }>(),
  {
    gap: 20,
    direction: 'horizontal'
  }
);

const emit = defineEmits<{
  chooseArea: [value: Array<Array<string>>];
}>();

const cityRef = ref<InstanceType<typeof FsSelector>>();
const countyRef = ref<InstanceType<typeof FsSelector>>();
const provinceList = ref<Record<string, IProvince>>(formatData(cityData));
const cityList = ref<Record<string, ICity>>({});
const countyList = ref<Record<string, ICounty>>({});
const disabledCity = computed(() => result.value.length < 1);
const disabledCounty = computed(() => result.value.length < 2);
const result = ref<Array<string[]>>([]);

// 选择省
const selectProvince = (value: string) => {
  // [110000, 北京市]
  if (value) {
    clearCity();
    clearCounty();
    const arr = value.split('-') as any[];
    cityList.value = provinceList.value[arr[1]].cities as Record<string, ICity>;
    result.value[0] = arr;
  }
};

// 选择市
const selectCity = (value: string) => {
  if (value) {
    clearCounty();
    const arr = value.split('-') as any;
    countyList.value = cityList.value[arr[1]].counties as Record<
      string,
      ICounty
    >;
    result.value[1] = arr;
  }
};

// 选择区/县
const selectCounty = (value: string) => {
  if (value) {
    const arr = value.split('-') as any;
    result.value[2] = arr;
    emit('chooseArea', toRaw(result.value));
  }
};

// 清空省：保存结果、city、county 选项都需清空
const clearProvince = () => {
  result.value = [];
  cityList.value = {};
  countyList.value = {};
};

// 清空市：只保存省结果，county 选项都需清空
const clearCity = () => {
  cityRef.value!.clearSelect();
  result.value = [result.value[0]];
  countyList.value = {};
};

// 清空区/县：保存省、市结果
const clearCounty = () => {
  countyRef.value!.clearSelect();
  result.value.pop();
};

// 格式化信息
function formatData(cityData: IAreaList): Record<string, IProvince> {
  return cityData.reduce<Record<string, IProvince>>(
    (preProvince, nextProvince) => {
      nextProvince.cities = (nextProvince.cities as ICity).reduce(
        (
          preCity: Record<string, ICity>,
          nextCity: ICity
        ): Record<string, ICity> => {
          nextCity.counties = (nextCity.counties as ICounty).reduce(
            (
              preCounty: Record<string, ICounty>,
              nextCounty: ICounty
            ): Record<string, ICounty> => {
              preCounty[nextCounty.name] = nextCounty;
              return preCounty;
            },
            {} as Record<string, ICounty>
          );
          preCity[nextCity.name] = nextCity;
          return preCity;
        },
        {} as Record<string, ICity>
      );
      preProvince[nextProvince.name] = nextProvince;
      return preProvince;
    },
    {}
  );
}
</script>
