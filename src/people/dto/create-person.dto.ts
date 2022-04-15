import { IsDefined, IsString } from "class-validator";

export class CreatePersonDto {
    @IsDefined()
    @IsString()
    _id: string;

    @IsDefined()
    @IsString()
    picture: string;

    @IsDefined()
    @IsString()
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
