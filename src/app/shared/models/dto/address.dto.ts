export class AddressDTO {
  codigo?: number = null;
  cep: string = null;
  localidade: string = null;
  logradouro: string = null;
  numero: string = null;
  complemento: string = null;
  bairro: string = null;
  uf: string = null;

  public static isValid(value: AddressDTO): boolean {
    return value.numero && value.cep ? true : false;
  }
}
