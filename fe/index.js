const body = document.querySelector('body')
const a = document.querySelector('p')
const loading = document.querySelector('.loading')
loading.style.display = 'none'
a.addEventListener('click', (e)=>{
    e.preventDefault();
    loading.style.display = 'block';
    loading.innerHTML = 'loading...'
    location = "http://localhost:5000/google";
})
body.style.background = 'white'
