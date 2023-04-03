import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories = [
            {id:1, nome: 'Lazer', description: 'Cinema, parque, praias e etc'},
            {id:2, nome: 'Moradia', description: 'Pagamento de contas da casa'},
            {id:3, nome: 'Saúde', description: 'Plano de Saúde e Remédios'},
            {id:4, nome: 'Salário', description: 'Recebimento de salário'},
            {id:5, nome: 'Freelas', description: 'Trabalhos como Freelancer'}

        ];    
        return  {categories}
    }
}