export function html({ url, host, email }) {
    // Insert invisible space into domains and email address to prevent both the
    // email address and the domain from being turned into a hyperlink by email
    // clients like Outlook and Apple mail, as this is confusing because it seems
    // like they are supposed to click on their email address to sign in.
    const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`
    const escapedHost = `${host.replace(/\./g, "&#8203;.")}`
  
  
    return `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Добро пожаловать в Таинственный переулок.</h2>
      
      <h3 style="text-align: center; text-transform: uppercase;">${escapedHost}</h3>
      
      <p>Поздравляю! Вы зарегистрировались с эл. адресом <strong>${escapedEmail}</strong>.
      Нажмите кнопку для входа.
      
      </p>
      
      <a href=${url} target="_blank" style="background: crimson; text-decoration: none; color: white; padding: 1rem 3rem; margin: 10px 0; display: inline-block;">Sign in with Email</a>
      <p>Если кнопка не работает, то используйте ссылку для входа на сайт.</p>
      <div>${url}</div>
      </div>
    `
  }
  
  export function text({ url, host }) {
    return `Ссылка для входа ${host}\n${url}\n\n`
  }