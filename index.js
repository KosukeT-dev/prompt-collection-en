const form = document.getElementById('form');
const promptInput = document.getElementById('prompt');
const promptList = document.getElementById('list');
let promptData = [];

// ページの読み込み時にlocalStorageからデータを取得する
if (localStorage.getItem('prompts')) {
  promptData = JSON.parse(localStorage.getItem('prompts'));
  renderPromptList(promptData);
}

// フォームの送信イベントを監視し、入力されたプロンプトを保存する
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  if (prompt !== '') {
    promptData.push(prompt);
    localStorage.setItem('prompts', JSON.stringify(promptData));
    renderPromptList(promptData);
    promptInput.value = '';
  }
});

// プロンプト一覧を描画する関数
function renderPromptList(prompts) {
  promptList.innerHTML = '';
  prompts.forEach((prompt, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = prompt;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      promptData.splice(index, 1);
      localStorage.setItem('prompts', JSON.stringify(promptData));
      renderPromptList(promptData);
    });
    listItem.appendChild(deleteButton);
    promptList.appendChild(listItem);
  });
}
