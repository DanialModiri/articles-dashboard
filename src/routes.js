import Home from './pages/Home';
import ArticlesView from './pages/Articles/View';
import States from './pages/States';

export default [
    { path: '/articles', component: ArticlesView },
    { path: '/states', component: States },
    { path: '/', component: Home },

]