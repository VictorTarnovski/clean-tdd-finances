import { MongoLogRespository } from "@/infra/db/mongodb/mongo-log-repository"
import { Controller } from "@/presentation/protocols"
import { LogControllerDecorator } from "@/main/decorators/log-controller.decorator"


export const makeLogControllerDecorator = (controller: Controller): Controller => {
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(controller, mongoLogRespository)
}