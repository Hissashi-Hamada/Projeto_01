// Elementos
const form = document.getElementById('registerForm');
const inputPassword = document.getElementById('inputPassword');
const inputConfirmPassword = document.getElementById('inputConfirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const alertArea = document.getElementById('alertArea');
const submitBtn = document.getElementById('submitBtn');

const strengthFill = document.getElementById('strengthFill');
const strengthLabel = document.getElementById('strengthLabel');
const strengthScore = document.getElementById('strengthScore');
const suggestionsEl = document.getElementById('suggestions');

// Lista curta de senhas muito comuns
const COMMON_PASSWORDS = [
    '123456','123456789','password','12345678','qwerty','abc123','senha','111111','123123','12345'
];

// Mostrar/ocultar senha com melhor acessibilidade
togglePasswordBtn.addEventListener('click', () => {
    const newType = inputPassword.type === 'password' ? 'text' : 'password';
    inputPassword.type = newType;
    inputConfirmPassword.type = newType;
    togglePasswordBtn.textContent = newType === 'text' ? 'Ocultar' : 'Mostrar';
    togglePasswordBtn.setAttribute('aria-label', newType === 'text' ? 'Ocultar senha' : 'Mostrar senha');
});

// Função para detectar sequência numérica crescente ou decrescente
function isSequentialNumber(pw) {
    if (!/^\d+$/.test(pw)) return false; // só números

    let increasing = true;
    let decreasing = true;
    for (let i = 0; i < pw.length - 1; i++) {
        const current = parseInt(pw[i]);
        const next = parseInt(pw[i + 1]);
        if (next !== current + 1) increasing = false;
        if (next !== current - 1) decreasing = false;
    }
    return increasing || decreasing;
}

// Função para detectar formatos simples de data (ddmmaaaa, ddmmaa, mmdd, etc.)
function isPossibleDate(pw) {
    const digits = pw.replace(/\D/g, '');

    if (digits.length === 8) {
        // ddmmaaaa
        const dd = parseInt(digits.slice(0, 2));
        const mm = parseInt(digits.slice(2, 4));
        const yyyy = parseInt(digits.slice(4, 8));
        if (dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12 && yyyy >= 1900 && yyyy <= 2100) return true;
    } else if (digits.length === 6) {
        // ddmmaa
        const dd = parseInt(digits.slice(0, 2));
        const mm = parseInt(digits.slice(2, 4));
        if (dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12) return true;
    } else if (digits.length === 4) {
        // mmdd
        const mm = parseInt(digits.slice(0, 2));
        const dd = parseInt(digits.slice(2, 4));
        if (dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12) return true;
    }

    return false;
}

// Avaliar força da senha
function evaluatePassword(pw) {
    let score = 0;
    const suggestions = [];

    if (!pw) return { score: 0, label: '—', suggestions: ['Digite uma senha.'] };

    if (COMMON_PASSWORDS.includes(pw.toLowerCase())) {
        return { score: 0, label: 'Muito Fraca', suggestions: ['Senha muito comum — evite combinações óbvias.'] };
    }

    // NOVO: recusar sequências numéricas
    if (isSequentialNumber(pw)) {
        return { score: 0, label: 'Muito Fraca', suggestions: ['Senha não pode ser sequência numérica.'] };
    }

    // NOVO: recusar senhas que pareçam datas
    if (isPossibleDate(pw)) {
        return { score: 0, label: 'Muito Fraca', suggestions: ['Senha não pode conter datas.'] };
    }

    if (pw.length >= 8) score++; else suggestions.push('Use pelo menos 8 caracteres.');
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++; else suggestions.push('Misture letras maiúsculas e minúsculas.');
    if (/[0-9]/.test(pw)) score++; else suggestions.push('Inclua ao menos um número.');
    if (/[^A-Za-z0-9]/.test(pw)) score++; else suggestions.push('Inclua ao menos um símbolo (ex: !@#$%).');

    if (/(.)\1\1/.test(pw) && score > 0) {
        score--;
        suggestions.push('Evite caracteres repetidos seguidos.');
    }

    const map = {
        0: { label: 'Muito Fraca', colorClass: 'bg-danger', percent: 10 },
        1: { label: 'Fraca', colorClass: 'bg-danger', percent: 30 },
        2: { label: 'Média', colorClass: 'bg-warning', percent: 55 },
        3: { label: 'Boa', colorClass: 'bg-info', percent: 75 },
        4: { label: 'Forte', colorClass: 'bg-success', percent: 100 }
    };

    return { score, ...map[score], suggestions };
}

// Atualizar UI da força
function updateStrengthUI() {
    const result = evaluatePassword(inputPassword.value);

    strengthFill.style.width = (result.percent || 0) + '%';
    strengthFill.className = 'strength-fill';
    if (result.colorClass) strengthFill.classList.add(result.colorClass);

    strengthLabel.textContent = 'Força da senha: ' + result.label;
    strengthScore.textContent = result.score + '/4';
    suggestionsEl.innerHTML = result.suggestions.slice(0, 3).map(s => '• ' + s).join('<br>');

    if (result.score <= 1 && inputPassword.value.length > 0) {
        inputPassword.classList.add('is-invalid');
        inputPassword.classList.remove('is-valid');
    } else if (result.score >= 3) {
        inputPassword.classList.add('is-valid');
        inputPassword.classList.remove('is-invalid');
    } else {
        inputPassword.classList.remove('is-invalid', 'is-valid');
    }

    return result;
}

inputPassword.addEventListener('input', updateStrengthUI);
inputPassword.addEventListener('blur', updateStrengthUI);

// Alertas
function showAlert(message, type = 'danger') {
    alertArea.innerHTML = `<div class="alert alert-${type} mb-0" role="alert">${message}</div>`;
}
function clearAlert() {
    alertArea.innerHTML = '';
}

// Submissão do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearAlert();
    form.classList.remove('was-validated');

    const result = updateStrengthUI();

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        showAlert('Corrija os campos destacados e tente novamente.', 'warning');
        return;
    }

    if (inputPassword.value !== inputConfirmPassword.value) {
        inputConfirmPassword.setCustomValidity('As senhas não coincidem');
        form.classList.add('was-validated');
        showAlert('As senhas não coincidem.', 'danger');
        return;
    } else {
        inputConfirmPassword.setCustomValidity('');
    }

    if (result.score < 2) {
        showAlert('A senha está muito fraca — melhore a senha antes de prosseguir.', 'danger');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Cadastrando...';

    // 🔽 ADICIONADO: Enviar os dados pro backend Laravel
    const nome = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const senha = inputPassword.value;

    fetch('/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ nome, email, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensagem) {
            showAlert(data.mensagem, 'success');
            setTimeout(() => window.location.href = 'login.html', 900);
        } else {
            showAlert('Erro ao cadastrar. Verifique os dados.', 'danger');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        showAlert('Erro de conexão com o servidor.', 'danger');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Cadastrar';
    });
});

// Configurações de acessibilidade
inputPassword.setAttribute('autocomplete', 'new-password');
inputConfirmPassword.setAttribute('autocomplete', 'new-password');
