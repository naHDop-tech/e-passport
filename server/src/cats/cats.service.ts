import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from '../graphql.schema';

@Injectable()
export class CatsService {
  private readonly cats: Array<Cat & { ownerId?: number }> = [
    { id: 1, name: 'Cat', age: 5, ownerId: 1 },
  ];

  create(payload: CreateCatDto): Cat {
    const cat: Cat = {
      id: this.cats.length + 1,
      name: payload.name,
      age: payload.age,
    };
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
