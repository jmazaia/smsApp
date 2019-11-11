import * as Yup from 'yup';
import removeAccents from 'remove-accents';
import Message from '../schemas/Messages';
import mensagem from '../scripts/convertMessage';
import celularNumero from '../scripts/convertMessageToString';

class MessageController {
  async index(req, res) {
    Message.find({}, (err, docs) => {
      if (!err) {
        res.send(docs);
      } else throw err;
    });
  }

  async storeMessage(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string()
        .required()
        .max(255),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Você não digitou nenhum SMS' });
    }

    const { message } = req.body;

    const messageParam = removeAccents(message.toUpperCase());
    const messageConverted = mensagem(messageParam);

    await Message.create({
      content: message,
      converted: messageConverted,
    });

    return res.status(200).json({ message: `${messageConverted}` });
  }

  async storeNumber(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Você não digitou nenhum SMS' });
    }

    const message = removeAccents(req.body.message.toUpperCase());


    const messageconverted = celularNumero(message);

    await Message.create({
      content: message,
      converted: messageconverted,
    });

    return res.status(200).json({ message: `${messageconverted}` });
  }
}

export default new MessageController();
