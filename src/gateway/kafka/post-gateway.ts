import { randomUUID } from "crypto";
import { Post } from "../../domain/entities/post";
import { KafkaHelper } from '../../infra/brokers/kafka';
import { HttpResponse, success } from '../../infra/protocols/http';
import { PostGatewayInterface } from "../../interfaces/gateway/post-gateway";


export class PostGatewayKafka implements PostGatewayInterface {

    async createPost(post: Post): Promise<HttpResponse> {
        const producer =  await KafkaHelper.getClient()[0]
        const id =   randomUUID()
        const payload = { 
            id,
           ...post
        }
        await producer.send({
            topic: 'test-topic',
            messages: [
              { value: 'Hello KafkaJS user!' },
            ],
          })
          await producer.disconnect()
       return success(payload);
      }

      

      async getPosts(): Promise<HttpResponse> {
        const consumer =  await KafkaHelper.getClient()[1]
             await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              console.log({
                value: message.value.toString(),
              })
            },
          })
       return success({});
      }
 
}