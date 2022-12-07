const UserRequest = require("../../models/UserRequest");

class RequestController {
  static async read(req, res) {
    try {
      const resFind = await UserRequest.findAll();
      res.status(200).json({ resFind });
    } catch (err) {
      res.status(404).json({ msg: "[ERROR] Can't make request" });
    }
  }

  static async findUser(req, res) {
    const { id } = req.params;
    try {
      const User = await UserRequest.findOne({ where: { id } });
      res.send(User);
    } catch (err) {
      console.log(err.message);
    }
  }
  static async create(req, res) {
    const { email, name, password, cpf, office } = req.body;
    try {
      const resFind = await UserRequest.findOne({where: {email}});
      if (resFind === null) {
        await UserRequest.create({
          email,
          name,
          password,
          cpf,
          office
        });
      }
      res.status(200).send("Solicitação de cadastro realizada com sucesso, entre em contato com o gestor de patrimônio para habilitar seu login");
    } catch (err) {
      res.status(501).json({ status:"error", msg: "[ERROR] Can't create new request to this user" });
    }
  }

  static async delete(req, res) {
    const { email } = req.params;
    console.log(email);
    const resFind = await UserRequest.findOne({ where: { email } });
    try {
      resFind.destroy();
      res.status(200).json("usuário deletado");
    } catch (err) {
      res.status(500).json({ msg: "[ERROR] Can't delete request" });
    }
  }
}

module.exports = RequestController;
