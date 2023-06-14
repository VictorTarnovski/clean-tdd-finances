import app from './config/app'
import mongoHelper from '../infra/db/mongodb/mongo-helper'
import env from './config/env'

mongoHelper.connect(env.mongo_url).then(() => {
    app.listen(env.port, () => {
        console.log(`Server running at http://localhost:${env.port}`)
    })   
})