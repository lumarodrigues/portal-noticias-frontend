<template>
  <div class="q-pa-md">
    <q-list>
      <div>
        <p>{{ news.titulo }}</p>
        <q-item>
          <q-item-section>
            <q-item-label>
             {{ news.conteudo }}
            </q-item-label>
          </q-item-section>

          <q-item class="float-right">
            <q-icon name="calendar_month" color="blue" />
            <q-item-label caption>{{ news.data_publicacao }}</q-item-label>
          </q-item>
        </q-item>

        <q-btn color="primary" icon="edit" label="EDITAR" />
      </div>

    </q-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'News',
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
    }
  }
}
</script>
