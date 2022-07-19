import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { pubSub } from '../pub-sub/pub-sub.provider';
import { User } from '../graphql.schema';
import { UserGuard } from './user.guard';
import { UserService } from '~/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  @UseGuards(UserGuard)
  async findOneById(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') payload: CreateUserDto): Promise<User> {
    const createdCat = await this.userService.create(payload);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
