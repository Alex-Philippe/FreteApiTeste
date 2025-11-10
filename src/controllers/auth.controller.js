const jwt = require('jsonwebtoken');
const tokenList = {};
const config = {
  tokenLife: 9000000,
  refreshTokenLife: 8640000,
};

exports.signinHandlerToken = async (req, res) => {
  try {
    console.log('login')
    const { login, senha } = req.body;
    console.log(login, senha)

    if (!(login && senha)) {
      return res.status(400).send('Preencha todos os campos.');
    }

    if (login == 'alex' && senha == 'frete1teste') {
      const token = jwt.sign({ login, senha }, 'TMU2hZL4e$hqK$4Z', {
        expiresIn: config.tokenLife,
      });
      const refreshToken = jwt.sign(
        { login, senha },
        '4TcprVu6ZkxKqM32J#Z^3P',
        { expiresIn: config.refreshTokenLife }
      );
      const response = {
        status: 'Logado',
        token: token,
        refreshToken: refreshToken,
      };
      tokenList[refreshToken] = response;
      return res.status(200).json(response);
    }
    return res.status(400).send('Usuário ou senha inválido.');
  } catch (err) {
    console.log(err);
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

