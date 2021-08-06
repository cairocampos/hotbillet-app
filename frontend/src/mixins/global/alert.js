export default {
    data() {
        return {
            currency: {precision:2, decimal:".", thousand:""}
        }
    },
    methods: {
        alert(status, message) {
            const toaster = this.$toast
            toaster[status](message);
        },

        getMessage(response) {
            if('status' in response && response.status == 401) {
                this.$store.dispatch('logout');
                return response.data.message;
            }
            
            if('errors' in response.data == false)
                return response.data.message

            
            return Object.entries(response.data.errors);
        },

        success(message) {
            this.alert('success', message);
        },

        error(data) {
            const message = this.getMessage(data);

            if(!Array.isArray(message)) 
                return this.alert('error', message);
            
            message.forEach(item => {
                let [,message] = item;

                setTimeout(() => {
                    this.alert('error',message);
                    
                }, 500);
            });
        },

        warning(data) {
            const message = this.getMessage(data);

            if(!Array.isArray(message)) 
                return this.alert('warning', message);

            message.forEach(item => {
                let [,message] = item;

                setTimeout(() => {
                    this.alert('error',message);
                    
                }, 500);
            });
        },

        info(message) {
            this.alert('info',message);
        }
    }
}