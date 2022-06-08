
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Index' },
      { path: 'detalhe/:id/', component: () => import('pages/Detail.vue'), name: 'Detail' },
      { path: 'escrever/', component: () => import('pages/Form.vue'), name: 'Form' },
      { path: 'editar/:id/', component: () => import('pages/Form.vue'), name: 'Update' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
    name: 'Error404'
  }
]

export default routes
