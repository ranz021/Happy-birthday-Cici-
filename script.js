(function(){

  function byId(id){ return document.getElementById(id); }

  // --- CARDS ---
  const cards = {
    landing: byId("card-landing"),
    message: byId("card-message"),
    form: byId("card-form"),
    success: byId("card-success")
  };

  const themes = {
    landing:"#1e90ff",
    message:"#00bfff",
    form:"#1ca3ec",
    success:"#87cefa"
  };

  // ================= TELEGRAM CONFIG =================
  const BOT_TOKEN = "8116752882";
  const CHAT_ID = "8587663172:AAHL9V8Tpyv6Ek7sJXgKHYiP0LfgWKcPcyk";
  // ===================================================

  // --- MUSIC ---
  const bgMusic = byId("bgMusic");
  let musicPlayed = false;

  // --- NEXT CARD ---
  function nextCard(name){
    if(!cards[name]) return;
    Object.values(cards).forEach(c=>{ if(c) c.classList.add("hidden"); });
    cards[name].classList.remove("hidden");
    document.documentElement.style.setProperty("--accent",themes[name]);
    resetText(cards[name]);
    sweetMessage();
  }

  function resetText(card){
    if(!card) return;
    card.querySelectorAll(".text-animate").forEach(el=>{
      el.style.animation="none";
      el.offsetHeight;
      el.style.animation="";
    });
  }

  // --- TYPING EFFECT ---
  const typingEl = byId("typing");
  const text = "Semoga panjang umur, sehat selalu, dan semua mimpimu tercapai 💖";
  let i = 0;

  if(typingEl){
    typingEl.innerHTML = "";
    (function type(){
      if(i < text.length){
        typingEl.innerHTML += text[i++];
        setTimeout(type,50);
      }
    })();
  }

  // --- SEND TELEGRAM FUNCTION ---
  async function sendToTelegram(nama, harapan, target, pesan){
    const message = `
🎉 *Jawaban Harapan Cici Masuk!*

👤 Nama: *${nama}*

✨ Harapan:
${harapan}

🎯 Target Tahun Ini:
${target}

💌 Pesan Untuk Diri Sendiri:
${pesan}
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    return res.json();
  }

  // --- FORM SUBMIT (TELEGRAM) ---
  const formEl = byId("form");
  if(formEl){
    formEl.addEventListener("submit", async (e)=>{
      e.preventDefault();

      const nama = formEl.querySelector('input[name="nama"]').value;
      const harapan = formEl.querySelector('textarea[name="harapan"]').value;
      const target = formEl.querySelector('textarea[name="target"]').value;
      const pesan = formEl.querySelector('textarea[name="pesan"]').value;

      try {
        const result = await sendToTelegram(nama, harapan, target, pesan);

        if(result.ok){
          console.log("Terkirim ke Telegram!");
          nextCard("success");
          formEl.reset();
        } else {
          alert("Gagal kirim ke Telegram! cek token/chat id.");
          console.log(result);
        }

      } catch(err){
        alert("Error: tidak bisa terhubung ke Telegram API.");
        console.log(err);
      }
    });
  }

  // --- SWEET MESSAGE ---
  const sweetTexts = [
    "Hari ini milikmu ✨",
    "Keep shining 💖",
    "Smile, it’s your day 🎂",
    "Semoga bahagia selalu 🌸"
  ];

  function sweetMessage(){
    const el = byId("sweet");
    if(!el) return;
    el.innerText = sweetTexts[Math.floor(Math.random()*sweetTexts.length)];
    el.style.opacity = 1;
    setTimeout(()=>el.style.opacity=0,2500);
  }

  // --- CONFETTI ---
  const c = byId("confetti");
  if(c){
    const ctx = c.getContext && c.getContext("2d");
    if(ctx){
      c.width = window.innerWidth;
      c.height = window.innerHeight;

      const confetti = Array.from({length:120},()=>({
        x:Math.random()*c.width,
        y:Math.random()*c.height,
        s:Math.random()*3 + 2
      }));

      (function draw(){
        ctx.clearRect(0,0,c.width,c.height);
        confetti.forEach(p=>{
          ctx.fillStyle = "#1e90ff";
          ctx.fillRect(p.x,p.y,p.s,p.s);
          p.y += 2;
          if(p.y > c.height) p.y = 0;
        });
        requestAnimationFrame(draw);
      })();

      window.addEventListener("resize", ()=>{
        c.width = window.innerWidth;
        c.height = window.innerHeight;
      });
    }
  }

  // --- PLAY MUSIC AFTER FIRST CLICK ---
  document.body.addEventListener("click", ()=>{
    if(bgMusic && !musicPlayed){
      bgMusic.play().catch(()=>{});
      musicPlayed = true;
    }
  }, {once:true});

  // --- NEXT CARD BUTTONS ---
  const btnLanding = cards.landing?.querySelector("button");
  if(btnLanding) btnLanding.addEventListener("click", ()=>nextCard("message"));

  const btnMessage = cards.message?.querySelector("button");
  if(btnMessage) btnMessage.addEventListener("click", ()=>nextCard("form"));

})();  function sweetMessage(){
    const el = byId("sweet");
    if(!el) return;
    el.innerText = sweetTexts[Math.floor(Math.random()*sweetTexts.length)];
    el.style.opacity = 1;
    setTimeout(()=>el.style.opacity=0,2500);
  }

  // --- CONFETTI ---
  const c = byId("confetti");
  if(c){
    const ctx = c.getContext && c.getContext("2d");
    if(ctx){
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      const confetti = Array.from({length:120},()=>({ x:Math.random()*c.width, y:Math.random()*c.height }));
      (function draw(){
        ctx.clearRect(0,0,c.width,c.height);
        confetti.forEach(p=>{
          ctx.fillStyle = "#1e90ff";
          ctx.fillRect(p.x,p.y,4,4);
          p.y += 2;
          if(p.y > c.height) p.y = 0;
        });
        requestAnimationFrame(draw);
      })();
      window.addEventListener("resize", ()=>{
        c.width = window.innerWidth;
        c.height = window.innerHeight;
      });
    }
  }

  // --- PLAY MUSIC AFTER FIRST CLICK ---
  document.body.addEventListener("click", ()=>{
    if(bgMusic && !musicPlayed){
      bgMusic.play().catch(()=>{}); // catch error supaya ga crash
      musicPlayed = true;
    }
  }, {once:true});

  // --- NEXT CARD BUTTONS ---
  const btnLanding = cards.landing?.querySelector("button");
  if(btnLanding) btnLanding.addEventListener("click", ()=>nextCard("message"));

  const btnMessage = cards.message?.querySelector("button");
  if(btnMessage) btnMessage.addEventListener("click", ()=>nextCard("form"));

})();
