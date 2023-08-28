import type { App, Component } from 'vue';

export type WithInstall<T> = T & {
  install(app: App): void;
};

export function withInstall<T extends Component>(com: T) {
  (com as Record<string, unknown>).install = (app: App) => {
    const { name } = com;
    if (name) {
      app.component(name, com);
    }
  };

  return com as WithInstall<T>;
}
