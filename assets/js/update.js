/* =========================================================
   Portfolio Content Form — behaviour
   No backend required: compiles answers into Markdown that
   can be downloaded, copied, or emailed.
   ========================================================= */

/* ----------------------------------------------------------
   CONFIG — edit these two values
   ----------------------------------------------------------
   DELIVERY_EMAIL : where "Email my answers" sends to.
   FORM_ENDPOINT  : (optional) a Formspree/Getform/FormSubmit
                    URL. If set, answers are ALSO POSTed there
                    automatically on download/email so the team
                    receives them without any manual step.
   --------------------------------------------------------- */
const DELIVERY_EMAIL = "info@tlokwengaog.com";
const FORM_ENDPOINT  = ""; // e.g. "https://formspree.io/f/xxxxxxx"

/* ---------- repeatable rows ---------- */
function initRepeats() {
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.previousElementSibling; // the .repeat
      const items = group.querySelectorAll(".repeat__item");
      const clone = items[items.length - 1].cloneNode(true);
      clone.querySelectorAll("input, textarea, select").forEach((f) => (f.value = ""));
      group.appendChild(clone);
      clone.querySelector("input, textarea")?.focus();
    });
  });

  // event delegation for remove buttons
  document.addEventListener("click", (e) => {
    const rm = e.target.closest(".repeat__remove");
    if (!rm) return;
    const group = rm.closest(".repeat");
    const items = group.querySelectorAll(".repeat__item");
    if (items.length > 1) rm.closest(".repeat__item").remove();
    else group.querySelectorAll("input, textarea, select").forEach((f) => (f.value = ""));
  });
}

/* ---------- read a field's value ---------- */
function val(el) {
  if (el.type === "checkbox") return el.checked ? "Yes" : "";
  return (el.value || "").trim();
}

/* ---------- compile the form to Markdown ---------- */
function compile() {
  const form = document.getElementById("intakeForm");
  const filledBy = val(document.getElementById("yourName")) || "Apostle Dr. Samuel Letang";
  let md = `# Portfolio Content — Apostle Dr. Samuel Letang\n`;
  md += `_Submitted by: ${filledBy}_\n`;

  let fieldCount = 0;

  form.querySelectorAll("fieldset.fs").forEach((fs) => {
    let block = "";

    // flat fields (not inside a .repeat)
    fs.querySelectorAll("[data-label]").forEach((el) => {
      if (el.closest(".repeat")) return;
      const v = val(el);
      if (v) { block += `- **${el.dataset.label}:** ${v}\n`; fieldCount++; }
    });

    // repeatable groups
    fs.querySelectorAll(".repeat").forEach((rg) => {
      const entryNoun = rg.dataset.entry || "Entry";
      const groupLabel = rg.dataset.label || "";
      let groupBlock = "";
      let n = 0;
      rg.querySelectorAll(".repeat__item").forEach((item) => {
        const lines = [];
        item.querySelectorAll("[data-label]").forEach((el) => {
          const v = val(el);
          if (v) lines.push(`  - ${el.dataset.label}: ${v}`);
        });
        if (lines.length) {
          n++;
          groupBlock += `\n_${entryNoun} ${n}_\n${lines.join("\n")}\n`;
          fieldCount += lines.length;
        }
      });
      if (groupBlock) block += `\n**${groupLabel}**\n${groupBlock}`;
    });

    if (block.trim()) {
      md += `\n\n## ${fs.dataset.title}\n${block}`;
    }
  });

  return { md, fieldCount };
}

/* ---------- optional auto-delivery ---------- */
function maybePost(md) {
  if (!FORM_ENDPOINT) return;
  try {
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ subject: "Portfolio content — Dr. Samuel Letang", message: md }),
    });
  } catch (_) { /* non-blocking */ }
}

/* ---------- actions ---------- */
function setStatus(msg, ok) {
  const s = document.getElementById("formStatus");
  s.textContent = msg;
  s.classList.toggle("ok", !!ok);
}

function download() {
  const { md, fieldCount } = compile();
  if (!fieldCount) { setStatus("Please fill in at least one field first.", false); return; }
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Samuel-Letang-portfolio-details.md";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(a.href);
  maybePost(md);
  setStatus(`Downloaded ${fieldCount} answers. Please email the file to the team. Thank you!`, true);
}

async function copy() {
  const { md, fieldCount } = compile();
  if (!fieldCount) { setStatus("Please fill in at least one field first.", false); return; }
  try {
    await navigator.clipboard.writeText(md);
    maybePost(md);
    setStatus(`Copied ${fieldCount} answers to your clipboard — paste them into an email or message.`, true);
  } catch (_) {
    setStatus("Couldn't copy automatically — please use Download instead.", false);
  }
}

function email() {
  const { md, fieldCount } = compile();
  if (!fieldCount) { setStatus("Please fill in at least one field first.", false); return; }
  maybePost(md);
  const subject = encodeURIComponent("Portfolio content — Apostle Dr. Samuel Letang");
  // mailto bodies are length-limited; keep it safe and nudge to attach the download for long forms.
  const body = encodeURIComponent(md.slice(0, 1800) + (md.length > 1800
    ? "\n\n[...continued — please also attach the downloaded file, as email cannot fit everything.]"
    : ""));
  window.location.href = `mailto:${DELIVERY_EMAIL}?subject=${subject}&body=${body}`;
  setStatus("Opening your email app… if it doesn't open, use Download or Copy instead.", true);
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initRepeats();
  document.getElementById("btnDownload").addEventListener("click", download);
  document.getElementById("btnCopy").addEventListener("click", copy);
  document.getElementById("btnEmail").addEventListener("click", email);
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
