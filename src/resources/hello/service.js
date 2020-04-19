import { HelloRepository } from './repository';

export default class HelloService {
    getHello() {
        const repository = new HelloRepository();
        return repository.getHello() + '**';
    }
}