import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


export class EmailGaurd implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const email = req.email
        if(!email){
            return false;
        }
        return true
    }
}