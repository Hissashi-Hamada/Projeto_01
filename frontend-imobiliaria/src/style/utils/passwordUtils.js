export const COMMON_PASSWORDS = [
  '123456','123456789','password','12345678','qwerty','abc123','senha','111111','123123','12345'
];

export function togglePasswordVisibility(setShow) {
  return () => setShow(prev => !prev);
}

export function evaluatePassword(pw) {
  let score = 0;
  const suggestions = [];

  if (!pw) return {score:0,label:'—',percent:0,suggestions:['Digite uma senha.']};
  if(COMMON_PASSWORDS.includes(pw.toLowerCase())) return {score:0,label:'Muito Fraca',percent:10,suggestions:['Senha muito comum — evite combinações óbvias.']};
  if(pw.length >= 8) score++; else suggestions.push('Use pelo menos 8 caracteres.');
  if(/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++; else suggestions.push('Misture letras maiúsculas e minúsculas.');
  if(/[0-9]/.test(pw)) score++; else suggestions.push('Inclua ao menos um número.');
  if(/[^A-Za-z0-9]/.test(pw)) score++; else suggestions.push('Inclua ao menos um símbolo (ex: !@#$%).');

  const map = {
    0:{label:'Muito Fraca',percent:10,colorClass:'bg-danger'},
    1:{label:'Fraca',percent:30,colorClass:'bg-danger'},
    2:{label:'Média',percent:55,colorClass:'bg-warning'},
    3:{label:'Boa',percent:75,colorClass:'bg-info'},
    4:{label:'Forte',percent:100,colorClass:'bg-success'}
  };

  return {...map[score], score, suggestions};
}
