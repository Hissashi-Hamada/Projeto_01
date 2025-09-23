// Funções de máscara para React: recebem valor e retornam valor formatado
export const maskCPF = (value) => {
  let val = value.replace(/\D/g,'').slice(0,11);
  val = val.replace(/(\d{3})(\d)/,'$1.$2');
  val = val.replace(/(\d{3})(\d)/,'$1.$2');
  val = val.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  return val;
};

export const maskPhone = (value) => {
  let val = value.replace(/\D/g,'').slice(0,11);
  if(val.length>10) val = val.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
  else val = val.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
  return val;
};

export const maskDate = (value) => {
  let val = value.replace(/\D/g,'');
  if(val.length>2) val = val.slice(0,2)+'/'+val.slice(2);
  if(val.length>5) val = val.slice(0,5)+'/'+val.slice(5,9);
  return val;
};
