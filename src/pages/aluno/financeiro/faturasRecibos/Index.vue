<template>
  <q-page style="padding: 10px">
    <q-card>
      <q-card-section>
        <q-table
          flat
          hide-pagination
          :rows="rows"
          :columns="columns"
          row-key="field"
          style="min-height: 600px"
        >
          <template v-slot:top>
            <div class="row q-gutter-sm">
              <q-btn flat dense color="primary" icon="first_page" />
              <q-btn flat dense color="primary" icon="keyboard_arrow_left" />
              <q-input borderless label="1/1" style="width: 25px" />
              <q-btn flat dense color="primary" icon="keyboard_arrow_right" />
              <q-btn flat dense color="primary" icon="last_page" />
              <q-select
                borderless
                v-model="rowPerPage"
                :options="rowPerPageOptions"
                style="width: 135px"
              />
              <span style="padding-top: 16px"> 1 - 1 de 1 </span>
            </div>
            <q-space />
            <div class="row q-gutter-sm">
              <q-btn color="primary" icon="refresh" />
              <q-btn
                color="primary"
                icon="add"
                to="/aluno/aproveitamento/create"
              />
              <q-btn color="light" text-color="dark" icon="reply" />
            </div>
          </template>

          <template v-slot:body-cell-opcoes="props">
            <q-td :props="props">
              <q-fab
                color="primary"
                icon="settings"
                direction="right"
                padding="sm"
              >
                <q-fab-action
                  color="negative"
                  icon="delete"
                  external-label
                  label-position="bottom"
                  label="Cancelar"
                  @click="remove(props)"
                />
                <q-fab-action
                  icon="search"
                  external-label
                  label-position="bottom"
                  label="Teste"
                  @click="visualizar(props)"
                />
              </q-fab>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

const columns = [
  { name: "opcoes", label: "Opções", field: "opcoes", align: "center" },
  { name: "codigo", label: "Código", field: "codigo", align: "center" },
  { name: "pago", label: "Pago", field: "pago", align: "center" },
  {
    name: "disponivel",
    label: "Disponivel",
    field: "disponivel",
    align: "left",
  },
  { name: "curso", label: "Curso", field: "curso", align: "left" },
  { name: "descricao", label: "Descricao", field: "descricao", align: "left" },
  {
    name: "numParcela",
    label: "Numero de Parcela",
    field: "numParcela",
    align: "left",
  },
  { name: "valor", label: "Valor", field: "valor", align: "left" },
  {
    name: "vencimento",
    label: "Vencimento",
    field: "vencimento",
    align: "left",
  },
];

export default defineComponent({
  name: "PageAlunoAproveitamento",
  data() {
    const rowPerPageOptions = ref([5, 10, 15, 25, 50]);
    const rowPerPage = ref(25);

    return {
      columns,
      rows: [],
      rowPerPageOptions,
      rowPerPage,
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.$api
        .get("financeiro")
        .then((response) => (this.rows = response.data));
    },
    remove(props) {
      this.$axios.delete("http://localhost:3000/financeiro", {
        // .delete('academico/aproveitamento', {
        params: {
          codigo: props.row.id,
        },
      });
      // .then(response => this.rows = response.data)
      this.update();
    },
    visualizar(props) {
      const codigo = props.row.codigo;
      this.$router.push({ name: "form", params: {id: codigo} });
    },
  },
});
</script>
