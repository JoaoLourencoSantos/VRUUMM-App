import { CarDTO } from './cart.dto';
import { SimpleUserDTO } from './simple.user.dto';

export class SolicitationDTO {
  chaveIdentificacaoReserva:string;

  codigoUsuarioLocador: number | string;
  codigo: number | string;

  dataInicioReserva: string;
  dataFimReserva: string;
  dataDevolucao: string;
  situacao: string;
  precoTotal?: number | string;
  usuarioLocatario: SimpleUserDTO;
  carroAlugado: CarDTO;
}
