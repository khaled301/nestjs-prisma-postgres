import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    async canActivate(context: ExecutionContext){
        try{
            const request = context.switchToHttp().getRequest();
            const authorization = request.headers.authorization; // 'Bearer <token>'
            const token = authorization.split(' ')[1];

            if(!token){
                throw new UnauthorizedException('Unauthorized');
            }

            const tokenPayload = await this.jwtService.verifyAsync(token);
            // console.log(tokenPayload);

            request.staff = {
                id: tokenPayload.sub,
                name: tokenPayload.username
            }

            return true;
        }catch(e){
            throw new UnauthorizedException();
        }
    }
}