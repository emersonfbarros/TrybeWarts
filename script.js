const email = document.getElementById('email');
const password = document.getElementById('senha');
const headerForm = document.querySelector('.trybewarts-login');
const divForm = document.querySelector('div');
const h2 = document.querySelector('h2');
const bodyForm = document.getElementById('evaluation-form');
const agreementCheck = document.getElementById('agreement');
const sendButton = document.getElementById('submit-btn');
const txtArea = document.getElementById('textarea');
const txtAndCounterDiv = document.getElementsByClassName('txtarea-and-counter')[0];
const counter = document.getElementById('counter');
const li = ['Nome:', 'Email:', 'Casa:', 'Família:', 'Matérias:', 'Avaliação:', 'Observações:'];
const evaluationInputs = document.getElementById('evaluation-form').querySelectorAll('input');
const house = document.getElementById('house');

// Requisito 21
const getObservations = () => {
  li[6] += ` ${txtArea.value}`;
};

const getGrade = () => {
  for (let gradeIndex = 12; gradeIndex < 22; gradeIndex += 1) {
    li[5] += (evaluationInputs[gradeIndex].checked) ? ` ${evaluationInputs[gradeIndex].value}` : '';
  }
  getObservations();
};

const getSubject = () => {
  let subjects = '';
  for (let sbjIndex = 6; sbjIndex < 12; sbjIndex += 1) {
    subjects += (evaluationInputs[sbjIndex].checked) ? ` ${evaluationInputs[sbjIndex].value},` : '';
  }
  li[4] += `${subjects.slice(0, -1)}.`;
  getGrade();
};

const getFamily = () => {
  for (let famIndex = 3; famIndex < 6; famIndex += 1) {
    li[3] += (evaluationInputs[famIndex].checked) ? ` ${evaluationInputs[famIndex].value}` : '';
  }
  getSubject();
};

const getHouse = () => {
  li[2] += ` ${house.value}`;
  getFamily();
};

const mountEmail = () => {
  li[1] += ` ${evaluationInputs[2].value}`;
  getHouse();
};

const mountName = () => {
  li[0] += ` ${evaluationInputs[0].value} ${evaluationInputs[1].value}`;
  mountEmail();
};

const mountNewForm = () => {
  const data = document.createElement('form');
  data.id = 'form-data';
  const dataList = document.createElement('ul');
  dataList.style.listStyleType = 'none';
  data.appendChild(dataList);
  mountName();
  for (let formIndex = 0; formIndex < li.length; formIndex += 1) {
    const liCreate = document.createElement('li');
    liCreate.innerHTML = li[formIndex];
    dataList.appendChild(liCreate);
  }
  bodyForm.style.display = 'none';
  h2.style.display = 'none';
  divForm.classList.add('show-infos');
  divForm.appendChild(data);
};

// Requisito 3
const passwdEmailCheck = () => {
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    window.alert('Olá, Tryber!');
    return;
  }
  window.alert('Email ou senha inválidos.');
};

// Requisito 18
sendButton.disabled = true;
const validationToSend = () => {
  if (agreementCheck.checked === true) {
    sendButton.disabled = false;
    sendButton.classList.remove('submit-disabled');
    sendButton.style.cursor = 'pointer';
    return;
  }
  sendButton.classList.add('submit-disabled');
  sendButton.removeAttribute('style');
  sendButton.disabled = true;
};

// Estilo para o requisito 20
const txtAreaFocused = () => {
  txtAndCounterDiv.classList.add('txt-area-focused');
};

const txtAreaUnfocused = () => {
  txtAndCounterDiv.classList.remove('txt-area-focused');
};

// Requisito 20
const charCounter = () => {
  counter.innerHTML = '';
  counter.innerHTML = (500 - txtArea.value.length);
};

window.onload = () => {
  headerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    passwdEmailCheck();
  });
  agreementCheck.addEventListener('change', validationToSend);
  txtArea.addEventListener('focus', txtAreaFocused);
  txtArea.addEventListener('blur', txtAreaUnfocused);
  txtArea.addEventListener('keyup', charCounter);
  bodyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    mountNewForm();
  });
};
