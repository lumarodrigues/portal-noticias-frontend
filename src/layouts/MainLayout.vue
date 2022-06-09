<template>
  <q-layout view="lHh Lpr lFf">
    <q-header color="purple-8">
      <q-toolbar color="purple-8">
        <q-btn
          flat
          dense
          round
          icon="list"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Abacate News <q-icon name="auto_awesome" color="white" class="q-mb-xs" />
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      style="background: #eceff1"
    >
      <q-list>
        <q-item-label
          header
          class="bg-purple-9 text-white q-pt-lg q-pb-xl"
        >
          <q-img
            class="absolute-top"
            src="https://images.unsplash.com/photo-1636728682521-5bf9a2c4f533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80"
            style="height: 160px">
            <div class="bg-transparent">
              <q-avatar size="64px" class="q-mb-sm">
                <img src="https://cdn-icons-png.flaticon.com/512/1717/1717612.png">
              </q-avatar>
              <div class="text-weight-bold"><q-icon name="auto_awesome" color="purple-5" class="q-mb-xs" /> Bem-vindo(a)</div>
              <div>Ao seu jornal diário! <q-icon name="auto_awesome" color="purple-5" class="q-mb-xs" /></div>
            </div>
          </q-img>
        </q-item-label>

        <q-item-label header class="q-mt-xl q-pt-xl" style="margin-top: 60px">
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Notícias',
    caption: 'Ver todas as notícias',
    icon: 'newspaper',
    route: 'Index'
  },
  {
    title: 'Criar post',
    caption: 'Escrever novo post',
    icon: 'add_circle',
    route: 'Form'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
