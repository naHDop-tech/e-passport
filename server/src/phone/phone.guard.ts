import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '~/jwt/jwt.service';

@Injectable()
export class PhoneGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const Authorization = request.get('Authorization');
    const token = Authorization.replace('Bearer ', '');

    const data = this.jwtService.validateToken(token);
    return !!data.id;
  }
}
