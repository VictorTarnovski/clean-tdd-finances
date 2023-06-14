import 'dotenv/config'

export default {
    mongo_url: process.env.MONGO_URL || '',
    port: process.env.PORT || 5050
}