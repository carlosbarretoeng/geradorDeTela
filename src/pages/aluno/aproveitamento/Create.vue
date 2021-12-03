<template>
  <q-page style="padding: 10px">
    <q-card>
      <q-card-section>
        <div  class="row q-gutter-sm">
          <span class="q-my-none text-h5 q-pt-md">Pedido de Aproveitamento</span>
          <q-space/>
          <q-btn color="light" text-color="dark" icon="reply" to="/aluno/aproveitamento"/>
        </div>
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="text-justify" v-html="textoExplicacao" />
      </q-card-section>
      <q-separator class="q-my-md"/>
      <q-card-section class="q-pt-none">
        <span class="text-h6 q-my-none">Passo 1 - Disciplina UNIFAGOC</span>
        <div class="row q-gutter-md">
          <q-select clearable class="col" v-model="matricula" :options="matriculas" label="Matrícula*" @update:model-value="updateMatricula"/>
          <q-select clearable use-input @filter="filterDisciplina" class="col" v-model="disciplina" :options="disciplinas" label="Disciplina UNIFAGOC*" :disable="!!!matricula"/>
        </div>

        <q-separator class="q-my-md"/>

        <span class="text-h6 q-my-none">Passo 2 - Disciplinas e Cargas Horárias Cursadas</span>
        <div class="row q-col-gutter-md q-mb-lg">
          <q-input class="col" v-model="disciplinaCursada" label="Disciplina Cursada" />
          <q-file class="col-2" v-model="ementa" label="Ementa (PDF)" />
          <q-input class="col-1" type="number" v-model="chteorica" label="Teórica" />
          <q-input class="col-1" type="number" v-model="chpratica" label="Prática" />
          <q-input class="col-1" v-model="cargaHorariaTotal" label="Total" readonly/>
          <div class="col-2 q-mt-md">
            <q-btn class="full-width" color="primary" label="Adicionar" :disable="!enableAddDisciplina" @click="addDisciplina()" />
          </div>
        </div>

        <q-table
            class="col"
            flat
            bordered
            hide-pagination
            :rows="disciplinasAdicionadas"
            :columns="[
              {name: 'options', label: 'Opções', field: 'options', align: 'left', style: 'width: 50px'},
              {name: 'disciplina', label: 'Disciplina Cursada', field: 'disciplina', align: 'left'},
              {name: 'ementa', label: 'Ementa (PDF)', field: 'ementa', align: 'left'},
              {name: 'chteorica', label: 'C.H. Teórica', field: 'chteorica', style: 'width: 100px'},
              {name: 'chpratica', label: 'C.H. Prática', field: 'chpratica', style: 'width: 100px'},
              {name: 'chtotal', label: 'C.H. Total', field: 'chtotal', style: 'width: 100px'},
            ]"
            row-key="name"
            table-header-class="bg-grey-2"
          >
            <template v-slot:body-cell-options="props">
              <q-td :props="props">
                <q-btn unelevated rounded size="sm" icon="delete" color="negative" @click="removeDisciplina(props)"><q-tooltip>Remover</q-tooltip></q-btn>
              </q-td>
            </template>

            <template v-slot:bottom-row>
              <q-tr class="bg-grey-2" v-if="disciplinasAdicionadas.length">
                <q-th colspan="3" class="text-right text-weight-bolder">
                  {{ disciplinasAdicionadas.length }} disciplina(s) adicionada(s)
                </q-th>
                <q-th class="text-right text-weight-bolder">
                  {{ calculateCargaHorariaTeorica }}
                </q-th>
                <q-th class="text-right text-weight-bolder">
                  {{ calculateCargaHorariaPratica }}
                </q-th>
                <q-th class="text-right text-weight-bolder">
                  {{ calculateCargaHorariaTotal }}
                </q-th>
              </q-tr>
            </template>
        </q-table>

        <q-separator class="q-my-md"/>
        <span class="text-h6 q-my-none">Passo 3 - Histórico e Observações</span>

        <div class="row q-col-gutter-md">
          <div class="col-6">
            Histórico:
            <q-uploader
              flat
              bordered
              multiple
              class="full-width"
              url=""
              style="height: calc(100% - 32px)"
            />
          </div>
          <div class="col-6">
            Observações:
            <q-editor class="full-width" v-model="observacoes" min-height="10rem" style="height: calc(100% - 32px)"/>
          </div>
        </div>

        <q-separator class="q-my-md"/>
        <span class="text-h6 q-my-none">Passo 4 - Enviar Pedido de Aproveitamento</span>
        <q-btn color="primary" class="full-width" label="Enviar Pedido" :disable="!enableSaveAndBack" @click="saveAndBack()"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar, Dialog } from 'quasar';
