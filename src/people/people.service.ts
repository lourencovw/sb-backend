import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  private selection = ["birthday", "name", "address", "phone_number", "age"];

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) { }

  find(searchQuery) {
    const _searchQuery = this.createSearchQueryInBooleanMode(searchQuery.trim())
      .map(str => str + '*'   )
      .join(' ')
      
    return this.personRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH(birthday, name, address, phone_number, age) AGAINST ('${_searchQuery}' IN BOOLEAN MODE)`)
      .getMany();
  }

  async findSuggestions(searchQuery) {
    if (searchQuery === '') { return '' }

    const inputs = this.createSearchQueryInBooleanMode(searchQuery)
    const _searchQuery = inputs.slice(-1)[0];

    if (!_searchQuery) { return searchQuery }

    const response: CreatePersonDto[] = await this.personRepository
      .createQueryBuilder()
      .select(this.selection)
      .where(`MATCH(birthday, name, address, phone_number, age) AGAINST ('+${_searchQuery}*' IN BOOLEAN MODE)`)
      .limit(1)
      .execute();

    if (response[0]) { // There is a suggestion
      const autocompleteSuggestion = Object
        .values(response[0])
        .reduce((previousValue, currentValue) => previousValue + ' ' + currentValue.replace(/[\W_]+/g, " "), '')
        .trim()
        .split(' ')
        .find(item => item.toLowerCase().startsWith(_searchQuery.toLowerCase()));

      inputs.splice(inputs.length - 1, 1, autocompleteSuggestion);
      return inputs.join(' ')
    }

    return searchQuery; // There is no suggestion
  }

  createSearchQueryInBooleanMode(searchQuery) {
    return searchQuery
      .replace(/[\W_]+/g, " ") // Replace all non alphanumeric characters with whitespace
      .split(' ')
      .map(str => str.trim())
  }

}
