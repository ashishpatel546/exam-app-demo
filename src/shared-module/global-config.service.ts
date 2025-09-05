import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { EnvDto } from "./dto/env.dto";
import {validateSync } from "class-validator";


@Injectable()
export class GlobalConfigService{
   envConfig: EnvDto

    constructor(){
        const config = plainToInstance(EnvDto, process.env)
        const errors = validateSync(this.envConfig)
        if(errors){
            throw Error(errors.toString())
        }
        this.envConfig = config
    }

    get env(): EnvDto{
        return this.envConfig
    }
}