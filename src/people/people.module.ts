import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService],
  imports: [TypeOrmModule.forFeature([Person])]
})
export class PeopleModule {}
