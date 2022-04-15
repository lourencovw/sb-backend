import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) { }

  find(searchQuery) {    
    return this.personRepository.createQueryBuilder().select()
      .where(`MATCH(birthday, name, address, phone_number, age) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
      .getMany();
  }
}
