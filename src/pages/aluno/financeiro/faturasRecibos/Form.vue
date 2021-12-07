<template>
  <q-page>
    <q-card>
      <div class="row q-col-gutter-xs">
        <div class="col-4">
          <q-input
            outlined
            disable
            v-model="this.titulo.codigo"
            label="Codigo"
          />
        </div>
        <div class="col-4">
          <q-input outlined disable v-model="this.titulo.curso" label="Curso" />
        </div>
        <div class="col-4">
          <q-input
            outlined
            disable
            v-model="this.titulo.descricao"
            label="Descricao"
          />
        </div>
      </div>
      <div class="col-2">
        <q-input
          outlined
          disable
          v-model="this.titulo.numParcela"
          label="Numero de Parcela"
        />
      </div>
      <div class="row q-col-gutter-xs">
        <div class="col-2">
          <q-input
            outlined
            disable
            v-model="this.titulo.disponivel"
            label="Disponivel"
          />
        </div>
        <div class="col-2">
          <q-input outlined disable v-model="this.titulo.pago" label="Pago" />
        </div>
        <div class="col-2">
          <q-input
            outlined
            disable
            v-model="this.titulo.detalhamento.valorTotal"
            label="Valor"
          />
        </div>
        <div class="col-2">
          <q-input
            outlined
            disable
            v-model="this.titulo.vencimento"
            label="Vencimento"
          />
        </div>
      </div>

      <div class="q-pa-md">
        <q-table
          title="Detalhamento"
          dense
          :rows="rows"
          :columns="columns"
          row-key="name"
          :rows-per-page-options="[13]"
          hide-bottom
        />
      </div>
      <!-- <q-input outlined disable v-model="this.titulo.codigo" label="Codigo" /> -->
      <!-- <q-input outlined disable v-model="this.titulo.curso" label="Curso" />
            <q-input outlined disable v-model="this.titulo.descricao" label="Descricao" />
            <q-input outlined disable v-model="this.titulo.disponivel" label="Disponivel" />
            <q-input outlined disable v-model="this.titulo.numParcela" label="Numero de Parcela" />
            <q-input outlined disable v-model="this.titulo.pago" label="Pago" />
            <q-input outlined disable v-model="this.titulo.valor" label="Valor" />
            <q-input outlined disable v-model="this.titulo.vencimento" label="Vencimento" /> -->
    </q-card>
  </q-page>
</template>

<script>
const columns = [];
const rows = [];

export default {
  data() {
    return {
      columns,
      rows,
      titulo: {
        codigo: "",
        curso: "",
        descricao: "",
        disponivel: "",
        numParcela: "",
        pago: "",
        valor: "",
        vencimento: "",
        detalhamento: {
          valorOriginal: "0.000,00",
          descontoPagamentoEmDia: "00.00",
          descontoPromocional: "0.00",
          abatimento: "00.00",
          debitos: "0.00",
          facred: "0.00",
          fies: "0.00",
          prouni: "0.00",
          outrosFinanciamentos: "0.00",
          descontos: "0.00",
          descontosExpiraveis: "0.00",
          jurosMulta: "0.00",
          valorTotal: "000,00",
        },
      },
    };
  },
  methods: {
    async obterTitulo(id) {
      const res = await this.$api.get(`financeiro/${id}`);
      const [titulo] = res.data;
      this.titulo = titulo;
    },
    preencherTabela() {
      columns.push({
        name: "name",
        required: true,
        label: "Modificador",
        align: "left",
        field: (row) => row.name,
      });

      columns.push({
        name: "value",
        required: true,
        label: "Valor",
        align: "left",
        field: (row) => row.value,
      });

      rows.push({
        name: "Valor Original",
        value: this.titulo.detalhamento.valorTotal,
      });

      rows.push({
        name: "Desconto de pagamento em dia",
        value: this.titulo.detalhamento.descontoPagamentoEmDia,
      });

      rows.push({
        name: "Desconto promocional",
        value: this.titulo.detalhamento.descontoPromocional,
      });

      rows.push({
        name: "Abatimento",
        value: this.titulo.detalhamento.abatimento,
      });

      rows.push({
        name: "Debitos",
        value: this.titulo.detalhamento.debitos,
      });

      rows.push({
        name: "FACRED",
        value: this.titulo.detalhamento.facred,
      });

      rows.push({
        name: "FIES",
        value: this.titulo.detalhamento.fies,
      });

      rows.push({
        name: "ProUni",
        value: this.titulo.detalhamento.prouni,
      });

      rows.push({
        name: "Outros financiamentos",
        value: this.titulo.detalhamento.outrosFinanciamentos,
      });

      rows.push({
        name: "Descontos",
        value: this.titulo.detalhamento.descontos,
      });

      rows.push({
        name: "Descontos expiraveis",
        value: this.titulo.detalhamento.descontosExpiraveis,
      });

      rows.push({
        name: "Juros e multas",
        value: this.titulo.detalhamento.jurosMulta,
      });

      rows.push({
        name: "Total",
        value: this.titulo.detalhamento.valorTotal,
      });
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.obterTitulo(id);
    this.preencherTabela();
  },
};
</script>

<style></style>
