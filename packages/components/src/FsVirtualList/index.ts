import _FsVirtualList from './FsVirtualList.vue';
import { withInstall } from '../utils';

const FsVirtualList = withInstall(_FsVirtualList);

export * from './types';
export { FsVirtualList };
export default FsVirtualList;
