import * as components from './index';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FsBounceCountTo: typeof components.FsBounceCountTo;
    FsButton: typeof components.FsButton;
    FsCategorySelector: typeof components.FsCategorySelector;
    FsCreateSelect: typeof components.FsCreateSelect;
    FsEstimatedVirtualList: typeof components.FsEstimatedVirtualList;
    FsSearchContainer: typeof components.FsSearchContainer;
    FsSearchItem: typeof components.FsSearchItem;
    FsSelectArea: typeof components.FsSelectArea;
    FsTableScrollBar: typeof components.FsTableScrollBar;
    FsTreeTransfer: typeof components.FsTreeTransfer;
    FsVirtualList: typeof components.FsVirtualList;
    FsVirtualWaterFall: typeof components.FsVirtualWaterFall;
    FsWaterFall: typeof components.FsWaterFall;
  }
}
export {};
