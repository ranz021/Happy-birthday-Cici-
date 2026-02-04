function byId(id){return document.getElementById(id)}

// --- BOT ---
const BOT_TOKEN = "ISI_TOKEN_BOT_KAMU";
const CHAT_ID  = "ISI_CHAT_ID_KAMU";

// --- CARDS ---
const cards={
  landing:byId("card-landing"),
  message:byId("card-message"),
  form:byId("card-form"),
  success:byId("card-success")
};

const themes={
  landing:"#ff4fd8",
  message:"#a855f7",
  form:"#38bdf8",
  success:"#facc15"
};

// --- MUSIC ---
const bgMusic=byId("bgMusic");

// --- NEXT CARD ---
function nextCard(name){
  Object.values(cards).forEach(c=>c.classList.add("hidden"));
  cards[name].classList.remove("hidden");
  document.documentElement.style.setProperty("--accent",themes[name]);
  resetText(cards[name]);
  sweetMessage();
  bgMusic.play().catch(()=>{}); // prevent autoplay error
}

function resetText(card){
  card.querySelectorAll(".text-animate").forEach(el=>{
    el.style.animation="none";
    el.offsetHeight;
    el.style.animation="";
  });
}

// --- TYPING ---
const text="Semoga panjang umur, sehat selalu, dan semua mimpimu tercapai 💖";
let i=0;
(function type(){
  if(i<text.length){
    byId("typing").innerHTML+=text[i++];
    setTimeout(type,50);
  }
})();

// --- FORM SUBMIT ---
byId("form").addEventListener("submit", async e=>{
  e.preventDefault();

  const data=[...e.target.querySelectorAll("input,textarea")].map(el=>el.value);

  const msg = `
🎉 *HARAPAN ULANG TAHUN* 🎉

👤 Nama:
${data[0]}

✨ Harapan:
${data[1]}

🎯 Target:
${data[2]}

💌 Pesan:
${data[3]}
  `;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      chat_id:CHAT_ID,
      text:msg,
      parse_mode:"Markdown"
    })
  });

  nextCard("success");
});

// --- SWEET MESSAGE ---
const sweetTexts=[
  "Hari ini milikmu ✨",
  "Keep shining 💖",
  "Smile, it’s your day 🎂",
  "Semoga bahagia selalu 🌸"
];
function sweetMessage(){
  const el=byId("sweet");
  el.innerText=sweetTexts[Math.floor(Math.random()*sweetTexts.length)];
  el.style.opacity=1;
  setTimeout(()=>el.style.opacity=0,2500);
}

// --- CONFETTI ---
const c=byId("confetti"), ctx=c.getContext("2d");
c.width=innerWidth; c.height=innerHeight;

const confetti=Array.from({length:120},()=>({
  x:Math.random()*c.width,
  y:Math.random()*c.height
}));

(function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  confetti.forEach(p=>{
    ctx.fillStyle="#ff4fd8";
    ctx.fillRect(p.x,p.y,4,4);
    p.y+=2;
    if(p.y>c.height)p.y=0;
  });
  requestAnimationFrame(draw);
})();
