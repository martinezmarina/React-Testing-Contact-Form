import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from "./ContactForm";

render(<ContactForm />)

const firstNameInput = screen.getByTestId(/firstname/i); 
const lastNameInput = screen.getByTestId(/lastname/i);
const emailInput = screen.getByTestId(/email/i);
const messageInput = screen.getByTestId(/message/i);
const submitButton = screen.getByTestId(/submit/i)


test("Contact form can be filled", () => {
    fireEvent.change(firstNameInput, { target: {value:"Marina"}});
    fireEvent.change(lastNameInput, { target: {value:"Martinez"}});
    fireEvent.change(emailInput, { target: {value:"mmartinez@email.com"}});
    fireEvent.change(messageInput, { target: {value:"I have a secret message"}});
    fireEvent.click(submitButton);

    expect(screen.getByDisplayValue("Marina")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Martinez")).toBeInTheDocument();
    expect(screen.getByDisplayValue("mmartinez@email.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("I have a secret message")).toBeInTheDocument();

    
    expect.objectContaining({
        "firstName": "Mar",
        "lastName": "Martinez",
        "email": "mmartinez@email.com",
        "message": "I have a secret message"
    })

})

test("Contact form adds new three letter name", () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByTestId(/firstname/i); 
    const lastNameInput = screen.getByTestId(/lastname/i);
    const emailInput = screen.getByTestId(/email/i);
    const messageInput = screen.getByTestId(/message/i);
    const submitButton = screen.getByTestId(/submit/i)

    fireEvent.change(firstNameInput, { target: {value:"Ann"}});
    fireEvent.change(lastNameInput, { target: {value:"Burke"}});
    fireEvent.change(emailInput, { target: {value:"test@email.com"}});
    fireEvent.change(messageInput, { target: {value:"test message"}});
    fireEvent.click(submitButton); 

    expect(screen.getByDisplayValue("Ann")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Burke")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@email.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test message")).toBeInTheDocument();

});

    test("Errors show up if value is empty", () => {
        fireEvent.click(submitButton);
    
        setTimeout(() => {
            expect(screen.getByTestId(/firstNameError/i)).toBeInTheDocument();
            expect(screen.getByTestId(/lastNameError/i)).toBeInTheDocument();
            expect(screen.getByTestId(/emailError/i)).toBeInTheDocument();
        }, 1);
});