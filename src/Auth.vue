<template>
    <div class="auth-bar">
        <button v-if="!isLoggedIn" v-on:click="login" class="login-btn">Login with <i class="fa fa-google"></i></button>
        <span v-if="isLoggedIn">Hello {{ user.displayName }}</span>
        <button v-if="isLoggedIn" v-on:click="logout" class="logout-btn">Logout</button>
    </div>
</template>
<script>
    import firebase from 'firebase';
    //Get the Google Auth Provider
    let provider = new firebase.auth.GoogleAuthProvider();
    export default {
        name: 'auth',
        data: ()=>{
            return {
                user : null,
            }
        },
        methods: {
            login: function () {
                let vm = this;
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    let token = result.credential.accessToken;
                    // The signed-in user info.
                    vm.user = result.user;
                    vm.eventHub.$emit('auth:loggedin', vm.user);
                }).catch(function (error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.error(error);
                    vm.user = null;
                    vm.eventHub.$emit('auth:loggedout', vm.user);
                    // The email of the user's account used.
                    let email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    let credential = error.credential;
                    // ...
                });
            },
            logout: function () {
                let vm = this;
                firebase.auth().signOut().then(function () {
                    vm.user = null;
                    vm.eventHub.$emit('auth:loggedout', vm.user);
                })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        computed: {
            isLoggedIn: function () {
                return (this.user !== null);
            }
        }
    };

</script>
<style lang="scss">
    .auth-bar{
        background-color: #2390bb;
        color: #ffffff;
        text-align: right;
        width: 100%;
        padding: 2px;
        position: fixed;
        top: 0;
    }
    .login-btn, .logout-btn{
        padding: 10px 20px;
        background-color: #ff5e3e;
        color: #ffffff;
        border-radius: 15px;
        margin: 5px;
        border: none;
        font-size: 1rem;
    }
</style>
