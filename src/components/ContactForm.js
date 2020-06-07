import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label id="first name" htmlFor="firstName">First Name*</label>
          <input
          data-testid="firstName"
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, maxLength: 30 })}
          />
          {errors.firstName && (
            <p data-testid="firstNameError">Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
          data-testid="lastName"
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p data-testid="lastNameError">Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input data-testid="email" name="email" ref={register({ required: true })} />
          {errors.email && (
            <p data-testid="emailError">Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea data-testid="message" name="message" ref={register({ required: false })} />
        </div>
        {data && (
          <pre data-testid="contact" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )} 
        <input data-testid="submit" type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
