<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input square outlined v-model="titulo" label="Título" />
    <q-editor v-model="conteudo" min-height="5rem" />

    <q-card-actions class="justify-end">
      <q-btn @click="submit" type="button" color="secondary">Postar</q-btn>
    </q-card-actions>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'News',
  data () {
    return {
      titulo: '',
      conteudo: ''
    }
  },
  mounted () {
    this.getNews()
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    getNews () {
      debugger
      if (this.id !== undefined | null) {
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/api/noticias/${this.id}/`
        }).then((r) => {
          this.titulo = r.data.titulo
          this.conteudo = r.data.conteudo
        }).catch((e) => {
          this.tituloErros = e.response.data.titulo || []
          this.conteudoErros = e.response.data.conteudo || []
          this.$router.push({ name: 'Error404' })
        })
      }
    },
    submit () {
      if (this.id !== undefined | null) {
        axios({
          method: 'put',
          url: `http://127.0.0.1:8000/api/noticias/${this.id}/`,
          data: {
            titulo: this.titulo,
            conteudo: this.conteudo
          }
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch((e) => {
          this.tituloErros = e.response.data.titulo || []
          this.conteudoErros = e.response.data.conteudo || []
        })
      } else {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/noticias/',
          data: {
            titulo: this.titulo,
            conteudo: this.conteudo
          }
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch((e) => {
          this.tituloErros = e.response.data.titulo || []
          this.conteudoErros = e.response.data.conteudo || []
        })
      }
    }
  }
}
</script>
