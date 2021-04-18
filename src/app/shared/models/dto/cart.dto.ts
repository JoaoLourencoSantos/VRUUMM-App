export class CarDTO {
  public codigo?: number | string;
  public placa?: string;
  public modelo?: string;
  public marca?: string;
  public cor: string ;
  public numeroDeAssentos?: number;
  public precoDaDiaria?: number | string;

  public disponibilidade?: boolean = null;

  public descricao?: string = null;

  public imagem?: string;

  public codigoUsuarioDonoDoCarro: number;

  constructor(
    modelo?: string,
    marca?: string,
    imagem?: string,
    disponibilidade?: boolean
  ) {
    this.modelo = modelo;
    this.marca = marca;
    this.imagem = imagem;
    this.disponibilidade = disponibilidade;
  }

  public static isValid(car: CarDTO) {
    return (
      car.modelo &&
      car.marca &&
      car.placa &&
      car.numeroDeAssentos &&
      car.precoDaDiaria
    );
  }

  public static isNumberSeatsValid(car: CarDTO) {
    return car.numeroDeAssentos < 12;
  }
}
