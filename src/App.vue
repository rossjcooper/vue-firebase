<template>
    <div id="app">
        <ul>
            <li v-for="contact in contacts">
                {{ contact.name}} | {{ contact.age}} years old
                <i class="fa fa-close" v-on:click="deleteContact(contact)"></i>
            </li>
        </ul>
        <form action="#" v-on:submit="addContact">
            <input type="text" placeholder="Name" v-model="newContact.name">
            <small class="error" v-show="!validation.name">Name cannot be empty.</small>
            <input type="number" step="1" min="0" placeholder="Age" v-model="newContact.age">
            <small class="error" v-show="!validation.age">Age must be a number greater than 0.</small>
            <button type="submit">Add</button>
        </form>
    </div>
</template>

<script>
    import db from './Database'
    let contactsRef = db.ref('contacts');
    export default {
        name: 'app',
        firebase: function () {
            return {
                contacts: contactsRef
            }
        },
        data: function () {
            return {
                newContact: {
                    name: '',
                    age: '',
                }
            }
        },
        methods: {
            addContact: function () {
                if (this.isValid) {
                    contactsRef.push(this.newContact);
                    this.newContact.name = '';
                    this.newContact.age = '';
                }
            },
            deleteContact(contact){
                contactsRef.child(contact['.key']).remove();
            }
        },
        computed: {
            validation: function () {
                return {
                    name: !!this.newContact.name.trim(),
                    age: this.newContact.age >= 0,
                }
            },
            isValid: function () {
                let validation = this.validation;
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
            }
        },
    }
</script>

<style lang="scss">
    $red: #ff4a45;
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
    small.error{
        color: #ff4a45;
    }
    .fa-close{
        color: #ff4a45;
    }
</style>
