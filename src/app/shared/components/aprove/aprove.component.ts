import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RentStateEnum } from '../../models/enum/rent.state.enum';
import { ConsumerService } from './../../../core/socket/consumer.service';
import { RentService } from './../../../modules/main/modules/services/rent.service';
import { SolicitationDTO } from './../../models/dto/solicitation.dto';
import { StoreDTO } from './../../models/dto/store.dto';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-aprove',
  templateUrl: './aprove.component.html',
  styleUrls: ['./aprove.component.scss'],
})
export class AproveComponent implements OnInit {
  public $store: BehaviorSubject<StoreDTO>;

  constructor(
    public consumer: ConsumerService,
    private rentService: RentService,
    private toastService: ToastService
  ) {
    this.$store = consumer.getMessages();
  }

  ngOnInit(): void {}

  public getImage(name?: string): string {
    return (
      `https://ui-avatars.com/api/?color=787878&name=${name}` ||
      '../../../../../../../assets/images/default-car.png'
    );
  }

  public aprove({ codigo, situacao }: SolicitationDTO) {
    if (situacao !== 'PENDENTE') {
      this.toastService.baseWarnAlertWithMessage(
        'Esta solicitação já foi aprovada!'
      );

      return;
    }

    this.update(codigo, 'EM_ANDAMENTO' as RentStateEnum);
  }

  public reprove({ codigo }: SolicitationDTO) {
    this.update(codigo, 'REJEITADO' as RentStateEnum);
  }

  private update(code: number | string, status: RentStateEnum) {
    this.rentService.update(code, status).subscribe(
      (result) => {
        if (!result) return;

        if (!result.sucesso) {
          this.toastService.baseWarnAlertWithMessage(result.mensagem);
          return;
        }

        this.toastService.successAlert();

        this.consumer.remove(code);
      },
      ({ error }) => {
        this.toastService.baseWarnAlertWithMessage(error.mensagem);
      }
    );
  }
}
