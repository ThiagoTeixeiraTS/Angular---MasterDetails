import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category} from  "./Pages/categories/Shared/category.model"
export class InMemoryDatabase implements InMemoryDbService{
    createDb(){
        const categories: Category[] = [
            {id:1, name: 'Lazer', description: 'Cinema, parque, praias e etc'},
            {id:2, name: 'Moradia', description: 'Pagamento de contas da casa'},
            {id:3, name: 'Saúde', description: 'Plano de Saúde e Remédios'},
            {id:4, name: 'Salário', description: 'Recebimento de salário'},
            {id:5, name: 'Freelas', description: 'Trabalhos como Freelancer'}

        ];    
        return  {categories}
    }
}