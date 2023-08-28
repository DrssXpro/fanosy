import { createApp } from 'vue';
import App from './app.vue';
import fanosy from '@fanosy/components';

const app = createApp(App);

app.use(fanosy);

app.mount('#app');
