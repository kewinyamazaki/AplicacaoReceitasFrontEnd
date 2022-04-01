import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public apresentarMenssagemSucesso(mensagem: string): void {
    this.messageService.add(
      {
        severity: 'success',
        summary: 'Sucesso!',
        detail: mensagem
      }
    );
  }

  public apresentarMenssagemInfo(mensagem: string, informativo: boolean = false): void {
    this.messageService.add(
      {
        severity: informativo ? 'info' : 'warn',
        summary: 'Informação!',
        detail: mensagem
      }
    );
  }
  public apresentarMenssagemErro(mensagem: string): void {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Erro!',
        detail: mensagem
      }
    );
  }

}
