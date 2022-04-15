import { IsDate, IsDefined, IsString } from "class-validator";

export class CreatePersonDto {
    @IsDefined()
    @IsString()
    _id: string;

    @IsDefined()
    @IsString()
    picture: string;

    @IsDefined()
    @IsDate()
    birthday: Date;

    @IsString()
    name: string;

    @IsString()
    @IsDefined()
    address: string;

    @IsDefined()
    @IsString()
    phone_number: string;
}
