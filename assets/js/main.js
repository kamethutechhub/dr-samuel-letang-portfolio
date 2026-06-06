/* =========================================================
   Apostle Dr. Samuel Letang — site behaviour
   ========================================================= */

/* ----------------------------------------------------------
   1) SERMON / MESSAGE CATALOG
   ----------------------------------------------------------
   Edit this list to add, remove, or reorder messages.
   Each item:  { series, title, scripture, url }
   - series   : short label / theme (optional)
   - title    : the message title
   - scripture: the main text (optional)
   - url      : link to the video/post (optional)
   --------------------------------------------------------- */
const MESSAGES = [
  { series: "Effective Christian Leadership", title: "Effective Christian Leadership", scripture: "On servant leadership",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/" },
  { series: "The Power of the Holy Ghost", title: "What We Have We Give Away", scripture: "Acts 3:1–10",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/posts/preacher-apostle-dr-samuel-letang-text-acts-31-10-message-what-we-have-we-give-a/2447785805308877/" },
  { series: "The Next Level", title: "Results of Worship", scripture: "Acts 8:26–40",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/videos/results-of-worship/534684520585047/" },
  { series: "Worship", title: "Going to the Next Level Through Worship", scripture: "John 4:19–26",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/videos/preacher-apostle-dr-samuel-letangmessage-going-to-the-next-level-through-worship/219454302525733/" },
  { series: "Discipleship", title: "Come and See", scripture: "John 1:35–42",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/videos/come-and-see/575899976619523/" },
  { series: "Breakthrough", title: "Burden Lifting Day", scripture: "Luke 1:5–17",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/videos/burden-lifting-day/1333389400328906/" },
  { series: "Philippians Series", title: "Having a Mind of Christ", scripture: "Philippians 2:1–11",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/videos/phillipians-series/413688332797361/" },
  { series: "Maintenance", title: "The Power of Maintenance", scripture: "John 15:1–5; James 4:8",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/" },
  { series: "Better Things Ahead", title: "Better Things Ahead", scripture: "1 Peter 5:10–11",
    url: "https://www.facebook.com/TlokwengAssemblyofGodChurch/" },
];

function renderMessages() {
  const grid = document.getElementById("msgGrid");
  if (!grid) return;
  const frag = document.createDocumentFragment();

  MESSAGES.forEach((m) => {
    const card = document.createElement(m.url ? "a" : "div");
    card.className = "msg-card reveal";
    if (m.url) { card.href = m.url; card.target = "_blank"; card.rel = "noopener"; }

    let html = "";
    if (m.series)    html += `<span class="msg-card__series">${m.series}</span>`;
    html += `<h3 class="msg-card__title">${m.title}</h3>`;
    if (m.scripture) html += `<p class="msg-card__scripture">${m.scripture}</p>`;
    card.innerHTML = html;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

/* ----------------------------------------------------------
   2) NAVIGATION — scrolled state + mobile menu
   --------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav__links");

  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      nav.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        nav.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }
}

/* ----------------------------------------------------------
   3) SCROLL REVEAL
   --------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !items.length) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ----------------------------------------------------------
   4) DIRECT CONTACT FORM (reaches Dr. Letang, not the church)
   ----------------------------------------------------------
   CONTACT.email    : Dr. Letang's dedicated/direct address.
                      ⚠️ PLACEHOLDER — replace with his real address.
   CONTACT.endpoint : optional Formspree/Getform URL. If set,
                      messages POST there automatically (no mailto).
   --------------------------------------------------------- */
const CONTACT = {
  email: "hello@samuelletang.org", // ← TODO: replace with Dr. Letang's real direct email
  endpoint: "",                     // ← optional: paste a Formspree URL to enable auto-delivery
};

function initContact() {
  // surface the direct office email in the sidebar
  const link = document.getElementById("directEmail");
  if (link) {
    link.textContent = "✉  " + CONTACT.email;
    link.href = "mailto:" + CONTACT.email;
  }

  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("contactStatus");
  const get = (id) => document.getElementById(id);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = get("cName"), email = get("cEmail"), msg = get("cMessage");
    // simple validation
    let ok = true;
    [name, email, msg].forEach((el) => {
      const bad = !el.value.trim();
      el.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (email.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
      email.classList.add("invalid"); ok = false;
    }
    if (!ok) { setCStatus(status, "Please add your name, a valid email, and a message.", "err"); return; }

    const reason = get("cPurpose").value || "General enquiry";
    const org = get("cOrg").value.trim();
    const lines = [
      `Name: ${name.value.trim()}`,
      `Email: ${email.value.trim()}`,
      org ? `Organisation: ${org}` : null,
      `Reason: ${reason}`,
      ``,
      name.value.trim() + " writes:",
      msg.value.trim(),
    ].filter((l) => l !== null);
    const body = lines.join("\n");
    const subject = `Website enquiry — ${reason}`;

    // Formspree path (if configured) → automatic delivery
    if (CONTACT.endpoint) {
      fetch(CONTACT.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name.value, email: email.value, organisation: org, reason, message: msg.value }),
      })
        .then((r) => {
          if (r.ok) { form.reset(); setCStatus(status, "Thank you — your message has been sent to Dr. Letang's office.", "ok"); }
          else throw new Error("post failed");
        })
        .catch(() => openMailto(subject, body, status));
      return;
    }

    // mailto fallback
    openMailto(subject, body, status);
  });
}

function openMailto(subject, body, status) {
  window.location.href =
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setCStatus(status, "Opening your email app to send the message…", "ok");
}

function setCStatus(el, msg, kind) {
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("ok", "err");
  if (kind) el.classList.add(kind);
}

/* ----------------------------------------------------------
   5) Footer year
   --------------------------------------------------------- */
function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderMessages();
  initNav();
  initReveal();
  initContact();
  initYear();
});
