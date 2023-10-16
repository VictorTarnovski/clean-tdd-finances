import 'module-alias/register'
import app from './config/app'
import env from './config/env'
import mongoHelper from '@/infra/db/mongodb/mongo-helper'


mongoHelper.connect(env.mongo_url).then(() => {
    app.listen(env.port, () => {
        console.log(`Server running at http://localhost:${env.port}`)
        mongoHelper.getCollection("errors").then((collection) => { collection.deleteMany() ; return })
    })   
})