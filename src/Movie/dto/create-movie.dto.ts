import { IsBoolean, IsDate, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly picture: string;

    @IsString()
    @IsNotEmpty()
    readonly synopsis: string;

    @IsString()
    @IsNotEmpty()
    readonly movie: string;

    @IsString()
    @IsNotEmpty()
    readonly rating: number;

    @IsString()
    @IsNotEmpty()
    readonly slug: string;
}
