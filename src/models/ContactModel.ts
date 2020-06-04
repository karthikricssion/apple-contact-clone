interface ContactName {
    firstName: string;
    lastName: string;
}

export default class ContactModel {
    name: ContactName;
    phone: string;
    email: string;
    address: string;
    notes: string;
}