import { baseUrl } from './libs/config.js'

const postTitle = document.getElementById('post-title')
const postId = document.getElementById('post-id')
const postAuthor = document.getElementById('post-author')
const postDate = document.getElementById('post-date')
const postContent = document.getElementById('post-content')

const getContent = (id) =>
  fetch(baseUrl + '/articles/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

function setConetnt({ title, id, author, date, content }) {
  postTitle.innerHTML = title
  postId.innerHTML = id
  postAuthor.innerHTML = author
  postDate.innerHTML = date
  postContent.innerHTML = content
}

async function loadPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const paramId = urlParams.get('id')

  const res = await getContent(paramId)
  const {
    title,
    id: contentId,
    profiles: {
      raw_user_meta_data: { nickname: author },
    },
    content,
    created_at,
  } = (await res.json())[0]

  setConetnt({
    title,
    id: contentId,
    author,
    content,
    date: new Date(created_at).toLocaleDateString(),
  })
}

loadPage()
