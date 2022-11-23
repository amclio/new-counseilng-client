import { supabase } from '../libs/supabase.js'

async function SignInAPI() {
  const email = document.getElementById('LOGIN_ID').value
  const password = document.getElementById('LOGIN_PW').value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return alert(error)
  }

  location.href = '/'
}

const signInButton = document.getElementById('LOGIN_BTN')
signInButton.addEventListener('click', SignInAPI)

async function SignUpAPI() {
  const email = document.getElementById('SIGNUP_EMAIL').value
  const nickname = document.getElementById('SIGNUP_NICKNAME').value
  const password = document.getElementById('SIGNUP_PW').value

  if (!email || !nickname || !password) {
    return alert('입력란을 모두 작성해주세요.')
  }

  if (password.length < 6) {
    return alert('비밀번호는 적어도 6자리이어야 합니다.')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname },
    },
  })

  if (error) {
    return alert(error)
  }

  location.href = '/'
}

const signUpButton = document.getElementById('SIGNUP_BTN')
signUpButton.addEventListener('click', SignUpAPI)
