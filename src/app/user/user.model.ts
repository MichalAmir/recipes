import { EmailValidator } from "@angular/forms";
export class User {
    static Counter: number = 0;
    id: number;
    name: string;
    address: string;
    email: string;
    password!: string
        constructor(name: string = '', address: string = '', email: string = '', password: string = '') {
        this.id = ++User.Counter;
        this.name = name;
        this.address = address;
        this.email = email;
        this, password = password;
    }
}