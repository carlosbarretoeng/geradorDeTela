<template>
  <q-layout view="lHr lpR lFr">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <q-toolbar class="bg-white text-dark">
        <ul class="my-breadcrumb">
          <template v-for="breadcrumb, idx in breadcrumbs" :key="'breadcrumb-' + idx">
            <template v-if="$route.path === breadcrumb.route">
              <li>
                <a href="/#/" class="">
                  <i aria-hidden="true" class="q-icon material-icons">store</i>
                </a>
              </li> 
              <li  v-for="item, idx2 in breadcrumb.bread" :key="'bread-' + idx2">
                <a :href="'/#' + item[2]" class="router-link-active">
                  <i aria-hidden="true" class="q-icon material-icons">{{ item[0] }}</i> 
                  <small class="breadcrumb-label">{{ item[1] }}</small>
                </a>
              </li>
            </template>
          </template>
        </ul>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="" style="padding: 20px; background: rgb(247,247,247)">
        <img src="http://integracao.fagoc.br/develop/public/app/statics/logo/unifagoc-colorido-transparente.png" />
      </div>
      <q-separator />
      <q-list dense class="text-grey-7">
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Principal</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="message" />
          </q-item-section>
          <q-item-section>Caixa de Entrada</q-item-section>
        </q-item>

        <q-expansion-item
          dense
          expand-separator
          icon="school"
          label="Acadêmico"
        >
          <q-list dense style="padding-left: 10px">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="assignment_ind" />
              </q-item-section>
              <q-item-section>Meu Registro</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="done_all" />
              </q-item-section>
              <q-item-section>Dispensas</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
              <q-item-section>Colação de Grau</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="library_books" />
              </q-item-section>
              <q-item-section>Bibliotecas</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="tab" />
              </q-item-section>
              <q-item-section>Pedidos de Documentos</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/aluno/aproveitamento">
              <q-item-section avatar>
                <q-icon name="class" />
              </q-item-section>
              <q-item-section>Pedidos de Aproveitamento</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="flag" />
              </q-item-section>
              <q-item-section>Pedidos de Desligamentos</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="receipt" />
              </q-item-section>
              <q-item-section>Atestados</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
          dense
          expand-separator
          icon="attach_money"
          label="Financeiro"
        >
          <q-list dense style="padding-left: 10px">
            <q-item clickable  v-ripple to="/aluno/financeiro">
              <q-item-section avatar>
                <q-icon name="assignment_ind" />
              </q-item-section>
              <q-item-section>Faturas e Recibos</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
          dense
          expand-separator
          icon="account_balance"
          label="Institucional"
        >
        </q-expansion-item>

        <q-expansion-item
          dense
          expand-separator
          icon="card_giftcard"
          label="Benefícios"
        >
        </q-expansion-item>

        <q-expansion-item
          dense
          expand-separator
          icon="collections_bookmark"
          label="Certificados"
        >
        </q-expansion-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

</template>

<script>
import { ref } from 'vue'

const breadcrumbs = [
  {
    route: '/',
    bread: [
      ['home', 'Principal', '/']
    ]
  },
  {
    route: '/aluno/aproveitamento',
    bread: [
      ['class', 'Pedido de Aproveitamento', '/aluno/aproveitamento']
    ]
  },
  {
    route: '/aluno/aproveitamento/create',
    bread: [
      ['class', 'Pedido de Aproveitamento', '/aluno/aproveitamento'],
      ['add', 'Criar', '/aluno/aproveitamento/create']
    ]
  }
]

export default {
  setup () {
    const leftDrawerOpen = ref(true)

    return {
      breadcrumbs,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
