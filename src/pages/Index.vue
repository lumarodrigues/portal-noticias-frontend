<template>
  <div class="q-pa-md">
    <q-list>
      <div class="text-h4 text-weight-light q-my-lg"><q-icon name="auto_awesome" color="purple-8" class="q-mb-xs" /> Feed de Notícias</div>
      <q-card flat v-for="item in news" v-bind:key="item.id" class="q-mb-md q-pa-md bg-blue-grey-1">
        <q-card-section horizontal style="justify-content: space-between">
          <q-card-section>
            <q-item-label class="text-subtitle1 text-weight-regular q-mb-sm">
              <q-icon name="article" color="purple-8" class="q-mb-xs" />
              <q-btn flat class="text-primary" :label="item.titulo" :to="{name: 'Detail', params: { id: item.id }}" />
            </q-item-label>

            <q-item-label v-html="item.conteudo" caption lines="2" class="q-pr-lg">
            </q-item-label>
          </q-card-section>

          <q-card-section class="col-3 col-md-2" style="display: flex; gap: .5rem; align-items: start; justify-content: end">
            <q-btn flat round class="q-pa-sm" @click="editNews(item.id)" color="info" icon="edit" />
            <q-btn flat round class="q-pa-sm" @click="alert = true" color="red-10" icon="delete" />
          </q-card-section>
        </q-card-section>

        <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              Confirmar exclusão
            </q-card-section>

            <q-card-section class="q-pt-none">
              Deseja mesmo deletar a notícia #{{ item.id }}?
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat @click="deleteNews(item.id)" label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-card-section side top class="q-px-md">
          <q-icon name="calendar_month" color="blue" size="xs" class="q-mr-sm" />
          <label caption style="color: #90a4ae">Publicado em: {{ formatDate(item.data_edicao) }}</label>
        </q-card-section>
      </q-card>

    </q-list>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'NewsList',
  setup () {
    return {
      alert: ref(false),
      address: ref('')
    }
  },
  data () {
    return {
      news: []
    }
  },
  mounted () {
    this.loadList()
  },
  methods: {
    loadList () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/noticias/'
      }).then(
        response => { this.news = response.data }
      )
    },
    editNews (id) {
      this.$router.push({
        name: 'Update',
        params: { id: id }
      })
    },
    deleteNews (id) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/api/noticias/${id}/`
      }).then(r => {
        this.loadList()
      })
    },
    formatDate (date) {
      const dateInstance = new Date(date)
      return `${dateInstance.getDate().toString().padStart(2, '0')}/${(dateInstance.getMonth() + 1).toString().padStart(2, '0')}/${dateInstance.getFullYear()} às ${dateInstance.getHours().toString().padStart(2, '0')}:${dateInstance.getMinutes().toString().padStart(2, '0')}`
    }
  }
}
</script>
