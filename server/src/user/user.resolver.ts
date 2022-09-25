import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { pubSub } from '~/pub-sub/pub-sub.provider';
import { User } from '~/graphql.schema';
import { UserGuard } from '~/user/user.guard';
import { UserService } from '~/user/user.service';
import { CreateUserDto } from '~/user/dto/create-user.dto';
import { UpdateUserDto } from '~/user/dto/update-user.dto';
import { UserEmail } from '~/decorators/user-email.decorator';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('isUserExists')
  async isUserExists(@Args('email') email: string): Promise<boolean> {
    return this.userService.isUserExists(email);
  }

  @Query('user')
  @UseGuards(UserGuard)
  async findOneById(@UserEmail() userEmail: string): Promise<User> {
    return this.userService.findByEmail(userEmail);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') payload: CreateUserDto): Promise<User> {
    const createUser = await this.userService.create(payload);
    pubSub.publish('userCreated', { createUser });
    return createUser;
  }

  @Mutation('updateUser')
  async update(
    @Args('updateUserInput') payload: UpdateUserDto,
    @UserEmail() userEmail: string,
  ): Promise<User> {
    const updatedUser = await this.userService.updateByEmail(
      userEmail,
      payload,
    );
    pubSub.publish('userUpdated', { updatedUser });
    return updatedUser;
  }

  // @Mutation('uploadUserImage')
  // async uploadUserImage(
  //   @Args('file', { type: () => gqlUpload.GraphQLUpload })
  //   file: gqlUpload.FileUpload,
  // ) {
  //   const { createReadStream, filename, mimetype, encoding } = await file;

  //   const stream = createReadStream();

  //   const out = fs.createWriteStream(`${filename}.${mimetype.split('/')[1]}`);
  //   stream.pipe(out);
  //   await finished(out);

  //   return { filename, mimetype, encoding };
  // }

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
