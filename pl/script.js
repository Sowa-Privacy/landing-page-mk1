document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const navOverlay = document.querySelector('.nav-overlay');

    if (menuToggle && navRight) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navRight.classList.toggle('open');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.style.overflow = navRight.classList.contains('open') ? 'hidden' : '';
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navRight.classList.remove('open');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when a nav link is clicked
        navRight.querySelectorAll('.nav-links a, .nav-cta a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navRight.classList.remove('open');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Intro Splash Screen
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            setTimeout(() => introOverlay.remove(), 600);
        }, 2000);
    }

    // Intersection Observer for Scroll Animations (Fade-up effect)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you don't want it to repeat on scroll up
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'fade-up' class
    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 12, 0.8)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'var(--glass-shadow)';
        }
    });

    // Form submission prevention for demo purposes
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerHTML = '<i data-lucide="check-circle" style="width:18px;height:18px;margin-right:8px;vertical-align:middle;"></i> Wysłano!';
            btn.style.background = 'var(--success)';
            btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
            lucide.createIcons(); // refresh icons

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.boxShadow = '';
                form.reset();
            }, 3000);
        });
    }

    // Get Started form submission
    const gsForm = document.getElementById('get-started-form');
    if (gsForm) {
        gsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = gsForm.querySelector('button');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<i data-lucide="check-circle" style="width:18px;height:18px;"></i> Wysłano!';
            btn.style.background = 'var(--success)';
            btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
            lucide.createIcons();

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.boxShadow = '';
                gsForm.reset();
                lucide.createIcons();
            }, 3000);
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 30 + "px"; // 30px for padding
            }
        });
    });

    // Chat Demo Animation Logic
    const chatDemoContainers = document.querySelectorAll('.chat-demo-container');

    chatDemoContainers.forEach(wrapperEl => {
        const chatgptWindow = wrapperEl.querySelector('.chatgpt-window');
        const claudeWindow = wrapperEl.querySelector('.claude-window');
        const geminiWindow = wrapperEl.querySelector('.gemini-window');

        // ChatGPT Elements
        const cg_lang = chatgptWindow.querySelector('.js-chat-demo').getAttribute('data-lang') || 'de';
        const cg_container = chatgptWindow.querySelector('.js-chat-demo');
        const cg_typewriterEl = chatgptWindow.querySelector('.chat-typing-text');
        const cg_cursorEl = chatgptWindow.querySelector('.chat-cursor');
        const cg_sendBtn = chatgptWindow.querySelector('.chatgpt-send-btn');
        const cg_placeholderEl = chatgptWindow.querySelector('.chatgpt-placeholder');

        // Claude Elements
        const cl_lang = claudeWindow.querySelector('.js-claude-demo').getAttribute('data-lang') || 'de';
        const cl_container = claudeWindow.querySelector('.claude-messages');
        const cl_typewriterEl = claudeWindow.querySelector('.claude-typing-text');
        const cl_cursorEl = claudeWindow.querySelector('.claude-cursor');
        const cl_sendBtn = claudeWindow.querySelector('.claude-send-btn');
        const cl_placeholderEl = claudeWindow.querySelector('.claude-placeholder');

        // Gemini Elements
        const gm_lang = geminiWindow.querySelector('.js-gemini-demo').getAttribute('data-lang') || 'de';
        const gm_container = geminiWindow.querySelector('.gemini-messages');
        const gm_typewriterEl = geminiWindow.querySelector('.gemini-typing-text');
        const gm_cursorEl = geminiWindow.querySelector('.gemini-cursor');
        const gm_sendBtn = geminiWindow.querySelector('.gemini-send-btn');
        const gm_placeholderEl = geminiWindow.querySelector('.gemini-placeholder');

        const texts = {
            chatgpt: {
                de: {
                    typedText: "Erstelle eine Zusammenfassung der Krankenakte von Patient Max Mustermann (Geb. 12.05.1980).",
                    userMsgHtml: `Erstelle eine Zusammenfassung der Krankenakte von Patient <span class="sensitive-data">Max Mustermann</span> (Geb. <span class="sensitive-data">12.05.1980</span>).`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`,
                    aiResponseHtml: `Ich habe die Zusammenfassung der Krankenakte für <span class="sensitive-data anonymized">[PERSON_1]</span> (Geb. <span class="sensitive-data anonymized">[DATE_1]</span>) erstellt. Bitte beachten Sie...`
                },
                en: {
                    typedText: "Summarize the medical records for patient John Doe (DOB: 05/12/1980).",
                    userMsgHtml: `Summarize the medical records for patient <span class="sensitive-data">John Doe</span> (DOB: <span class="sensitive-data">05/12/1980</span>).`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`,
                    aiResponseHtml: `I have prepared the summary of the medical records for <span class="sensitive-data anonymized">[PERSON_1]</span> (DOB: <span class="sensitive-data anonymized">[DATE_1]</span>). Please note...`
                },
                pl: {
                    typedText: "Utwórz podsumowanie dokumentacji medycznej pacjenta Jan Kowalski (ur. 12.05.1980).",
                    userMsgHtml: `Utwórz podsumowanie dokumentacji medycznej pacjenta <span class="sensitive-data">Jan Kowalski</span> (ur. <span class="sensitive-data">12.05.1980</span>).`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`,
                    aiResponseHtml: `Przygotowałem podsumowanie dokumentacji medycznej dla <span class="sensitive-data anonymized">[PERSON_1]</span> (ur. <span class="sensitive-data anonymized">[DATE_1]</span>). Proszę zwrócić uwagę...`
                },
            },
            claude: {
                de: {
                    typedText: "Schreibe einen Projektplan für unseren Kunden Acme Corp (Budget: 50.000€).",
                    userMsgHtml: `Schreibe einen Projektplan für unseren Kunden <span class="sensitive-data">Acme Corp</span> (Budget: <span class="sensitive-data">50.000€</span>).`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot" style="background:#d88961;"></div><div class="typing-dot" style="background:#d88961;"></div><div class="typing-dot" style="background:#d88961;"></div></div>`,
                    aiResponseHtml: `Hier ist ein Entwurf für den Projektplan für <span class="sensitive-data anonymized">[ORG_1]</span> mit einem Budget von <span class="sensitive-data anonymized">[MONEY_1]</span>...`
                },
                en: {
                    typedText: "Write a project plan for our client Acme Corp (Budget: $50,000).",
                    userMsgHtml: `Write a project plan for our client <span class="sensitive-data">Acme Corp</span> (Budget: <span class="sensitive-data">$50,000</span>).`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot" style="background:#d88961;"></div><div class="typing-dot" style="background:#d88961;"></div><div class="typing-dot" style="background:#d88961;"></div></div>`,
                    aiResponseHtml: `Here is a draft project plan for <span class="sensitive-data anonymized">[ORG_1]</span> with a budget of <span class="sensitive-data anonymized">[MONEY_1]</span>...`
                },
                pl: {
                    typedText: "Napisz plan projektu dla naszego klienta Acme Corp (budżet: 50 000 zł).",
                    userMsgHtml: `Napisz plan projektu dla naszego klienta <span class="sensitive-data">Acme Corp</span> (budżet: <span class="sensitive-data">50 000 zł</span>).`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot" style="background:#d88961;"></div><div class="typing-dot" style="background:#d88961;"></div><div class="typing-dot" style="background:#d88961;"></div></div>`,
                    aiResponseHtml: `Oto projekt planu dla <span class="sensitive-data anonymized">[ORG_1]</span> z budżetem <span class="sensitive-data anonymized">[MONEY_1]</span>...`
                },
            },
            gemini: {
                de: {
                    typedText: "Schreibe eine E-Mail an maria.schmidt@firma.de mit der Telefonnummer +49 170 1234567.",
                    userMsgHtml: `Schreibe eine E-Mail an <span class="sensitive-data">maria.schmidt@firma.de</span> mit der Telefonnummer <span class="sensitive-data">+49 170 1234567</span>.`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot" style="background:#4285f4;"></div><div class="typing-dot" style="background:#4285f4;"></div><div class="typing-dot" style="background:#4285f4;"></div></div>`,
                    aiResponseHtml: `Hier ist der E-Mail-Entwurf an <span class="sensitive-data anonymized">[EMAIL_1]</span> mit der Telefonnummer <span class="sensitive-data anonymized">[PHONE_1]</span>...`
                },
                en: {
                    typedText: "Write an email to maria.schmidt@company.com including the phone number +49 170 1234567.",
                    userMsgHtml: `Write an email to <span class="sensitive-data">maria.schmidt@company.com</span> including the phone number <span class="sensitive-data">+49 170 1234567</span>.`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot" style="background:#4285f4;"></div><div class="typing-dot" style="background:#4285f4;"></div><div class="typing-dot" style="background:#4285f4;"></div></div>`,
                    aiResponseHtml: `Here is the email draft to <span class="sensitive-data anonymized">[EMAIL_1]</span> including the phone number <span class="sensitive-data anonymized">[PHONE_1]</span>...`
                },
                pl: {
                    typedText: "Napisz e-mail do maria.kowalska@firma.pl z numerem telefonu +48 170 1234567.",
                    userMsgHtml: `Napisz e-mail do <span class="sensitive-data">maria.kowalska@firma.pl</span> z numerem telefonu <span class="sensitive-data">+48 170 1234567</span>.`,
                    aiTyping: `<div class="typing-indicator"><div class="typing-dot" style="background:#4285f4;"></div><div class="typing-dot" style="background:#4285f4;"></div><div class="typing-dot" style="background:#4285f4;"></div></div>`,
                    aiResponseHtml: `Oto szkic e-maila do <span class="sensitive-data anonymized">[EMAIL_1]</span> z numerem telefonu <span class="sensitive-data anonymized">[PHONE_1]</span>...`
                },
            }
        };

        const tCG = texts.chatgpt[cg_lang];
        const tCL = texts.claude[cl_lang];
        const tGM = texts.gemini[gm_lang];

        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function typeWriter(text, element, cursor, placeholder, sendBtn, speed = 40) {
            element.innerHTML = '';
            if (placeholder) placeholder.style.display = 'none';
            cursor.classList.remove('hidden');
            for (let i = 0; i < text.length; i++) {
                element.innerHTML += text.charAt(i);
                await sleep(speed + (Math.random() * 20 - 10));
            }
            cursor.classList.add('hidden');
            sendBtn.classList.add('active');
            sendBtn.removeAttribute('disabled');
        }

        function createMessageBubble(content, type, parent, botName) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${type}`;

            let avatarHtml = '';
            if (type === 'user') {
                avatarHtml = `<div class="chat-avatar"><i data-lucide="user"></i></div>`;
            } else {
                if (botName === 'claude') {
                    avatarHtml = `<div class="chat-avatar" style="background:none; border: 1px solid rgba(255,255,255,0.1);"><svg viewBox="0 0 24 24" class="claude-logo" fill="currentColor" style="width:20px;height:20px;color:#d88961;"><path d="M12 2L14.39 9.61L22 12L14.39 14.39L12 22L9.61 14.39L2 12L9.61 9.61L12 2Z"></path></svg></div>`;
                } else if (botName === 'gemini') {
                    avatarHtml = `<div class="chat-avatar" style="background:#1a1a2e; border: none;"><svg viewBox="0 0 28 28" fill="none" style="width:18px;height:18px;"><defs><linearGradient id="gm-av" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4285f4"/><stop offset="35%" style="stop-color:#9b72cb"/><stop offset="65%" style="stop-color:#d96570"/><stop offset="100%" style="stop-color:#d96570"/></linearGradient></defs><path d="M14 0C14 7.732 7.732 14 0 14c7.732 0 14 6.268 14 14 0-7.732 6.268-14 14-14C20.268 14 14 7.732 14 0Z" fill="url(#gm-av)"/></svg></div>`;
                } else {
                    avatarHtml = `<div class="chat-avatar" style="background:#000; border: 1px solid rgba(255,255,255,0.1);"><svg viewBox="0 0 24 24" fill="white" style="width:18px;height:18px;"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.085a4.499 4.499 0 0 1 7.37-3.456l-.14.08-4.78 2.758a.795.795 0 0 0-.392.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg></div>`;
                }
            }

            msgDiv.innerHTML = `
                ${avatarHtml}
                <div class="chat-bubble ${botName === 'claude' ? 'claude-bubble' : ''} ${botName === 'gemini' ? 'gemini-bubble' : ''}">
                    ${content}
                    ${type === 'user' ? '<div class="sowa-indicator"><img src="' + document.querySelector('.logo-img').src + '" style="width:16px;height:16px;" alt="SOWA"> SOWA</div>' : ''}
                </div>
            `;
            parent.appendChild(msgDiv);
            lucide.createIcons();
            parent.scrollTop = parent.scrollHeight;
            return msgDiv;
        }

        async function runHalfSequence(botName, container, typewriterEl, cursorEl, sendBtn, placeholderEl, t, greetingEl) {
            container.innerHTML = '';
            typewriterEl.innerHTML = '';
            if (placeholderEl) placeholderEl.style.display = '';
            cursorEl.classList.remove('hidden');
            sendBtn.classList.remove('active');
            sendBtn.setAttribute('disabled', 'true');

            await sleep(1000);
            // Hide greeting right before typing starts (after it's been visible for 1s)
            if (greetingEl) greetingEl.style.display = 'none';

            // 1. Typing Phase
            await typeWriter(t.typedText, typewriterEl, cursorEl, placeholderEl, sendBtn);
            await sleep(500);

            // 2. Sending Phase
            typewriterEl.innerHTML = '';
            cursorEl.classList.add('hidden');
            sendBtn.classList.remove('active');
            sendBtn.setAttribute('disabled', 'true');
            if (placeholderEl) placeholderEl.style.display = '';

            const userMsg = createMessageBubble(t.userMsgHtml, 'user', container, botName);
            const sensitiveEls = userMsg.querySelectorAll('.sensitive-data');
            const bubbleEl = userMsg.querySelector('.chat-bubble');

            await sleep(800);

            // 3. Interception Phase
            bubbleEl.classList.add('intercepting');
            bubbleEl.classList.add('show-indicator');
            await sleep(400);

            // 4. Highlight & Anonymize Phase
            const placeholders = {
                chatgpt: ['[PERSON_1]', '[DATE_1]'],
                claude: ['[ORG_1]', '[MONEY_1]'],
                gemini: ['[EMAIL_1]', '[PHONE_1]']
            };
            for (let i = 0; i < sensitiveEls.length; i++) {
                sensitiveEls[i].classList.add('highlighted');
                await sleep(600);
                sensitiveEls[i].classList.remove('highlighted');
                sensitiveEls[i].classList.add('anonymized');
                sensitiveEls[i].innerText = placeholders[botName][i];
            }

            bubbleEl.classList.remove('intercepting');
            await sleep(1000);

            // 5. AI Response Phase
            const aiTypingMsg = createMessageBubble(t.aiTyping, 'ai', container, botName);
            await sleep(1800);

            aiTypingMsg.remove();
            createMessageBubble(t.aiResponseHtml, 'ai', container, botName);

            await sleep(3500);
        }

        function showWindow(win) {
            win.classList.add('active');
            win.classList.remove('hidden');
        }
        function hideWindow(win) {
            win.classList.remove('active');
            win.classList.add('hidden');
        }

        async function runMainLoop() {
            while (true) {
                // RUN CHATGPT
                showWindow(chatgptWindow);
                hideWindow(claudeWindow);
                hideWindow(geminiWindow);
                await runHalfSequence('chatgpt', cg_container, cg_typewriterEl, cg_cursorEl, cg_sendBtn, cg_placeholderEl, tCG);
                hideWindow(chatgptWindow);
                await sleep(800);

                // RUN CLAUDE
                const greeting = claudeWindow.querySelector('.claude-greeting');
                cl_container.innerHTML = '';
                if (greeting) greeting.style.display = '';
                showWindow(claudeWindow);
                await runHalfSequence('claude', cl_container, cl_typewriterEl, cl_cursorEl, cl_sendBtn, cl_placeholderEl, tCL, greeting);
                hideWindow(claudeWindow);
                await sleep(800);

                // RUN GEMINI
                const gGreeting = geminiWindow.querySelector('.gemini-greeting');
                gm_container.innerHTML = '';
                if (gGreeting) gGreeting.style.display = '';
                showWindow(geminiWindow);
                await runHalfSequence('gemini', gm_container, gm_typewriterEl, gm_cursorEl, gm_sendBtn, gm_placeholderEl, tGM, gGreeting);
                hideWindow(geminiWindow);
                await sleep(800);
            }
        }

        // Start animation when visible
        let started = false;
        const chatObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                started = true;
                runMainLoop();
            }
        });
        chatObserver.observe(wrapperEl);
    });

    // Countdown Logic
    const countdownEls = document.querySelectorAll('.launch-badge');
    if (countdownEls.length > 0) {
        // Target: 29 days from March 2, 2026 roughly.
        const launchDate = new Date("2026-03-16T09:00:00Z").getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance < 0) return;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.querySelectorAll('.cd-days').forEach(el => el.innerText = days.toString().padStart(2, '0'));
            document.querySelectorAll('.cd-hours').forEach(el => el.innerText = hours.toString().padStart(2, '0'));
            document.querySelectorAll('.cd-mins').forEach(el => el.innerText = minutes.toString().padStart(2, '0'));
            document.querySelectorAll('.cd-secs').forEach(el => el.innerText = seconds.toString().padStart(2, '0'));
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Contact Form Mailto Logic
    const contactForm = document.getElementById('get-started-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('name').value || '';
            const email = document.getElementById('email').value || '';
            const company = document.getElementById('company').value || '';
            const phone = document.getElementById('phone').value || '';
            const interest = document.getElementById('interest').value || '';
            const message = document.getElementById('message').value || '';

            // Construct email body
            let bodyText = `Name: ${name}\n`;
            bodyText += `E-Mail: ${email}\n`;
            if (company) bodyText += `Company/Unternehmen: ${company}\n`;
            if (phone) bodyText += `Phone/Telefon: ${phone}\n`;
            if (interest) bodyText += `Interest/Interesse: ${interest}\n`;
            if (message) bodyText += `\nMessage/Nachricht:\n${message}\n`;

            // URI encode
            const subject = encodeURIComponent('New Contact Request: ' + name);
            const body = encodeURIComponent(bodyText);

            // Open mailto link
            window.location.href = `mailto:info@sowaprivacy.com?subject=${subject}&body=${body}`;
        });
    }

});