import moment from 'moment';
import { loremIpsum } from "lorem-ipsum";

export default defineComponent({
  name: 'PageAlunoAproveitamentoCreate',
  data () {
    return {
      textoExplicacao: loremIpsum({format: 'html', units: 'paragraphs', count: 3}),
      matricula: '',
      matriculas: [],
      disciplina: '',
      disciplinas: [],
      disciplinasGrade: [],
      disciplinasAdicionadas: [],
      ementa: null,
      disciplinaCursada: '',
      chteorica: '',
      chpratica: '',
      observacoes: ''
    }
  },
  mounted () {
    this.$api
      .get('academico/curso/aluno')
      .then(response => this.matriculas = response.data.map(matricula => {
        return {
          value: matricula.mtr_codigo,
          label: matricula.cur_titulo,
          grd_codigo: matricula.mtr_cod_GRADE
        }
      }))
  },
  methods: {
    updateMatricula (value) {
      if(!!value){
        this.$api
          .get('academico/curso/disciplinas/' + value.grd_codigo)
          .then(response => this.disciplinasGrade = response.data.map(disciplina => {
            return {
              value: disciplina.grdd_codigo,
              label: disciplina.grdd_descricao
            }
          }))
      }
    },
    addDisciplina () {
      console.log(this.ementa)

      this.disciplinasAdicionadas.push(
        {
          codigo: ~~(Math.random() * 1000000),
          disciplina: this.disciplinaCursada,
          ementa: this.ementa.name,
          chteorica: this.chteorica,
          chpratica: this.chpratica,
          chtotal: this.cargaHorariaTotal
        }
      )
      this.disciplinaCursada = ""
      this.ementa = null
      this.chteorica = ""
      this.chpratica = ""
    },
    removeDisciplina (props) {
      this.disciplinasAdicionadas = this.disciplinasAdicionadas.filter((disciplina) => {
        return disciplina.codigo !== props.row.codigo
      })
    },
    filterDisciplina (val, update) {
      if (val === '') {
        update(() => {
          this.disciplinas = this.disciplinasGrade
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.disciplinas = this.disciplinasGrade.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
      return
    },
    saveAndBack () {
      let previsao = moment().add(3, 'days').format('DD/MM/YYYY')

      const dialog = Dialog.create({
        title: 'Enviando Pedido de Aproveitamento...',
        message: '0%',
        progress: true,
        persistent: true,
        ok: false
      }).onOk((payload) => {
        this.$api
          .post('academico/aproveitamento', {
              "codigo": ~~(Math.random() * 1000000),
              "curso": this.matricula.label,
              "disciplina": this.disciplina.label,
              "status": "Pendente",
              "previsao": previsao
            })
          .then(resp => {
          this.$router.push({ path: '/aluno/aproveitamento' })
        })
      })

      let percentage = 0
      const interval = setInterval(() => {
        percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

        dialog.update({
          message: `${percentage}%`
        })

        if (percentage === 100) {
          clearInterval(interval)
          dialog.update({
            title: 'Pronto!',
            message: 'Pedido realizado com sucesso. Sua estimativa de conclusão de processo é: ' + previsao,
            progress: false,
            ok: true
          })
        }
      }, 500)
    }
  },
  computed: {
    grade(){
      if(this.matricula) return '2020-1'
      return ''
    },
    enableAddDisciplina () {
      return this.disciplinaCursada !== "" &&
        this.chteorica !== "" &&
        this.chpratica !== "" &&
        this.cargaHorariaTotal !== "" &&
        this.cargaHorariaTotal > 0
    },
    enableSaveAndBack () {
      return true
      if(
        this.disciplinasAdicionadas.length > 0 &&
        this.observacoes !== ""
      ) {
        return true;
      }
      return false;
    },
    cargaHorariaTotal () {
      let total = parseInt(this.chteorica || 0) + parseInt(this.chpratica || 0)
      return total === 0 ? '' : total
    },
    calculateCargaHorariaTeorica () {
      return this.disciplinasAdicionadas.reduce((acc, disciplina) => { return acc + parseInt(disciplina.chteorica) }, 0)
    },
    calculateCargaHorariaPratica () {
      return this.disciplinasAdicionadas.reduce((acc, disciplina) => { return acc + parseInt(disciplina.chpratica) }, 0)
    },
    calculateCargaHorariaTotal () {
      return this.disciplinasAdicionadas.reduce((acc, disciplina) => { return acc + parseInt(disciplina.chtotal) }, 0)
    }
  }
})
</script>
