#!/usr/bin/env node

/**
 * Экспорт ответов гостей из Firestore в CSV (открывается в Excel / Google Sheets).
 *
 * Подготовка (один раз):
 * 1. Firebase Console → marriage-evening → ⚙️ Project settings → Service accounts
 * 2. «Generate new private key» → сохраните JSON в корень проекта
 *    (например serviceAccountKey.json — файл уже в .gitignore)
 *
 * Запуск:
 *   npm run export:rsvps
 *   npm run export:rsvps -- --out exports/rsvps.csv
 */

import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const args = process.argv.slice(2);
const outArgIndex = args.indexOf("--out");
const outputPath = resolve(
  projectRoot,
  outArgIndex >= 0 ? args[outArgIndex + 1] : "exports/rsvps.csv",
);

const keyPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ??
  resolve(projectRoot, "serviceAccountKey.json");

function loadServiceAccount() {
  try {
    return JSON.parse(readFileSync(keyPath, "utf8"));
  } catch {
    console.error(
      [
        "Не найден ключ сервисного аккаунта.",
        "",
        "Скачайте его в Firebase Console:",
        "Project settings → Service accounts → Generate new private key",
        "",
        `Сохраните как: ${keyPath}`,
        "или задайте переменную GOOGLE_APPLICATION_CREDENTIALS",
      ].join("\n"),
    );
    process.exit(1);
  }
}

function escapeCsv(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function formatAttending(value) {
  if (value === true) return "Да";
  if (value === false) return "Нет";
  return "";
}

function formatTransfer(value) {
  if (value === "bus") return "Автобус";
  if (value === "self") return "Самостоятельно";
  return "";
}

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "";
  return timestamp.toDate().toLocaleString("ru-RU", {
    timeZone: "Asia/Yekaterinburg",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const serviceAccount = loadServiceAccount();

initializeApp({
  credential: cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const snapshot = await getFirestore()
  .collection("rsvps")
  .orderBy("createdAt", "asc")
  .get();

const headers = [
  "Дата ответа",
  "Имя и фамилия",
  "Придёт на вечер",
  "Трансфер",
  "Телефон",
  "Комментарий",
];

const rows = snapshot.docs.map((doc) => {
  const data = doc.data();
  return [
    formatDate(data.createdAt),
    data.fullName ?? "",
    formatAttending(data.attending),
    formatTransfer(data.transfer),
    data.phone ?? "",
    data.comment ?? "",
  ];
});

const csvBody = [headers, ...rows]
  .map((row) => row.map(escapeCsv).join(","))
  .join("\r\n");

// BOM для корректного открытия кириллицы в Excel
const csv = `\uFEFF${csvBody}`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, csv, "utf8");

console.log(`Экспортировано записей: ${rows.length}`);
console.log(`Файл: ${outputPath}`);
