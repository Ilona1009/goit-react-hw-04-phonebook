import React from 'react';
import {
  ContactStyled,
  ContactDataStyled,
  ButtonDeleteStyled,
} from './ContactStyled';
export const Contact = ({ contact, onDeleteContact }) => {
  return (
    <ContactStyled>
      <ContactDataStyled>{contact.name}</ContactDataStyled>
      <ContactDataStyled>{contact.number}</ContactDataStyled>
      <ButtonDeleteStyled
        onClick={() => {
          onDeleteContact(contact.id);
        }}
        type="button"
      >
        Delete
      </ButtonDeleteStyled>
    </ContactStyled>
  );
};
