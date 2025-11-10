
exports.Busca = async (req, res) => {
    console.log(req.query)
    try {
        const hoje = new Date();
        const previsao = new Date();
        previsao.setDate(hoje.getDate() + 3);

        const retorno = {
        previsaoEntrega: previsao.toISOString().split('T')[0],
        custoFrete: parseFloat((Math.random() * 500).toFixed(2))
        };
        res.status(200).send(retorno);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: errsor });
    }
};
