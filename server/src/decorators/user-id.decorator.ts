import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '~/jwt/jwt.service';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const Authorization = request.get('Authorization');
    const token = Authorization.replace('Bearer ', '');
    const jwtService = new JwtService(process.env.JWT_SECRET_KEY);

    const data = jwtService.validateToken(token);

    if (!data) {
      throw new Error('Bad request');
    }

    return data.id;
  },
);
