import { MongoLogRespository } from "../../../infra/db/mongodb/log/mongo-log-repository"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log-controller.decorator"


export const makeLogControllerDecorator = (controller: Controller): Controller => {
    const mongoLogRespository = new MongoLogRespository()
    return new LogControllerDecorator(controller, mongoLogRespository)
}