import FsTable from './FsTable.vue';
import _FsTableScrollBar from './FsTableScrollBar.vue';
import { withInstall } from '../utils';
const FsTableScrollBar = withInstall(_FsTableScrollBar);

export * from './types';
export { FsTable, FsTableScrollBar };
