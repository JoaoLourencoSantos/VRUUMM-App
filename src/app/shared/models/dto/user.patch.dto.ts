import { SimpleUserDTO } from './simple.user.dto';

export class UserPatchDTO {
  email: string;
  nome: string;
  cpf: string;
  senha: string;
  numeroTelefone: string;

  cepEndereco: string;
  logradouroEndereco: string;
  complementoEndereco: string;
  bairroEndereco: string;
  numeroEndereco: string;
  ufEndereco: string;

  constructor(user: SimpleUserDTO) {
    this.email = user.email || null;
    this.nome = user.nome || null;
    this.cpf = user.cpf || null;
    this.senha = user.senha || null;
    this.numeroTelefone = user.numeroTelefone || null;

    this.cepEndereco = user.endereco.cep || null;
    this.logradouroEndereco = user.endereco.logradouro || null;
    this.complementoEndereco = user.endereco.complemento || null;
    this.bairroEndereco = user.endereco.bairro || null;
    this.numeroEndereco = user.endereco.numero || null;
    this.ufEndereco = user.endereco.uf || null;
  }
}