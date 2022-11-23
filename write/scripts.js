import { baseUrl } from '../libs/config.js'
import { supabase } from '../libs/supabase.js'

let user

async function createPost() {
  const titleInputValue = document.querySelector('input#title').value
  const contentInputValue = document.querySelector('textarea#content').value

  fetch(baseUrl + '/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: user.id,
      title: titleInputValue,
      content: contentInputValue,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      document.location = '/view.html?id=' + result[0].id
    })
    .catch((error) => {
      console.error('실패:', error)
    })
}

const createButton = document.querySelector('#create-post')
createButton.addEventListener('click', createPost)

async function saveUserData() {
  const {
    data: { user: userData },
  } = await supabase.auth.getUser()

  user = userData
}

saveUserData()
