import _FsTreeTransfer from './FsTreeTransfer.vue';
import { withInstall } from '../utils';

const FsTreeTransfer = withInstall(_FsTreeTransfer);

export * from './types';
export { FsTreeTransfer };
export default FsTreeTransfer;
