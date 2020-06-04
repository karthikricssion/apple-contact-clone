import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import EditOrCreateContact from './views/EditOrCreateContact.vue'
import ViewContact from './views/ViewContact.vue'

Vue.use(Router)

const router = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            props: true
        },

        {
            path: '/new',
            name: 'createContact',
            component: EditOrCreateContact,
            props: true
        },

        {
            path: '/:id',
            name: 'viewContact',
            component: ViewContact,
            props: true
        },

        {
            path: '/:id/edit',
            name: 'editContact',
            component: EditOrCreateContact,
            props: true
        },
    ]
})

export default router