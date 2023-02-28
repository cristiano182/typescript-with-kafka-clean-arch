import express from 'express'
import { Request, Response } from 'express'
import { PostGatewayKafka } from '../../../gateway/kafka/post-gateway'
import { CreatePostApplication } from '../../../domain/application/create-post'
import { GetPostsApplication } from '../../../domain/application/get-post'
import { CreatePostApplicationInterface } from '../../../interfaces/application/create-post'
import { GetPostsApplicationInterface } from '../../../interfaces/application/get-post'
import { PostGatewayInterface } from '../../../interfaces/gateway/post-gateway'


export default  function PostRouter() {

const postGatewayKafka: PostGatewayInterface =  new PostGatewayKafka()

const createPostApplicationKafka: CreatePostApplicationInterface = new CreatePostApplication(postGatewayKafka)
const getPostsApplicationKafka: GetPostsApplicationInterface = new GetPostsApplication(postGatewayKafka)


const router = express.Router()


    router.get('/', async (req: Request, res: Response) => {
        const post =  await getPostsApplicationKafka.execute()
        return res.status(post.statusCode).json(post.body);
    })

    router.post('/', async (req: Request, res: Response) => {
        const post = await createPostApplicationKafka.execute(req.body);
          return res.status(post.statusCode).json(post.body);
    })

    return router
}