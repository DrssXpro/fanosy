import { createApp } from 'vue';
import App from './app.vue';
import 'element-plus/dist/index.css';
import fanosy from '@fanosy/components';

const app = createApp(App);

app.use(fanosy);

app.mount('#app');
