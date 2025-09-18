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

// Campos adicionais
const inputNascimento = document.getElementById('inputNascimento');
const inputCPF = document.getElementById('inputCPF');
const inputTelefone = document.getElementById('inputTelefone');

// Lista curta de senhas muito comuns
const COMMON_PASSWORDS = ['123456','123456789','password','12345678','qwerty','abc123','senha','111111','123123','12345'];

// Mostrar/ocultar senha
togglePasswordBtn.addEventListener('click', () => {
    const newType = inputPassword.type === 'password' ? 'text' : 'password';
    inputPassword.type = newType;
    inputConfirmPassword.type = newType;
    togglePasswordBtn.textContent = newType === 'text' ? 'Ocultar' : 'Mostrar';
});

// Funções de segurança da senha
function isSequentialNumber(pw) {
    if (!/^\d+$/.test(pw)) return false;
    let increasing = true, decreasing = true;
    for (let i = 0; i < pw.length-1; i++){
        const cur = parseInt(pw[i]), next = parseInt(pw[i+1]);
        if (next !== cur +1) increasing=false;
        if (next !== cur -1) decreasing=false;
    }
    return increasing || decreasing;
}

function isPossibleDate(pw){
    const digits = pw.replace(/\D/g,'');
    if(digits.length===8){
        const dd=parseInt(digits.slice(0,2)), mm=parseInt(digits.slice(2,4)), yyyy=parseInt(digits.slice(4,8));
        return dd>=1 && dd<=31 && mm>=1 && mm<=12 && yyyy>=1900 && yyyy<=2100;
    } else if(digits.length===6){
        const dd=parseInt(digits.slice(0,2)), mm=parseInt(digits.slice(2,4));
        return dd>=1 && dd<=31 && mm>=1 && mm<=12;
    } else if(digits.length===4){
        const mm=parseInt(digits.slice(0,2)), dd=parseInt(digits.slice(2,4));
        return dd>=1 && dd<=31 && mm>=1 && mm<=12;
    }
    return false;
}

function evaluatePassword(pw){
    let score=0, suggestions=[];
    if(!pw) return {score:0,label:'—', suggestions:['Digite uma senha.']};
    if(COMMON_PASSWORDS.includes(pw.toLowerCase())) return {score:0,label:'Muito Fraca', suggestions:['Senha muito comum — evite combinações óbvias.']};
    if(isSequentialNumber(pw)) return {score:0,label:'Muito Fraca', suggestions:['Senha não pode ser sequência numérica.']};
    if(isPossibleDate(pw)) return {score:0,label:'Muito Fraca', suggestions:['Senha não pode conter datas.']};
    if(pw.length>=8) score++; else suggestions.push('Use pelo menos 8 caracteres.');
    if(/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++; else suggestions.push('Misture letras maiúsculas e minúsculas.');
    if(/[0-9]/.test(pw)) score++; else suggestions.push('Inclua ao menos um número.');
    if(/[^A-Za-z0-9]/.test(pw)) score++; else suggestions.push('Inclua ao menos um símbolo (ex: !@#$%).');
    if(/(.)\1\1/.test(pw) && score>0){score--; suggestions.push('Evite caracteres repetidos seguidos.');}
    const map = {0:{label:'Muito Fraca',colorClass:'bg-danger',percent:10},1:{label:'Fraca',colorClass:'bg-danger',percent:30},2:{label:'Média',colorClass:'bg-warning',percent:55},3:{label:'Boa',colorClass:'bg-info',percent:75},4:{label:'Forte',colorClass:'bg-success',percent:100}};
    return {score,...map[score], suggestions};
}

function updateStrengthUI(){
    const result = evaluatePassword(inputPassword.value);
    strengthFill.style.width = (result.percent||0)+'%';
    strengthFill.className='strength-fill';
    if(result.colorClass) strengthFill.classList.add(result.colorClass);
    strengthLabel.textContent='Força da senha: '+result.label;
    strengthScore.textContent=result.score+'/4';
    suggestionsEl.innerHTML = result.suggestions.slice(0,3).map(s=>'• '+s).join('<br>');
    if(result.score<=1 && inputPassword.value.length>0){
        inputPassword.classList.add('is-invalid'); inputPassword.classList.remove('is-valid');
    } else if(result.score>=3){
        inputPassword.classList.add('is-valid'); inputPassword.classList.remove('is-invalid');
    } else inputPassword.classList.remove('is-invalid','is-valid');
    return result;
}
inputPassword.addEventListener('input', updateStrengthUI);
inputPassword.addEventListener('blur', updateStrengthUI);

// Alertas
function showAlert(msg,type='danger'){alertArea.innerHTML=`<div class="alert alert-${type} mb-0" role="alert">${msg}</div>`;}
function clearAlert(){alertArea.innerHTML='';}

// Máscara Data (DD/MM/AAAA)
inputNascimento.addEventListener('input', function(){
    let value=inputNascimento.value.replace(/\D/g,'');
    if(value.length>2) value=value.slice(0,2)+'/'+value.slice(2);
    if(value.length>5) value=value.slice(0,5)+'/'+value.slice(5,9);
    inputNascimento.value=value;
});

// Máscara CPF (XXX.XXX.XXX-XX)
inputCPF.addEventListener('input', function(){
    let value = inputCPF.value.replace(/\D/g,'').slice(0,11);
    value = value.replace(/(\d{3})(\d)/,'$1.$2');
    value = value.replace(/(\d{3})(\d)/,'$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    inputCPF.value = value;
});

// Máscara Telefone ((XX) XXXXX-XXXX)
inputTelefone.addEventListener('input', function(){
    let value = inputTelefone.value.replace(/\D/g,'').slice(0,11);
    if(value.length > 10){
        value = value.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
    }
    inputTelefone.value = value;
});

// Submissão
form.addEventListener('submit', (e)=>{
    e.preventDefault(); e.stopPropagation(); clearAlert(); form.classList.remove('was-validated');
    const result=updateStrengthUI();
    if(!form.checkValidity()){form.classList.add('was-validated'); showAlert('Corrija os campos destacados e tente novamente.','warning'); return;}
    if(inputPassword.value!==inputConfirmPassword.value){inputConfirmPassword.setCustomValidity('As senhas não coincidem'); form.classList.add('was-validated'); showAlert('As senhas não coincidem.','danger'); return;} 
    else inputConfirmPassword.setCustomValidity('');
    if(result.score<2){showAlert('A senha está muito fraca — melhore a senha antes de prosseguir.','danger'); return;}
    submitBtn.disabled=true; submitBtn.textContent='Cadastrando...';
    form.submit(); // envia para o Laravel
});
