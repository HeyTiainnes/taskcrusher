import { IsEmail, Matches, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail(
        {},
        {
            message: "Format d'email invalide",
        },
    )
    @Matches(/^((?!yopmail\.com).)*$/, {
        message: 'Ce nom de domaine est interdit',
    })
    mail: string;

    @MinLength(8, {
        message: 'Le mot de passe doit faire au moins 8 caractères',
    })

    name: string;
    @Matches(
        /(?=.*\d)(?=.*[!@#$%^&/£.,;?:§µ¤~*"'-|`]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Format du mot de passe invalide' },
    )
    password: string;
}