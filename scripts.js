import { baseUrl } from './libs/config.js'
import { supabase } from './libs/supabase.js'

async function getData() {
  // /articles 테스트 API
  const url = baseUrl + '/articles'
  const response = await fetch(url, {
    /* POST일 경우 아래에 'POST'라고 넣기 */
    method: 'GET',
  })

  const data = await response.json()
  return data
}

async function createList(data) {
  const list = document.querySelector('#list')
  const template = document.querySelector('#template')

  // 데이터가 배열일 때
  for (let i = data.length - 1; i >= 0; i--) {
    const article = data[i]
    const href = '/view.html?id=' + article.id
    const title = article.title
    const person = article.profiles.raw_user_meta_data.nickname
    const date = new Date(article.created_at).toDateString()

    const template = `
      <tr>
        <td><a href="${href}">${title}</a></td>
        <td><a href="${href}">${person}</a></td>
        <td><a href="${href}">${date}</a></td>
        <td><a href="${href}">조회수</a></td>
      </tr>
    `

    list.innerHTML += template
  }
}

async function loadList() {
  const data = await getData()
  await createList(data)
}

const loginButton = document.getElementById('login-button')
const writeButton = document.getElementById('write-button')
const profileButton = document.getElementById('profile-button')

async function changeHeaderState() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return
  }

  loginButton.innerText = '로그아웃'
  loginButton.href = '#'
  loginButton.setAttribute('data-is-login', 'true')

  writeButton.style.display = 'inline-block'
  profileButton.style.display = 'inline-block'
}

// 페이지가 다 로드되면 loadList 함수 호출
loadList()
changeHeaderState()

loginButton.addEventListener('click', () => {
  if (loginButton.getAttribute('data-is-login') === 'true') {
    supabase.auth.signOut().then(() => location.reload())
  }
})
