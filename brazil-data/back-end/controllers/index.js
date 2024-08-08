process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const carbone = require('carbone');
const axios = require('axios');

const ibge_base_url = "https://servicodados.ibge.gov.br/api/v3/agregados"

module.exports = {
    async dataOptions(req, res) {
        const data = [{ id: "6784", label: "Gross domestic product" }, { id: "793", label: "Resident Population" }];

        res.status(200).send(data);
    },

    async filterOptions(req, res) {
        try {
            const params = req?.query;
            const id = params?.id;

            axios.get(`${ibge_base_url}/${id}/periodos`)
                .then(({ data }) => {
                    res.send(data);
                })
        } catch (err) {
            res.status(500).send(err);
        }
    },

    async generatePopProjection() {
        const url = `${ibge_base_url}7358/periodos/-6/variaveis/606?localidades=N1[all]&classificacao=2[all]|287[100362]|1933[49046`
        const response = await axios.get(url)
        const data = response.data;
            const results = data[0]?.resultados[0]?.series[0]?.serie;
            const formattedData = { results: results }

            carbone.render('./format.odt', formattedData, options, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                }

                console.log("file created")

                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');
                res.send(result);
            });
    },

    async generateData(req, res) {
        const period = req?.query?.period;
        const id = req?.query?.id;
        const options = {
            convertTo: 'pdf'
        }

        const variable = id === "6784" ? "9810" : "93";

        try {
            const url = `${ibge_base_url}/${id}/periodos/${period}/variaveis/${variable}?localidades=N1[all]`
            const response = await axios.get(url)
            const data = response.data;
            const results = data[0]?.resultados[0]?.series[0]?.serie;
            const formattedData = { results: results }

            carbone.render('./format.odt', formattedData, options, function (err, result) {
                if (err) {
                    res.status(500).send(err);
                }

                console.log("file created")

                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');
                res.send(result);
            });
        } catch (err) {
            res.status(500).send(err);
        }
    },
}