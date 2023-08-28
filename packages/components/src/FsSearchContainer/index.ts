import _FsSearchContainer from './FsSearchContainer.vue';
import _FsSearchItem from './FsSearchItem.vue';
import { withInstall } from '@fanosy/utils';

const FsSearchContainer = withInstall(_FsSearchContainer);
const FsSearchItem = withInstall(_FsSearchItem);

export { FsSearchContainer, FsSearchItem };
