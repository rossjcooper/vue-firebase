<template>
    <div id="app">
        <auth></auth>
        <chat-log></chat-log>
    </div>
</template>

<script>
    import db from './Database'
    import Auth from './Auth'
    import ChatLog from './ChatLog'

    export default {
        name: 'app',
        components: {Auth, ChatLog},
        data: () => {
            return {
                user : null,
            }
        },
        created : function(){
            let vm = this;
            vm.eventHub.$on('auth:loggedin', data => {
                console.log(data);
                vm.user = data;
            });
            vm.eventHub.$on('auth:loggedout', data => {
                console.log(data);
                vm.user = data;
            });
        }
    }
</script>

<style lang="scss">
    body{
        margin: 0;
    }
    $red: #ff4a45;
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }

    small.error {
        color: #ff4a45;
    }

    .fa-close {
        color: #ff4a45;
    }
</style>
