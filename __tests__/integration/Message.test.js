import request from 'supertest';
import app from '../../src/app';

describe('MessageStore', () => {
  it('Deve ser possível ver a lista de mensagens cadastrar acessando a rota'
  + '/messages',
  async () => {
    await request(app)
      .get('/messages')
      .set('Accept', 'application/json')
      .expect(200);
  });
  it('Deve ser possível criar uma mensagem no banco de dados'
  + ' pela rota /messagestring ',
  async () => {
    const response = await request(app)
      .post('/messagestring')
      .send({
        message: 'Olá bom dia, tudo bom?',
      });
    expect(response.body).toHaveProperty('message');
  });


  it('Se o usuário não digitar uma mensagem, deve retornar um error 400',
    async () => {
      const response = await request(app)
        .post('/messagenumber')
        .send({ error: 'aaa' });
      expect(response.body).toHaveProperty('error');
    });
  it('Se o usuário não digitar uma mensagem, deve retornar um error 400',
    async () => {
      const response = await request(app)
        .post('/messagestring')
        .send({ error: 'aaa' });
      expect(response.body).toHaveProperty('error');
    });

  it('Se o usuário digitar TESTE DE MESA: deve retornar'
  + ' 833777783303_33063377772  ',
  async () => {
    const response = await request(app)
      .post('/messagestring')
      .send({ message: 'TESTE DE MESA' });
    expect(response.body)
      .toMatchObject({ message: '833777783303_33063377772' });
  });

  it('Se o usuário digitar 833777783303_33063377772: '
  + 'deve retornar TESTE DE MESA  ',
  async () => {
    const response = await request(app)
      .post('/messagenumber')
      .send({ message: '833777783303_33063377772' });
    expect(response.body)
      .toMatchObject({ message: 'TESTE DE MESA' });
  });

  it('Se o usuário digitar letras minusculas nao deve retornar vazio  ',
    async () => {
      const response = await request(app)
        .post('/messagestring')
        .send({ message: 'abcdefghijklmnopqrstuvwxyz' });
      expect(response.body)
        .toMatchObject(
          {
            message: '2_22_2223_33_3334_44_4445_55_5556_66_6667_77_777_77778'
          + '_88_8889_99_999_9999',
          },
        );
    });

  it('O alfabeto inteiro poderá ser retornado se necessário ',
    async () => {
      const response = await request(app)
        .post('/messagestring')
        .send({ message: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });
      expect(response.body)
        .toMatchObject(
          {
            message: '2_22_2223_33_3334_44_4445_55_5556_66_6667_77_777_77778_'
          + '88_8889_99_999_9999',
          },
        );
    });
  it('Devem ser convertidas todas as letras do alfaberto',
    async () => {
      const response = await request(app)
        .post('/messagenumber')
        .send({
          message: '2_22_2223_33_3334_44_4445_55_5556_66_6667_77_777_'
        + '77778_88_8889_99_999_9999',
        });
      expect(response.body)
        .toMatchObject(
          {
            message: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          },
        );
    });
  it('Os caracteres especiais "acentos e cidilha" devem ser lidos normalmente',
    async () => {
      const response = await request(app)
        .post('/messagestring')
        .send({ message: 'ç á í ú ù é è É Ú Ó Á' });
      expect(response.body)
        .toMatchObject(
          {
            message: '222020444088088033033033088066602',
          },
        );
    });
});
