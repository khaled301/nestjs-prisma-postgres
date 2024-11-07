import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
// default strategy is 'local' but we can change it to our own
// If we do then we must pass the custom strategy name in the Strategy class where we extend the PassportStrategy
// created using the AuthGuard factory and the strategy name is 'auth-local'
export class PassportLocalGuard extends AuthGuard("auth-local") {}