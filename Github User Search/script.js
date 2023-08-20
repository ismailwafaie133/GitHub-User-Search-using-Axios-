const API_URL = 'https://api.github.com/users/'

const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')

//getUser('ismailwafaie133')

async function getUser(username) {


    try {
        const { data } = await axios.get(API_URL + username)
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response.status == 404) {
            errorMessage('No Profile With This Username')

        }
    }
}

function errorMessage(message) {
    const cardHTML = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    
    `
    main.innerHTML = cardHTML
}


function createUserCard(user) {
    const cardHTMl = `<div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>

        <div id="repos">
            
        </div>

    </div>
</div>`

    main.innerHTML = cardHTMl
}

async function getRepos(username) {
    try {
        const { data } = await axios.get(API_URL + username + '/repos?sort=created')

        addRepostoCard(data)
    } catch (err) {
        errorMessage("couldn't fetch Repos")
    }
}

function addRepostoCard(repos) {
    const reposEl = document.querySelector('#repos')

    repos
        .slice(0,10)
            .forEach( repo => {
            const repoLink = document.createElement('a')
            repoLink.classList.add('repo')
            repoLink.href = repo.html_url
            repoLink.target = '_blank'
            repoLink.innerText = repo.name
            reposEl.appendChild(repoLink)
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value

    if (user) {
        getUser(user)
        search.value = ''
    }
})

