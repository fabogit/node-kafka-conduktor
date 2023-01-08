import { Kafka } from "kafkajs";

// from kafka image
const brokers = ["0.0.0.0:9092"];

const kafka = new Kafka({
	clientId: "messages-app",
	brokers: brokers
});

const producer = kafka.producer();

// connect to kafka
export async function connectProducer() {
	await producer.connect();
}

// disconnect from kafka
export async function disconnectFromProducer() {
	return producer.disconnect();
}

// readonly topics array
const topics = ['message-created'] as const;

// produce a message
export async function sendMessage(topic: typeof topics[number], message: any) {
	return producer.send({
		topic,
		messages: [
			{ value: message }
		]
	});
}