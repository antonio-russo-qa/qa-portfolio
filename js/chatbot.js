(function () {
    "use strict";

    const chatbotHTML = `
        <div id="chatbot-teaser" role="button" tabindex="0">
            <button id="chatbot-teaser-close" type="button" aria-label="Chiudi">×</button>
            <div class="chatbot-teaser-text">
                <strong>👋 Ciao! Posso aiutarti?</strong>
                <span>Parla con il mio assistente IA</span>
            </div>
        </div>
        <button class="chatbot-toggle" id="chatbotToggle" aria-label="Apri assistente">
            <span class="chatbot-icon">💬</span>
        </button>

        <div class="chatbot-window" id="chatbotWindow" aria-hidden="true">
            <div class="chatbot-header"><img src="images/foto-chatbot-antonio.jpg" alt="Antonio Russo" class="chatbot-avatar">
                <div>
                    <div class="chatbot-title">Portfolio Assistant IA</div>
                    <div class="chatbot-status">
                        <span class="chatbot-status-dot"></span>
                        Online
                    </div>
                </div>

                <button class="chatbot-close" id="chatbotClose" aria-label="Chiudi chat">
                    ×
                </button>
            </div>

            <div class="chatbot-messages" id="chatbotMessages">
                <div class="chatbot-message bot">
                    <div class="chatbot-message-avatar">A</div>
                    <div class="chatbot-bubble">
                        Ciao! 👋<br><br>
                        Hai bisogno di un aiuto per conoscere meglio il profilo di Antonio?
                    </div>
                </div>

                <div class="chatbot-quick-actions">
                    <button data-question="Chi è Antonio?">Chi è Antonio?</button>
                    <button data-question="Qual è la sua esperienza?">Esperienza</button>
                    <button data-question="Quali sono le sue competenze?">Competenze</button>
                    <button data-question="Quali certificazioni ha?">Certificazioni</button>
                    <button data-question="Quali progetti ha seguito?">Progetti</button>
                    <button data-question="Come posso contattarlo?">Contatti</button>
                </div>
            </div>

            <div class="chatbot-input-area">
                <input
                    type="text"
                    id="chatbotInput"
                    placeholder="Scrivi una domanda..."
                    autocomplete="off"
                >
                <button id="chatbotSend" aria-label="Invia messaggio">➤</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", chatbotHTML);

    const toggle = document.getElementById("chatbotToggle");
    const close = document.getElementById("chatbotClose");
    const windowEl = document.getElementById("chatbotWindow");
    const messages = document.getElementById("chatbotMessages");
    const input = document.getElementById("chatbotInput");
    const send = document.getElementById("chatbotSend");

    function openChat() {
        windowEl.classList.add("active");
        windowEl.setAttribute("aria-hidden", "false");
        input.focus();
    }

    function closeChat() {
        windowEl.classList.remove("active");
        windowEl.setAttribute("aria-hidden", "true");
    }

    function addMessage(text, type) {
        const message = document.createElement("div");
        message.className = "chatbot-message " + type;

        if (type === "bot") {
            message.innerHTML = `
                <div class="chatbot-message-avatar">A</div>
                <div class="chatbot-bubble">${text}</div>
            `;
        } else {
            message.innerHTML = `
                <div class="chatbot-bubble">${text}</div>
            `;
        }

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function getResponse(question) {
        const q = normalize(question);

        if (
            q.includes("chi e antonio") ||
            q.includes("chi e") ||
            q.includes("parlami di antonio") ||
            q.includes("profilo") ||
            q.includes("background")
        ) {
            return "Antonio Russo è un <strong>Software Tester</strong> con esperienza in attività di Functional, Integration, System e Regression Testing. Nel suo percorso ha lavorato su progetti enterprise e in contesti Agile e Waterfall.";
        }

        if (
            q.includes("esperienza") ||
            q.includes("lavoro") ||
            q.includes("lavora") ||
            q.includes("carriera") ||
            q.includes("professional")
        ) {
            return "Antonio ha maturato esperienza nel Software Testing in contesti enterprise, occupandosi di progettazione ed esecuzione dei test, validazione dei flussi, gestione dei casi di test e attività di End-to-End QA.";
        }

        if (
            q.includes("competenz") ||
            q.includes("skills") ||
            q.includes("strument") ||
            q.includes("conosce") ||
            q.includes("tecnologie") ||
            q.includes("tool")
        ) {
            return "Tra le principali competenze troviamo Functional, Integration, System e Regression Testing, Test Case Design & Execution, API e Registration Flow Validation, SQL/Oracle, Postman, Swagger, Polarion ALM, ServiceNow, JMeter e metodologie Agile e Waterfall.";
        }

        if (
            q.includes("certific") ||
            q.includes("formazione") ||
            q.includes("training") ||
            q.includes("corsi") ||
            q.includes("stud")
        ) {
            return "Nel portfolio sono presenti certificazioni e percorsi formativi in Software Testing, Agile Testing, Scrum, Cybersecurity e altre tecnologie. Puoi visitare la sezione <strong>Certifications</strong> per vedere l'elenco completo.";
        }

        if (
            q.includes("progett") ||
            q.includes("project") ||
            q.includes("cosa ha fatto") ||
            q.includes("attivita")
        ) {
            return "Nel portfolio puoi trovare diversi progetti, tra cui Enterprise Backend Migration Testing, Enterprise Cross-Module QA, IoT Security & Embedded Testing, Medical IoT & Mobile Testing, Sports Analytics & QA e VR & WebGL Quality Assurance.";
        }

        if (
            q.includes("contatt") ||
            q.includes("email") ||
            q.includes("linkedin") ||
            q.includes("github") ||
            q.includes("scriver") ||
            q.includes("comunicare")
        ) {
            return "Puoi contattare Antonio attraverso la sezione <strong>Contact</strong>. Nel portfolio sono inoltre disponibili i collegamenti al suo profilo LinkedIn e GitHub.";
        }

        if (
            q.includes("agile") ||
            q.includes("scrum") ||
            q.includes("waterfall")
        ) {
            return "Antonio ha lavorato sia in contesti <strong>Agile</strong> sia <strong>Waterfall</strong>, gestendo in autonomia attività legate al processo di testing e alla collaborazione con i team.";
        }

        if (
            q.includes("api") ||
            q.includes("postman") ||
            q.includes("swagger")
        ) {
            return "Antonio ha esperienza nella validazione di API e, in particolare, dei flussi di registrazione, utilizzando strumenti come <strong>Postman</strong> e <strong>Swagger</strong>.";
        }

        if (
            q.includes("sql") ||
            q.includes("oracle") ||
            q.includes("database") ||
            q.includes("db")
        ) {
            return "Antonio utilizza SQL per attività di validazione dei dati e ha esperienza con database <strong>Oracle</strong> nel contesto delle attività di Software Testing.";
        }

        if (
            q.includes("polarion") ||
            q.includes("servicenow")
        ) {
            return "Nel suo lavoro di testing Antonio ha utilizzato <strong>Polarion ALM</strong> per la gestione dei casi di test e <strong>ServiceNow</strong> per le attività operative e di gestione.";
        }

        if (
            q.includes("jmeter") ||
            q.includes("performance")
        ) {
            return "Tra le attività di testing svolte da Antonio rientra anche il <strong>Performance Testing</strong>, con utilizzo di JMeter.";
        }

        if (
            q.includes("ciao") ||
            q.includes("salve") ||
            q.includes("buongiorno") ||
            q.includes("buonasera")
        ) {
            return "Ciao! 👋 Come posso aiutarti? Puoi chiedermi informazioni sull'esperienza, sulle competenze, sulle certificazioni, sui progetti o sui contatti di Antonio.";
        }

        if (
            q.includes("grazie") ||
            q.includes("thank")
        ) {
            return "Di nulla! 😊 Se hai bisogno di altre informazioni sul portfolio, sono qui.";
        }

        return "Non sono sicuro di aver capito la domanda. 🤔<br><br>Posso aiutarti con informazioni su <strong>esperienza, competenze, certificazioni, progetti, testing o contatti</strong> di Antonio.";
    }

    function sendMessage(text) {
        const question = text.trim();

        if (!question) {
            return;
        }

        addMessage(question, "user");
        input.value = "";

        setTimeout(function () {
            addMessage(getResponse(question), "bot");
        }, 350);
    }

    toggle.addEventListener("click", function () {
        if (windowEl.classList.contains("active")) {
            closeChat();
        } else {
            openChat();
        }
    });

    close.addEventListener("click", closeChat);

    send.addEventListener("click", function () {
        sendMessage(input.value);
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage(input.value);
        }
    });

    document.querySelectorAll(".chatbot-quick-actions button").forEach(function (button) {
        button.addEventListener("click", function () {
            sendMessage(button.dataset.question);
        });
    });
})();



/* =====================================================
   CHATBOT TEASER
   ===================================================== */

(function () {

    const teaser = document.getElementById("chatbot-teaser");
    const teaserClose = document.getElementById("chatbot-teaser-close");
    const chatbotButton = document.getElementById("chatbotToggle");

    if (!teaser) return;

    const teaserSeen = false;

    if (!teaserSeen) {
        teaser.classList.add("show");

    }

    teaser.addEventListener("click", function (event) { if (event.target.closest("#chatbot-teaser-close")) return; teaser.classList.remove("show"); localStorage.setItem("antonioChatbotTeaserSeen", "true"); chatbotButton.click(); });

    if (chatbotButton) {

        chatbotButton.addEventListener("click", () => {

            teaser.classList.remove("show");

            localStorage.setItem(
                "antonioChatbotTeaserSeen",
                "true"
            );

        });

    }

    if (teaserClose) {

        teaserClose.addEventListener("click", (event) => {

            event.stopPropagation();

            teaser.classList.remove("show");

            localStorage.setItem(
                "antonioChatbotTeaserSeen",
                "true"
            );

        });

    }

})();










