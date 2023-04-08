import { IsNotEmpty } from "class-validator";
import { IsEmail } from "class-validator/types/decorator/decorators";

export class createUser {

    id_users: number;

    @IsNotEmpty({

        message: "Merci d'indiquer votre nom pour pouvoir créer un compte :)"
    })
    name: string;

    @IsNotEmpty({

        message: "Merci d'indiquer votre mail pour pouvoir créer un compte :)"
    })

    @IsEmail
        (
            {},
            {
                message: "l'Email indiqué n'est pas valide...."
            },
        )
    mail: string;


    @IsNotEmpty({

        message: "Merci d'indiquer votre password pour pouvoir créer un compte :)"
    })
    password: string;


}