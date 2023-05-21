// import { IsEmail, IsOptional, Matches, MinLength } from 'class-validator';
import { IsEmail, Matches, MinLength } from 'class-validator';
import { RoleEnumType } from 'src/users/Dto/users.entity/users.entity';

export class CreateAuthDto {
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
    @Matches(
        /^(?=.*[0-9])(?=.*[!@#\$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).+$/,
        { message: 'Format du mot de passe invalide' },
    )
    password: string;
    @MinLength(2, {
        message: 'Le nom doit faire au moins 2 caractères',
    })

    name: string;

    role?: RoleEnumType;
}
