import server from './server'
import PostRouterKafka from './presentation/post/kafka/routes'

(async () => {

    server.use("/kafka", PostRouterKafka())

    server.listen(3000, () => console.log("Running on http://localhost:3000"))

})()