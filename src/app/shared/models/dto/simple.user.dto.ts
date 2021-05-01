import { AddressDTO } from './address.dto';
import { UserTypeEnum } from '../enum/user.type.enum';

export class SimpleUserDTO {
  codigo?: string = null;

  email?: string = null;
  senha?: string = null;
  nome?: string = null;
  cpf?: string = null;
  numeroTelefone?: string = null;

  perfil?: UserTypeEnum = UserTypeEnum.LOCADOR;

  endereco?: AddressDTO = new AddressDTO();

  public static isValid(value: SimpleUserDTO): boolean {
    return value.email && value.nome && value.senha ? true : false;
  }

  public static trim(value: SimpleUserDTO) {
    value.email = value.email.trim();
    value.senha = value.senha.trim();
    value.nome = value.nome.trim();
  }
}
