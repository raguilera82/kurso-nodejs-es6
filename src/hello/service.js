import { HelloRepository } from './repository';

class HelloService {
    getHello() {
        const repository = new HelloRepository();
        return repository.getHello() + '**';
    }
}

export default HelloService;