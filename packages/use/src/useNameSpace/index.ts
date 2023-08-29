export const libPrefix = 'fs';
const statePrefix = 'is-';

// 基于 bem 规范组织 class
function _bem(
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) {
  let classStr = `${namespace}-${block}`;
  if (blockSuffix) classStr += `-${blockSuffix}`;
  if (element) classStr += `__${element}`;
  if (modifier) classStr += `--${modifier}`;

  return classStr;
}

export function useNameSpace(block: string) {
  const b = (blockSuffix = '') => _bem(libPrefix, block, blockSuffix, '', '');

  const e = (element = '') => _bem(libPrefix, block, '', element, '');

  const m = (modifier = '') => _bem(libPrefix, block, '', '', modifier);

  const be = (blockSuffix = '', element = '') =>
    _bem(libPrefix, block, blockSuffix, element, '');

  const em = (element = '', modifier = '') =>
    _bem(libPrefix, block, '', element, modifier);

  const bm = (blockSuffix = '', modifier = '') =>
    _bem(libPrefix, block, blockSuffix, '', modifier);

  const bem = (blockSuffix = '', element = '', modifier = '') =>
    _bem(libPrefix, block, blockSuffix, element, modifier);

  const is = (name: string, state: boolean | undefined) => {
    return name && state ? `${statePrefix}${name}` : '';
  };

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
}
