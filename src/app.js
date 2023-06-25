import { setNickname } from './nickname';
import { renderAllChat, renderOneMessage } from './chat';

const ws = new WebSocket('ws://localhost:7070/ws');
const blockSetNickname = document.querySelector('.container-set-nick');
const btnAddNick = blockSetNickname.querySelector('.nick-send');
const BlockMessages = document.querySelector('.block-messages');
const inputMessage = document.querySelector('.chat-message');
const btnSendMessage = document.querySelector('.chat-send');
let selfNickname;

btnAddNick.addEventListener('click', () => {
  const elementInput = blockSetNickname.querySelector('.nick-input');
  const elementError = blockSetNickname.querySelector('.message-error');
  elementError.innerText = '';
  const strInput = elementInput.value.trim();
  if (strInput === '') return;
  const strMessage = JSON.stringify({ sendler: 'setNickname', text: strInput });
  ws.send(strMessage);
  selfNickname = strInput;
});

btnSendMessage.addEventListener('click', () => {
  const message = inputMessage.value;
  if (!message || !selfNickname) return;
  const strMessage = JSON.stringify({ sendler: 'setMessage', text: message });
  ws.send(strMessage);
  inputMessage.value = '';
});

ws.addEventListener('open', () => {
});

ws.addEventListener('close', () => {
});

ws.addEventListener('error', (e) => {
  console.log(e);
  console.log('ws error');
});

ws.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);

  if (data.sendler === 'setNickname') {
    const resultSetNick = setNickname(blockSetNickname, data.text, selfNickname);
    if (resultSetNick === 'error') {
      selfNickname = undefined;
    }
  }

  if (data.sendler === 'setMessage') {
    renderOneMessage(BlockMessages, data.text, selfNickname);
  }

  if (data.sendler === 'setAllMessage') {
    renderAllChat(BlockMessages, data.text, selfNickname);
  }
});
