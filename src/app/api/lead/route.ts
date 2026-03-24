import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  resultText?: string;
  objectType?: string;
  objectTypeLabel?: string;
  roomType?: string;
  roomTypeLabel?: string;
  points?: number;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Telegram integration is not configured" },
      { status: 500 },
    );
  }

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const resultText = payload.resultText?.trim() ?? "";
  const objectTypeLabel = payload.objectTypeLabel?.trim() ?? "";
  const roomTypeLabel = payload.roomTypeLabel?.trim() ?? "";
  const points = typeof payload.points === "number" ? payload.points : 0;
  const digits = phone.replace(/\D/g, "");

  if (!name || digits.length !== 11 || !digits.startsWith("7") || !resultText || !objectTypeLabel || !points) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const messageLines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Ориентировочная стоимость:</b> ${escapeHtml(resultText)}`,
    "",
    "<b>Параметры калькулятора</b>",
    `<b>Тип объекта:</b> ${escapeHtml(objectTypeLabel)}`,
    `<b>Количество комнат:</b> ${escapeHtml(roomTypeLabel || "Не выбрано")}`,
    `<b>Количество точек:</b> ${points}`,
  ];

  const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageLines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    const details = await telegramResponse.text();
    return NextResponse.json(
      { error: "Telegram request failed", details },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
