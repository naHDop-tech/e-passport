import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { pubSub } from '~/pub-sub/pub-sub.provider';
import { User } from '~/graphql.schema';
import { UserGuard } from '~/user/user.guard';
import { UserService } from '~/user/user.service';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import { UpdateUserDto } from '~/user/dto/update-user.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  @UseGuards(UserGuard)
  async findOneById(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') payload: CreateUserDto): Promise<User> {
    const createUser = await this.userService.create(payload);
    pubSub.publish('userCreated', { createUser });
    return createUser;
  }

  @Mutation('updateUser')
  async update(@Args('updateUserInput') payload: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userService.updateById(payload.id, payload);
    pubSub.publish('userUpdated', { updatedUser });
    return updatedUser;
  }

  @Subscription((returns) => User, {
    name: 'userCreated',
  })
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }

  @Subscription((returns) => User, {
    name: 'userUpdated',
  })
  userUpdated() {
    return pubSub.asyncIterator('userUpdated');
  }
}
