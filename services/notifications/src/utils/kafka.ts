import { group } from "console";
import { Kafka } from "kafkajs";

// from kafka image
const brokers = ["0.0.0.0:9092"];

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: brokers,
});

// readonly topics array
const topics = ["message-created"] as const;

const consumer = kafka.consumer({
  groupId: "notification-service",
});

function messageCreatedHandler(data) {
  console.log("Got a new message", JSON.stringify(data, null, 2));
}

const topicsToSubscribe: Record<typeof topics[number], Function> = {
  "message-created": messageCreatedHandler,
};

// connect and subscribe to topics
export async function connectConsumer() {
  await consumer.connect();
  console.log("Connected to consumer");

  for (let i = 0; i < topics.length; i++) {
    await consumer.subscribe({
      topic: topics[i],
      fromBeginning: true,
    });
  }

  // what to do when we get a message on that topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message || !message.value) return;

      const data = JSON.parse(message.value.toString());
      const handler = topicsToSubscribe[topic];

      if (handler) {
        handler(data);
      }
    },
  });
}

export async function disconnectConsumer() {
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}
