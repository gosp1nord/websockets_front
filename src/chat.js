export function renderAllChat(BlockMessages, arrChat, selfNickname) {
  const block = BlockMessages;
  block.innerHTML = '';
  if (arrChat.status === 'ok') {
    arrChat.messages.forEach((element) => {
      renderOneMessage(block, { status: 'ok', message: element }, selfNickname);
    });
  }
}

export function renderOneMessage(BlockMessages, message, selfNickname) {
  const messageData = message;
  if (messageData.status === 'ok') {
    let classMessage = 'block-message-user';
    let className = 'block-name-user';
    let classText = 'block-text';
    if (messageData.message.user === selfNickname) {
      classMessage = 'block-message-self';
      className = 'block-name-self';
      classText = 'block-text-self';
      messageData.message.user = 'Вы';
    }
    BlockMessages.insertAdjacentHTML('beforeend', `
      <div class="${classMessage}">
        <div class="${className}">
          <div class="text-user-name">${messageData.message.user}</div>
          <div class="date-time">${messageData.message.time}</div>
        </div>
        <div class="${classText}">${messageData.message.text}</div>
      </div>
    `);
  }
}
