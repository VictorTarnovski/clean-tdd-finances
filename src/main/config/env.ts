import 'dotenv/config'

export default {
    mongo_url: process.env.MONGO_URI || 'mongodb://localhost:27017',
    port: process.env.PORT || 5050,
    jwtSecret: process.env.JWT_SECRET || 'xtebc0zwKYa714q8K50n'
}