const Yup = require('yup');
const User = require('../models/User');
const validarCpf = require('validar-cpf');

class UserController {
  async findAll(req, res) {
    const { page = 1 } = req.query;

    const users = await User.findAll({
      attributes: [
        'name',
        'gender',
        'email',
        'cpf',
        'cep_residencial',
        'cep_comercial',
        'birth_date',
        'phone',
        'cell_phone',
      ],
      limit: 3,
      offset: (page - 1) * 3,
    });

    return res.json(users);
  }

  async findOne(req, res) {
    const fEmail = req.params.fEmail;

    const user = await User.findOne({
      where: { email: fEmail },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Email não pertence a nenhum usuário' });
    }

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      gender: Yup.string().required(),
      email: Yup.string().email(),
      birth_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Falha na validação dos dados informados' });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Este email já está cadastrado' });
    }

    const cpfExists = await User.findOne({
      where: { cpf: req.body.cpf },
    });

    if (cpfExists) {
      return res.status(400).json({ error: 'Este CPF já está cadastrado' });
    }

    if (!validarCpf(req.body.cpf)) {
      return res.status(400).json({ error: 'CPF inválido' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

module.exports = new UserController();
