<template>
    <div class="chat-container">
        <div class="chat-log">
            <ul>
                <li v-for="message in messages"
                    v-bind:class="{owned : message.author.displayName === user.displayName}">
                    <div class="message-body">
                        {{ message.message }}
                    </div>
                    <div class="author">
                        <img v-bind:src="message.author.photoURL" alt="">
                        <span>{{ message.author.displayName }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chat-form" v-if="loggedIn">
            <form action="#" v-on:submit.prevent="sendMessage">
                <div class="message-input">
                    <input type="text" rows="3" v-model="newMessage" autofocus/>
                </div>
                <button type="submit"><i class="fa fa-send"></i></button>
            </form>
        </div>
    </div>
</template>

<script>
    import db from './Database'
    import Auth from './Auth'
    let messagesRef = db.ref('messages');

    export default {
        name: 'chatLog',
        firebase: () => {
            return {
                messages: messagesRef
            }
        },
        components: {Auth},
        data: () => {
            return {
                newMessage: '',
                user: {
                    displayName: 'Guest',
                    photoURL: ''
                },
                loggedIn: false
            }
        },
        created: function () {
            let vm = this;
            vm.eventHub.$on('auth:loggedin', data => {
                vm.user = data;
                vm.loggedIn = true;
            });
            vm.eventHub.$on('auth:loggedout', data => {
                vm.user = {
                    displayName: 'Guest',
                    photoURL: ''
                };
                vm.loggedIn = false;
            });
        },
        methods: {
            sendMessage: function () {
                if (this.user && this.newMessage.length > 0) {
                    let message = {
                        message: this.newMessage,
                        author: {
                            displayName: this.user.displayName,
                            photoURL: this.user.photoURL
                        }
                    }
                    messagesRef.push(message);
                    this.newMessage = '';
                }
            }
        }
    }
</script>
<style lang="scss">
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .chat-container {
        height: 100%;
        height: 100vh;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 45px;
        margin-top: 52px;
        background-color: #f6f6f6;
        .chat-log {
            box-sizing: border-box;
            width: 100%;
            overflow-y: scroll;
            ul {
                list-style: none;
                width: 100%;
                float: left;
                padding: 10px;
                li {
                    clear: both;
                    float: right;
                    box-sizing: border-box;
                    margin-bottom: 5px;
                    border-radius: 10px;
                    background-color: #42b983;
                    color: #ffffff;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    .message-body {
                        float: left;
                        box-sizing: border-box;
                    }
                    .author {
                        box-sizing: border-box;
                        float: right;
                        padding-left: 20px;
                        img {
                            display: block;
                            max-width: 35px;
                            max-height: 35px;
                            float: right;
                        }
                        span {
                            display: none;
                            float: right;
                            clear: both;
                            text-align: right;
                            font-size: 0.7rem;
                            margin-top: 5px;
                            color: #255637;
                        }
                        &:hover{
                            span{
                                display: block;
                            }
                        }
                    }
                    &.owned {
                        float: left;
                        background-color: #72b7ff;
                        flex-direction: row-reverse;
                        .message-body {
                            float: right;
                        }
                        .author {
                            text-align: left;
                            float: left;
                            padding-left: 0px;
                            padding-right: 20px;
                            img {
                                float: left;
                            }
                            span {
                                float: left;
                                clear: both;
                            }
                        }
                    }
                }
            }
        }
    }

    .chat-form {
        background-color: #ffffff;
        width: 100%;
        margin: 10px 0;
        padding: 10px 10px;
        float: left;
        clear: both;
        height: 45px;
        position: fixed;
        bottom: 0px;
        form {
            background-color: #ffffff;
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            text-align: center;
            position: relative;
            .message-input{
                width: 100%;
                padding-right: 65px;
                input {
                    width: 100%;
                    padding: 12px;
                    border-radius: 10px;
                    background: #ffffff;
                    border: none;
                    border: 2px solid #2390bb;
                    &:focus {
                        outline: none;
                    }
                }
            }
            button {
                padding: 10px 20px;
                text-align: center;
                border-radius: 10px;
                background-color: #2390bb;
                color: #ffffff;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                border: none;
                margin-left: 10px;
                font-size: 1rem;
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
</style>