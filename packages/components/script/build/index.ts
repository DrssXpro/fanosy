import { series, src, dest, parallel } from 'gulp';
import glupSass from 'gulp-sass';
import sassLang from 'sass';
import autoPrefixer from 'gulp-autoprefixer';
import { pkgPath, componentPath } from '../utils/paths';
import delPath from '../utils/delpath';
import run from '../utils/run';

const sass = glupSass(sassLang);

//删除 fanosy 文件夹
export const removeDist = () => {
  return delPath(`${pkgPath}/fanosy`);
};

// 打包样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(dest(`${pkgPath}/fanosy/lib/src`))
    .pipe(dest(`${pkgPath}/fanosy/es/src`));
};

// 打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
