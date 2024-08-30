"use server"

import { GetGeminiResponseTextParams } from "@/app/_actions/_types/GetGeminiResponseTextParams";
import { geminiModel } from "@/gemini";
import { PrismaSingleton } from "@/prisma"
import { Prisma } from "@prisma/client";

const prisma = PrismaSingleton.getClient();

export async function getChat() {
    return await prisma.chat.findMany();
}

export async function pushChat(data: Prisma.ChatCreateInput) {
    await prisma.chat.create({
        data: { content: data.content.trim(), name: data.name }
    });
}

export async function getGeminiResponseText(params: GetGeminiResponseTextParams) {
    const chat = geminiModel.startChat({
        history: params.history.map((item, index) => ({
            role: index % 2 == 0 ? "user" : "model",
            parts: [{ text: item }]
        }))
    });

    const result = await chat.sendMessage(params.message);
    return result.response.text();
}

export async function clearChat() {
    await prisma.chat.deleteMany();
}