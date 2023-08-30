import { createApp } from 'vue';
import FsMessageBoxComponent from './FsMessageBox.vue';
import { IMessageBoxProps } from './types';

let instance: any = null;
function init(props: IMessageBoxProps) {
  const frag = document.createDocumentFragment();
  instance = createApp(FsMessageBoxComponent, { ...props }).mount(
    frag as unknown as Element
  );
  document.body.appendChild(frag);
}

function FsMessageBox(props: IMessageBoxProps): Promise<boolean> {
  !instance && init(props);
  return instance.init(props);
}

export { FsMessageBox };
