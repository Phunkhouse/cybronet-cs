export function localeRedirect() {  
  const ln = window.navigator.language || navigator.browserLanguage;

  const regex = /\//gi
  const currentLocale = window.location.pathname.replace(regex, '')

  if (sessionStorage.getItem('firstVisit') === null) {
    if (ln === 'cs') {
      window.location.href = '/cs/';
    } else if (ln === 'sk') {
      window.location.href = '/cs/';
    } else if (ln === 'de') {
      window.location.href = '/de/';
    } else {
      window.location.href = '/';
    }

    sessionStorage.setItem('firstVisit', true);
  }
}
