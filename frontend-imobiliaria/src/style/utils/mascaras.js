// Campos adicionais
const inputNascimento = document.getElementById('inputNascimento');
const inputCPF = document.getElementById('inputCPF');
const inputTelefone = document.getElementById('inputTelefone');

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
