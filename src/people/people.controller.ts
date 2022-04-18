import { Controller, Get, Query } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  find(@Query('searchQuery') searchQuery) {
    return this.peopleService.find(searchQuery);
  }

  @Get('suggestions')
  findSuggestions(@Query('searchQuery') searchQuery) {
    return this.peopleService.findSuggestions(searchQuery);
  }
}
