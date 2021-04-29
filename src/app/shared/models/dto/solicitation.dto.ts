export class SolicitationDTO {
  id: number | string;

  dataInicioReserva: string;
  dataDevolucao: string;
  situacao: string;
  preco?: number | string;
}
