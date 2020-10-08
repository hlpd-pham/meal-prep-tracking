import { Module } from "@nestjs/common";
import * as knexfile from "./knexfile"
import { ObjectionModule } from "@willsoto/nestjs-objection"

@Module({
    imports: [
        ObjectionModule.register({
            config: knexfile["development"]
        })
    ]
})
export class DatabaseModule {}
