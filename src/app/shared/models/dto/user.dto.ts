import { AddressDTO } from './address.dto';
import { UserTypeEnum } from '../enum/user.type.enum';

export class UserDTO {
  emailUsuario: string;
  senhaUsuario: string;
  nomeUsuario: string;
  cpfUsuario: string;
  numeroTelefoneUsuario: string;

  perfilUsuario: UserTypeEnum = UserTypeEnum.LOCADOR;

  endereco: AddressDTO = new AddressDTO();

  public isValid(): boolean {
    return this.emailUsuario && this.nomeUsuario && this.senhaUsuario
      ? true
      : false;
  }

  public isPassConfirmValid(confirmation: string): boolean {
    return this.senhaUsuario === confirmation;
  }

  public isPassValid(): boolean {
    return this.senhaUsuario.length >= 6;
  }

  public trim() {
    this.emailUsuario = this.emailUsuario.trim();
    this.senhaUsuario = this.senhaUsuario.trim();
    this.nomeUsuario = this.nomeUsuario.trim();
  }
}
