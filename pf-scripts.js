import { supabase } from './libs/supabase.js'

const nameBox = document.getElementById('name')
const emailBox = document.getElementById('email')

async function getUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log('session', session)
  return session.user
}

async function updateUserState() {
  const user = await getUser()

  nameBox.innerHTML = user.user_metadata.nickname
  emailBox.innerHTML = user.email
}

updateUserState()
