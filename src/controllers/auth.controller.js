const config = {
  tokenLife: 9000000,
  refreshTokenLife: 8640000,
};

const jwt = require('jsonwebtoken');
const tokenList = {};

exports.signinHandlerToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).send('Credenciais ausentes.');
    }

    // Decodifica "Basic base64(login:senha)"
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [login, senha] = credentials.split(':');

    if (!(login && senha)) {
      return res.status(400).send('Preencha todos os campos.');
    }

    if (login === 'alex' && senha === 'frete1teste') {
      const token = jwt.sign({ login }, 'TMU2hZL4e$hqK$4Z', {
        expiresIn: config.tokenLife,
      });

      const refreshToken = jwt.sign({ login }, '4TcprVu6ZkxKqM32J#Z^3P', {
        expiresIn: config.refreshTokenLife,
      });

      const response = {
        status: 'Logado',
        token,
        refreshToken,
      };

      tokenList[refreshToken] = response;
      return res.status(200).json(response);
    }

    return res.status(400).send('Usuário ou senha inválido.');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Erro interno.');
  }
};


exports.refreshHandler = (req, res) => {
  const { login, password, refreshToken } = req.body;

  if (refreshToken && refreshToken in tokenList) {
    const user = { login: login, password: password };

    const token = jwt.sign(user, process.env.TOKEN_KEY, {
      expiresIn: config.tokenLife,
    });
    const response = { token: token };

    tokenList[refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send('Token inválido');
  }
};

