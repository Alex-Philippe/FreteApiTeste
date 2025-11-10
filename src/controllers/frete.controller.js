
exports.Busca = async (req, res) => {
    console.log(req.query)
    try {
        const retorno = {
            previsaoEntrega: "2025-04-05",
            custoFrete: parseFloat((Math.random() * 500).toFixed(2))
            };
        res.status(200).send(retorno);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: errsor });
    }
};
