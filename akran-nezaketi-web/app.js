"use strict";
const scenes = [
  { image: "assets/1.png", location: "Sınıf", value: "Dinlemek ve destek olmak", title: "Yanındayım.", description: "Derya, kendisiyle alay edildiğini Umut’a anlatır. Umut dikkatle dinler ve birlikte öğretmenlerinden destek istemeyi önerir.", quote: "“Yanındayım. Öğretmenimizle birlikte konuşalım.”", question: "Bir arkadaşın üzgün olduğunda onu nasıl dinlersin?", alt: "Derya sınıfta üzgün bir şekilde Umut ile konuşuyor; Umut onu dikkatle dinliyor." },
  { image: "assets/2.png", location: "Kantin", value: "Herkesin hakkına saygı", title: "Birlikte bekleyelim.", description: "Nida ve Derya kantin sırasında bekler. Derya’nın hatırlatmasıyla Umut özür diler ve sıranın sonuna geçer.", quote: "“Haklısın, özür dilerim.”", question: "Sıranı beklemek, başkalarına ne hissettirir?", alt: "Nida kantin tezgâhının önünde, Derya arkasında, Umut sıranın yanında duruyor." },
  { image: "assets/3.png", location: "Koridor", value: "Küçük bir yardımı fark etmek", title: "İyilik elden ele.", description: "Nida’nın sarı defteri yere düşer. Derya defteri alıp ona uzatırken Umut durur ve alan bırakır. Bir gülümseme teşekkür etmeye yeter.", quote: "Bazen hiçbir şey söylemeden de yanında olabilirsin.", question: "Bugün hangi küçük yardımı fark ettin?", alt: "Üç arkadaş koridorda yürüyor; Nida elinde sarı defterini tutuyor." },
  { image: "assets/4.png", location: "Sınıf", value: "Kimseyi dışarıda bırakmamak", title: "Burada yerin var.", description: "Nida boş sandalyeyi çekerek Derya’yı davet eder. Umut defterini ortaya koyar. Üç arkadaş birlikte çalışmaya başlar.", quote: "Bir sandalye açılır, bir arkadaşlık güçlenir.", question: "Grubunda bir arkadaşına nasıl yer açabilirsin?", alt: "Umut ve Nida sınıfta oturuyor; Derya için aralarında boş bir sandalye bulunuyor." }
];
let current = 0;
let timer = null;
const $ = (selector) => document.querySelector(selector);
const dots = $(".dots");
scenes.forEach((scene, index) => {
  const button = document.createElement("button");
  button.className = "dot";
  button.type = "button";
  button.setAttribute("aria-label", `${index + 1}. sahne: ${scene.title}`);
  button.addEventListener("click", () => { stopAutoplay(); showScene(index); });
  dots.append(button);
});
function showScene(index) {
  current = (index + scenes.length) % scenes.length;
  const scene = scenes[current];
  $("#scene-image").src = scene.image;
  $("#scene-image").alt = scene.alt;
  $("#scene-location").textContent = scene.location.toLocaleUpperCase("tr");
  $("#slide-number").textContent = String(current + 1).padStart(2, "0");
  for (const field of ["value", "title", "description", "quote", "question"]) {
    $("#scene-" + field).textContent = scene[field];
  }
  [...dots.children].forEach((button, i) => {
    button.classList.toggle("selected", i === current);
    button.setAttribute("aria-pressed", String(i === current));
  });
}
function stopAutoplay() {
  clearInterval(timer); timer = null;
  $("#autoplay").textContent = "▷ Otomatik göster";
  $("#autoplay").setAttribute("aria-pressed", "false");
}
$("#previous").addEventListener("click", () => { stopAutoplay(); showScene(current - 1); });
$("#next").addEventListener("click", () => { stopAutoplay(); showScene(current + 1); });
$("#autoplay").addEventListener("click", () => {
  if (timer) return stopAutoplay();
  timer = setInterval(() => showScene(current + 1), 8000);
  $("#autoplay").textContent = "Ⅱ Gösteriyi duraklat";
  $("#autoplay").setAttribute("aria-pressed", "true");
});
$("#fullscreen").addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if ($("#presentation").requestFullscreen) await $("#presentation").requestFullscreen();
    else $("#presentation").classList.toggle("expanded");
  } catch { $("#presentation").classList.toggle("expanded"); }
});
document.addEventListener("fullscreenchange", () => {
  $("#fullscreen").setAttribute("aria-label", document.fullscreenElement ? "Tam ekrandan çık" : "Sunumu tam ekran aç");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") $("#presentation").classList.remove("expanded");
  if ($("#sahneler").hidden || !["ArrowRight", "ArrowLeft"].includes(event.key)) return;
  event.preventDefault(); stopAutoplay();
  showScene(current + (event.key === "ArrowRight" ? 1 : -1));
});
function navigate() {
  const valid = ["kahramanlar", "hikaye", "sahneler", "video"];
  const requested = location.hash.slice(1);
  const target = valid.includes(requested) ? requested : "kahramanlar";
  if (target !== "sahneler") stopAutoplay();
  document.querySelectorAll(".page").forEach(page => {
    page.hidden = page.id !== target;
    page.classList.toggle("active", page.id === target);
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    const active = link.hash === "#" + target;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "instant" });
}
window.addEventListener("hashchange", navigate);
document.addEventListener("visibilitychange", () => { if (document.hidden) stopAutoplay(); });
const videoUrl = String(window.SITE_CONFIG?.videoUrl || "").trim();
try {
  const url = new URL(videoUrl);
  if (!["https:", "http:"].includes(url.protocol)) throw new Error("Unsupported URL");
  $("#video-link").href = url.href;
  $("#video-link").hidden = false;
  $("#video-pending").hidden = true;
  $("#video-external").hidden = false;
} catch { /* Video bağlantısı eklenene kadar dürüst bir bekleme durumu gösterilir. */ }
showScene(0); navigate();
