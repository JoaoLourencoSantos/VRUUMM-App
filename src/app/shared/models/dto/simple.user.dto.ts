import { UserTypeEnum } from '../enum/user.type.enum';
import { AddressDTO } from './address.dto';

export class SimpleUserDTO {
  codigo?: string = null;

  email?: string = null;
  nome?: string = null;
  cpf?: string = null;
  numeroTelefone?: string = null;

  perfil?: UserTypeEnum = UserTypeEnum.LOCADOR;

  endereco?: AddressDTO = new AddressDTO();

  public static isValid(value: SimpleUserDTO): boolean {
    return value.email && value.nome ? true : false;
  }

  public static trim(value: SimpleUserDTO) {
    value.email = value.email.trim();
    value.nome = value.nome.trim();
  }
}
