import { IsBoolean, IsOptional } from "class-validator";

export class NewUpdateUserSettingDto {
    @IsBoolean()
    @IsOptional()
    notificationIsOn?: boolean;
    smsEnabled?: boolean;
}