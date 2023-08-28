import _FsEstimatedVirtualList from './FsEstimatedVirtualList.vue';
import { withInstall } from '@fanosy/utils';

const FsEstimatedVirtualList = withInstall(_FsEstimatedVirtualList);

export * from './types';
export { FsEstimatedVirtualList };
export default FsEstimatedVirtualList;
