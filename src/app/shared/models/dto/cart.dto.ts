export class CarDTO {
  public id?: number | string;
  public placa?: string;
  public modelo?: string;
  public marca?: string;
  public cor?: string;
  public numeroDeAssentos?: number;
  public precoDaDiaria?: number | string;

  public disponibilidade?: boolean;

  public descricao?: string;

  public imagem?: string;

  constructor(modelo?: string, marca?: string, imagem?: string) {
    this.modelo = modelo;
    this.marca = marca;
    this.imagem = imagem;
  }

  isValid() {
    return (
      this.modelo &&
      this.marca &&
      this.placa &&
      this.numeroDeAssentos &&
      this.precoDaDiaria
    );
  }

  isNumberSeatsValid() {
    return this.numeroDeAssentos < 12;
  }
}
