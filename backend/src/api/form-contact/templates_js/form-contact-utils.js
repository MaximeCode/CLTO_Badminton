'use strict';

const mailSubjects = {
  inscription: "Inscription",
  renseignement: "Renseignement",
  partenariat: "Partenariat",
  jeune: "Jeune",
  adulte: "Adulte",
  veteran: "Vétéran",
  competition: "Compétition",
  loisir: "Loisir",
  autre: "Autre",
};

const BRAND = {
  blue: "#0153b6",
  blueAccent: "#013d87",
  navy: "#0a1f3d",
  gold: "#da9619",
  foreground: "#030213",
  muted: "#717182",
  background: "#f5f7fa",
  white: "#ffffff",
  border: "#e6e6e6",
  headerGradient:
    "linear-gradient(to bottom right, #0153b6 0%, #013d87 45%, #da9619 90%, #da9619 100%)",
};

function formatSubject(subject) {
  return mailSubjects[subject] || subject || "—";
}

function buildPlainText({ name, email, phone, subject, message }) {
  return [
    "Formulaire de contact — CLTO Badminton",
    "",
    `Client : ${name}`,
    `Email : ${email}`,
    `Téléphone : ${phone}`,
    `Sujet : ${subject}`,
    "",
    "Message :",
    message || "Aucun message",
  ].join("\n");
}

module.exports = {
  BRAND,
  formatSubject,
  buildPlainText,
};
