const darkLightTheme = window.localStorage.getItem('dark-light-theme');
if (darkLightTheme === 'dark') {
  document.documentElement.classList.add('dark-mode');
  document.documentElement.classList.remove('light-mode')
}
if (darkLightTheme === 'light') {
  document.documentElement.classList.add('light-mode')
  document.documentElement.classList.remove('dark-mode');
} 
