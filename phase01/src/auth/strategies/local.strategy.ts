import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { validateStaffDto } from "../dto/validateStaff.dto";

@Injectable()
// default strategy name is 'local', here we are using custom strategy name auth-local
// this will allow us to use the same Strategy as based of multiple local strategies
// local strategy is using Passport factory function and strategy from passport local library
export class LocalStrategy extends PassportStrategy(Strategy, 'auth-local') {
    constructor(private readonly authService: AuthService) {
        // to call the constructor of the parent class PassportStrategy
        // default allowed fields are "username" and "password" in the parent class
        // so we need to override the fields if we use different fields to validate
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    // validate is the function that will be called by passport.authenticate
    // it will be called with the username(email in this case) and password passed by the user
    // if the credentials are valid, it will return the user object
    async validate(email: string, password: string): Promise<any> {
        const validatedStaff = await this.authService.validateUser({email, password});

        if(!validatedStaff){
            throw new UnauthorizedException();
        }

        return validatedStaff;
    }
}