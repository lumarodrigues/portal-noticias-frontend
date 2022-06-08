<template>
  <div class="q-pa-md">
    <q-list>
      <div v-for="item in news" v-bind:key="item.id">
        <q-item>
          <q-item-section>
            <q-item-label><q-icon name="star_rate" color="blue" /> {{ item.titulo }}</q-item-label>
            <q-item-label caption lines="2">{{ item.conteudo }}</q-item-label>
          </q-item-section>

          <q-btn @click="editNews(item.id)" color="primary" icon="edit" label="Editar" />
          <q-btn @click="deleteNews(item.id)" color="red" icon="delete" label="Deletar" />
        </q-item>

        <q-item-section side top>
          <q-icon name="calendar_month" color="blue" />
          <q-item-label caption>{{ item.data_publicacao }}</q-item-label>
        </q-item-section>

        <q-separator spaced inset />
      </div>

    </q-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewsList',
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
      debugger
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/api/noticias/${id}/`
      }).then(
        response => { this.news = response.data }
      )
    },
    deleteNews (id) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/api/noticias/${id}/`
      }).then(
        response => { this.news = response.data }
      )
    }
  }
}
</script>
