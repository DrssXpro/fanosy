import _FsTreeTransfer from './FsTreeTransfer.vue';
import { withInstall } from '@fanosy/utils';

const FsTreeTransfer = withInstall(_FsTreeTransfer);

export * from './types';
export { FsTreeTransfer };
export default FsTreeTransfer;
