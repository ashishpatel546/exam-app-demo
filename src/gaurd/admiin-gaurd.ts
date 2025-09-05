import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";


export class AdminGaurd implements CanActivate{
    constructor(
        private readonly user: UserService
    ){}
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest()
        const email = req.email
        if(!email){
            return false;
        }
        const user = await this.user.findUserByEmail(email)
        if(user?.role !== 'admin')
            return false
        return true
    }
}