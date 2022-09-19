import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '~/jwt/jwt.service';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const context = GqlExecutionContext.create(ctx);
    const request = context.getContext().req;
    const Authorization = request.get('Authorization');
    const token = Authorization.replace('Bearer ', '');

    const jwtService = new JwtService(process.env.JWT_SECRET_KEY);

    const data = jwtService.validateToken(token);

    if (!data) {
      throw new Error('No token available');
    }

    return data.id;
  },
);
