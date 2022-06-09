<template>
  <div class="q-pa-md">
    <q-list>
      <div class="text-h4 text-weight-light q-my-lg"><q-icon name="auto_awesome" color="purple-8" class="q-mb-xs" /> Notícia #{{ news.id }}</div>
      <q-card flat class="q-pa-md bg-blue-grey-1">
        <div class="text-h6 q-mt-sm q-mb-xs text-weight-light"><q-icon name="auto_awesome" color="purple-8" class="q-mb-xs" /> {{ news.titulo }}</div>
        <q-card-actions>
          <q-item-section>
            <q-item-label v-html="news.conteudo" class="text-caption text-grey-7" />
          </q-item-section>
        </q-card-actions>

        <q-card-actions>
          <q-icon name="calendar_month" color="info" size="sm" class="q-mr-md q-mb-xs" />
          <q-item-label caption>Publicado em: {{ formatDate(news.data_edicao) }}</q-item-label>
        </q-card-actions>

        <q-card-actions class="justify-end">
          <q-btn @click="editNews(news.id)" color="info" label="EDITAR" />
          <q-btn @click="alert = true" color="negative" label="DELETAR" />

          <q-dialog v-model="alert">
            <q-card>
              <q-card-section>
                Confirmar exclusão
              </q-card-section>

              <q-card-section class="q-pt-none">
                Deseja mesmo deletar a notícia #{{ news.id }}?
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat @click="deleteNews(news.id)" label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-card-actions>
      </q-card>

    </q-list>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'News',
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
    this.loadNews()
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  methods: {
    loadNews (id) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/noticias/${this.id}/`
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
      }).then(
        this.$router.push({ name: 'Index' })
      )
    },
    formatDate (date) {
      const dateInstance = new Date(date)
      return `${dateInstance.getDate().toString().padStart(2, '0')}/${(dateInstance.getMonth() + 1).toString().padStart(2, '0')}/${dateInstance.getFullYear()} às ${dateInstance.getHours().toString().padStart(2, '0')}:${dateInstance.getMinutes().toString().padStart(2, '0')}`
    }
  }
}
</script>
