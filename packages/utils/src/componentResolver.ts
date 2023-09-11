export interface ImportInfo {
  as?: string;
  name?: string;
  from: string;
}

export type SideEffectsInfo =
  | (ImportInfo | string)[]
  | ImportInfo
  | string
  | undefined;

export interface ComponentInfo extends ImportInfo {
  sideEffects?: SideEffectsInfo;
}

export type IComponentsMap = Record<string, string[]>;

export interface IResolverOptions {
  componentsMap: IComponentsMap;
  componentsPath: string;
}

function getSideEffects(
  name: string,
  options: IResolverOptions
): SideEffectsInfo | undefined {
  const esComponentsFolder = 'element-plus/es/components';
  const { componentsMap } = options;
  const styles = componentsMap[name];
  return styles
    ? [
        `${esComponentsFolder}/base/style/css`,
        ...styles.map((i) => `${esComponentsFolder}/${i}/style/css`)
      ]
    : [];
}

function resolveComponent(
  name: string,
  options: IResolverOptions
): ComponentInfo | undefined {
  const { componentsPath } = options;
  return {
    name,
    from: `${componentsPath}/${name}`,
    sideEffects: getSideEffects(name, options)
  };
}

function componentsLibResolver(options: IResolverOptions): any[] {
  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        return resolveComponent(name, options);
      }
    }
  ];
}

export { componentsLibResolver };
