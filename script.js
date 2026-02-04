/* ================= CARD CONTROL ================= */
const cards = {
  landing: byId("card-landing"),
  message: byId("card-message"),
  form: byId("card-form"),
  success: byId("card-success")
};

function byId(id){ return document.getElementById(id); }

function nextCard(name){
  Object.values(cards).forEach(c => c.classList.add("hidden"));
  cards[name].classList.remove("hidden");
}

/* ================= TYPE EFFECT ================= */
const text =
  "Semoga panjang umur, sehat selalu, dan semua mimpimu tercapai 💖";
let i = 0;
(function type(){
  if(i < text.length){
    byId("typing").innerHTML += text[i++];
    setTimeout(type, 50);
  }
})();

/* ================= TELEGRAM CONFIG ================= */
// 🔥 GANTI INI
const BOT_TOKEN = "8587663172:AAHL9V8Tpyv6Ek7sJXgKHYiP0LfgWKcPcyk";
const CHAT_ID   = "8116752882";

/* ================= FORM SUBMIT ================= */
byId("form").addEventListener("submit", async e => {
  e.preventDefault();

  const data = new FormData(e.target);

  const message = `
🎉 *Birthday Message*

👤 Nama: ${data.get("nama")}

🌈 Keinginan: ${data.get("keinginan")}
🎯 Target: ${data.get("target")}
🔁 Ingin diubah: ${data.get("ubah")}
😊 Bahagia karena: ${data.get("bahagia")}
💌 Pesan diri: ${data.get("pesan")}
`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  });

  nextCard("success");
});

/* ================= CONFETTI ================= */
const c = byId("confetti");
const ctx = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;

const confetti = Array.from({length:120}, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height
}));

(function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  confetti.forEach(p => {
    ctx.fillStyle = "#ff4fd8";
    ctx.fillRect(p.x, p.y, 4, 4);
    p.y += 2;
    if(p.y > c.height) p.y = 0;
  });
  requestAnimationFrame(draw);
})();
