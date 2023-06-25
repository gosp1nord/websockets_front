export function setNickname(blockSetNickname, text, selfNickname) {
  const elementInput = blockSetNickname.querySelector('.nick-input');
  const elementError = blockSetNickname.querySelector('.message-error');
  if (text.status === 'error') {
    elementError.innerText = 'Псевдоним занят, выбери другой.';
    elementInput.value = text.errorNick;
    return 'error';
  }
  renderUsers(text.users, selfNickname);
  elementInput.value = '';
  blockSetNickname.classList.add('hidden');
  return 'ok';
}

function renderUsers(data, selfNickname) {
  const blockUsers = document.querySelector('.block-users');
  blockUsers.innerHTML = '';
  let classSelfNick;
  data.forEach((item) => {
    classSelfNick = '';
    if (item.username === selfNickname) {
      classSelfNick = 'self-nick';
    }
    blockUsers.insertAdjacentHTML('beforeend', `
      <div class="user">
        <img class="user-ava" src="./images/${item.ava}">
        <div class="user-name ${classSelfNick}">${item.username}</div>
      </div>
    `);
  });
}
