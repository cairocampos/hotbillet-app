import axios from 'axios';
let progress = 0;
let bar = document.querySelector('#barra_progresso');
const updateProgress = function(tipo = 'increment') {
    if(tipo == 'increment') {
        if(bar) {
            progress++;
            bar.style.display = 'block';
        }
    } else {
        if(progress > 0) {
            progress--;
        }

        if(progress === 0 && bar) {
            bar.style.display = 'none';
        }
    }
}

const auth = {
    loggedIn() {
        const token = localStorage.getItem('token');
        return token ?? false;
    }
}

const instance = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'https://api.hotbillet.com.br/' : 'http://hotbillet-app.test/api'
});

instance.interceptors.request.use(function(config) {
    updateProgress();
    let token = auth.loggedIn();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function error(error) {
    updateProgress('decrement');
    return Promise.reject(error);
})

instance.interceptors.response.use(function(response) {
    updateProgress('decrement');
    return response;
}, function (error) {
    updateProgress('decrement');
    return Promise.reject(error)
});

const api = {
    get(uri, params) {
        return instance.get(uri, {params})
    },

    post(uri, data) {
        return instance.post(uri, data)
    },

    put(uri, data) {
        return instance.put(uri, data)
    },

    delete(uri) {
        return instance.delete(uri)
    }
}

export { api, auth };