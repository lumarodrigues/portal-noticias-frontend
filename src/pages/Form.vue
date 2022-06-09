<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="text-h4 text-weight-light q-my-lg" ><q-icon name="auto_awesome" color="purple-8" class="q-mb-xs" /> {{ this.title }}</div>

    <q-input square outlined v-model="titulo" label="Título" />
    <q-editor
      v-model="conteudo"
      :dense="$q.screen.lt.md"
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />

    <q-card-actions class="justify-end">
      <q-btn flat @click="cancel" type="button" color="black">Cancelar</q-btn>
      <q-btn @click="submit" type="button" color="positive">Salvar</q-btn>
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
      conteudo: '',
      title: 'Escrever Notícia'
    }
  },

  mounted () {
    this.getNews()
    this.changeTitle()
  },

  computed: {
    id () {
      return this.$route.params.id
    }
  },

  methods: {
    changeTitle () {
      if (this.id === undefined | null) {
        this.title = 'Escrever Notícia'
      } else {
        this.title = `Editar Notícia #${this.id}`
      }
    },
    getNews () {
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
    },

    cancel () {
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>
