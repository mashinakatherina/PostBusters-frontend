document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    // Проверяем предпочтительную тему пользователя из локального хранилища
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    // Если пользователь ранее выбрал тему, применяем ее
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Слушаем изменения в теме
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Stub for API request
    function fetchMailboxInfo() {
        // Mock data for mailboxes
        const mockData = [
            { name: "Mailbox 1", status: "open", info: "No new mail" },
            { name: "Mailbox 2", status: "closed", info: "1 new mail" },
            { name: "Mailbox 3", status: "open", info: "2 new mails" }
        ];

        // Display mailboxes using the mock data
        displayMailboxes(mockData);
    }

    // Function to display mailbox information on the page
    function displayMailboxes(data) {
        const mailboxesContainer = document.querySelector('.mailboxes');

        // Clear the contents of the container before adding new data
        mailboxesContainer.innerHTML = '';

        // Iterate over the data and create blocks for each mailbox
        data.forEach((mailbox, index) => {
            const mailboxElement = document.createElement('div');
            mailboxElement.classList.add('mailbox');
            mailboxElement.dataset.index = index; // Store the index as a data attribute

            // Determine the class for styling based on the mailbox status
            mailboxElement.classList.add(mailbox.status === 'open' ? 'open' : 'closed');

            // Build the content of the mailbox block
            mailboxElement.innerHTML = `
                <div class="title">${mailbox.name}</div>
                <div class="status">${mailbox.status}</div>
                <div class="info">Info: ${mailbox.info}</div>
            `;

            // Add event listener for mailbox block click
            mailboxElement.addEventListener('click', handleMailboxClick);

            // Add the block with mailbox information to the container
            mailboxesContainer.appendChild(mailboxElement);
        });
    }

    // Event handler for mailbox block click
    function handleMailboxClick(event) {
        const mailboxIndex = event.currentTarget.dataset.index;
        window.location.href = `mailbox-history.html?mailbox=${mailboxIndex}`;
    }

    // Call the function to fetch mailbox information when the page loads
    fetchMailboxInfo();
});

function changeLanguage(language) {
    // Simulate translation based on language
    if (language === 'fr') {
        translateToFrench();
    } else if (language === 'es') {
        translateToSpanish();
    } else if (language === 'de') {
        translateToGerman();
    } else if (language === 'ru') {
        translateToRussian();
    } else {
        // Default to English
        translateToEnglish();
    }
}

// Define translation functions for each language
function translateToEnglish() {
    // Translate content to English
    document.querySelector('h2').textContent = "Login";
    document.querySelector('label[for="username"]').textContent = "Username";
    document.querySelector('label[for="password"]').textContent = "Password";
    document.querySelector('button.btn').textContent = "Login";
}

function translateToFrench() {
    // Translate content to French
    document.querySelector('h2').textContent = "Connexion";
    document.querySelector('label[for="username"]').textContent = "Nom d'utilisateur";
    document.querySelector('label[for="password"]').textContent = "Mot de passe";
    document.querySelector('button.btn').textContent = "Connexion";
}

function translateToSpanish() {
    // Translate content to Spanish
    document.querySelector('h2').textContent = "Iniciar sesión";
    document.querySelector('label[for="username"]').textContent = "Nombre de usuario";
    document.querySelector('label[for="password"]').textContent = "Contraseña";
    document.querySelector('button.btn').textContent = "Iniciar sesión";
}

function translateToGerman() {
    // Translate content to German
    document.querySelector('h2').textContent = "Anmeldung";
    document.querySelector('label[for="username"]').textContent = "Benutzername";
    document.querySelector('label[for="password"]').textContent = "Passwort";
    document.querySelector('button.btn').textContent = "Anmeldung";
}

function translateToRussian() {
    // Translate content to Russian
    document.querySelector('h2').textContent = "Войти";
    document.querySelector('label[for="username"]').textContent = "Имя пользователя";
    document.querySelector('label[for="password"]').textContent = "Пароль";
    document.querySelector('button.btn').textContent = "Войти";
}
document.addEventListener('mousemove', (e) => {
    const container = document.getElementById('container');
    const xPos = (e.clientX / window.innerWidth) * 100;
    const yPos = (e.clientY / window.innerHeight) * 100;
    container.style.background = `linear-gradient(${xPos}deg, #ff00ff, #00ffff)`;
});

const languageData = {
    en: {
        login_title: 'Login',
        login_button: 'Login'
    },
    de: {
        login_title: 'Anmeldung',
        login_button: 'Anmelden'
    },
    ru: {
        login_title: 'Вход',
        login_button: 'Войти'
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        element.innerText = languageData[lang][key];
    });

    document.documentElement.setAttribute('lang', lang);
}
