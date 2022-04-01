import { Receita } from "./Receita";

export class Comentario{
  idcomentario: number;
  receita: Receita;
  logadoComoAutor: boolean;
  nome_usuario: string;
  conteudo: string;
  timestamp: Date;
}
