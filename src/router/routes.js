
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('src/pages/Index.vue') 
      },
      { 
        path: '/aluno', 
        component: () => import('src/layouts/PassThrough.vue'),
        children: [
          { 
            path: 'aproveitamento', 
            component: () => import('src/layouts/PassThrough.vue'),
            children: [
              {
                path: '',
                component: () => import('src/pages/aluno/aproveitamento/Index.vue') 
              },
              {
                path: 'create',
                component: () => import('src/pages/aluno/aproveitamento/Create.vue') 
              }
            ]
          }
        ]
      },
      {
        path: '/aluno',
        component: () => import('src/layouts/PassThrough.vue'),
        children: [
          {
            path: 'financeiro',
            component: () => import('src/layouts/PassThrough.vue'),
            children: 
            [
              {
                path: '',
                component: () => import('src/pages/aluno/financeiro/faturasRecibos/Index.vue') 
              },
            ]
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
