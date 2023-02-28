import { Consumer, Kafka, Producer } from 'kafkajs'

export class KafkaHelper {
static kafka: Kafka;
static producer: Producer
static consumer: Consumer

  static async getClient(): Promise<[Producer,Consumer]> {
    if (!this.kafka) {

         this.kafka =   new Kafka({
            clientId: 'my-app',
            brokers: ['kafka1:9092', 'kafka2:9092']
          })

          this.producer = this.kafka.producer()
          this.consumer = this.kafka.consumer({ groupId: 'test-group' })

         await this.producer.connect()
         await this.consumer.connect()
         await this.consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    }
    return [this.producer,this.consumer]
  }
}