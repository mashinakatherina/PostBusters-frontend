document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

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

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    const registerMailForm = document.querySelector('#register-mail-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const formData = {
                login: username,
                password: password,
            };

            try {
                const response = await fetch('http://192.168.168.119:8080/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData),
                    credentials: 'include' // Ensure cookies are included in the request
                });

                if (!response.ok) {
                    throw new Error('Failed to login');
                }

                const data = await response.json();
                if (data) {
                    window.sessionStorage.clear();
                    window.sessionStorage.setItem('name', formData.login);
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Login failed');
                }
            } catch (error) {
                console.error('Error:', error.message);
                alert('Login failed: ' + error.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const surname = document.getElementById('surname').value;
            const formData = {
                login: username,
                password: password,
                email: email,
                name: name,
                surname: surname
            };

            try {
                const response = await fetch('http://192.168.168.119:8080/create-user', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData),
                    // credentials: 'include' // Ensure cookies are included in the request
                });

                if (!response.ok) {
                    throw new Error('Failed to register');
                }

                const data = await response.json();
                if (data) {
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error.message);
                alert('Registration failed: ' + error.message);
            }
        });
    }

    if (registerMailForm) {
        registerMailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const mailname = document.getElementById('mailname').value;
            const address = document.getElementById('address').value;
            const notes = document.getElementById('notes').value;
            const formData = {
                name: mailname,
                address: address,
                notes: notes
            };

            try {
                const response = await fetch('http://192.168.168.119:8080/put/PostBoxes/' +
                    window.sessionStorage.getItem('name'), {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(formData),
                    // credentials: 'include' // Ensure cookies are included in the request
                });

                if (!response.ok) {
                    throw new Error('Failed to register');
                }

                const data = await response.json();
                if (data) {
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error.message);
                alert('Registration failed: ' + error.message);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Check if the current page is inbox.html
    if (window.location.pathname.endsWith('inbox.html')) {
        fetchPostboxes();
    }
});

async function fetchPostboxes() {
    try {
        const formData = {
            username: window.sessionStorage.getItem('name')
        };
        console.log(window.sessionStorage.getItem('name'));
        const response = await fetch('http://192.168.168.119:8080/PostBoxes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });


        if (!response.ok) {
            if (response.status === 401) {
                debugger;
                window.location.href = 'index.html'; // Redirect to login if unauthorized
            } else {
                throw new Error('Failed to fetch postboxes');
            }
        }

        const postboxes = await response.json();
        await displayPostboxes(postboxes);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function displayPostboxes(postboxes) {
    const mailboxesTable = document.createElement('table');
    mailboxesTable.classList.add('mailbox-table');

    // Создаем заголовок таблицы
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>ID</th>
        <th>Name</th>
        <th>Address</th>
        <th>Notes</th>
        <!-- Add more header columns if needed -->
    `;
    tableHeader.appendChild(headerRow);
    mailboxesTable.appendChild(tableHeader);

    // Создаем тело таблицы с данными
    const tableBody = document.createElement('tbody');
    postboxes.forEach(mail => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mail.id}</td>
            <td>${mail.name}</td>
            <td>${mail.address}</td>
            <td>${mail.notes}</td>
            <!-- Add more columns if needed -->
        `;
        tableBody.appendChild(row);
    });
    mailboxesTable.appendChild(tableBody);

    // Добавляем таблицу на страницу
    const mailboxesDiv = document.querySelector('.mailboxes');
    mailboxesDiv.appendChild(mailboxesTable);
}


function viewHistory(postboxId) {
    window.location.href = `mailbox-history.html?postboxId=${postboxId}`;
}

async function changeLanguage(lang) {
    const response = await fetch(`resources/${lang}.json`);
    const translations = await response.json();
    applyTranslations(translations);
    localStorage.setItem('lang', lang);
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        element.textContent = translations[key];
    });
}

function goBack() {
    window.history.back();
}
