import { AssocIngrediente } from './AssocIngrediente';

export class Receita{
  idreceita: number;
  verificada: boolean;
  nome: string;
  nome_usuario: string;
  favorito: boolean;
  logadoComoAutor: boolean;
  descricao: string;
  modo_preparo: string;
  tempo_preparo:number;
  rendimento: number;
  ingredientes: AssocIngrediente[];
  informacoes_adicionais: string;
  imagem: string;
}
