import { PartialType } from "@nestjs/mapped-types";
import { NewCreateUserDto } from "./newCreateUser.dto";

export class NewUpdateUserDto extends PartialType(NewCreateUserDto) {}