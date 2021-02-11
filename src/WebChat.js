import {useEffect, useState} from 'react';
import queryString from 'query-string';

let chat;

const useCustomerField = (fieldId, value, submittedTime, chatLoaded) => {
  useEffect(() => {
    if (chatLoaded) {
      chat.setChatRegistrationField(`schema.conversation.customer.${fieldId}`, value);
    }
  }, [value, fieldId, submittedTime, chatLoaded]);
};

const WebChat = ({firstName, lastName, phoneNumber, submittedTime}) => {
  const [chatLoaded, setChatLoaded] = useState(false);

  useEffect(() => {
    const {tenant = 'nate', cp = 'default'} = queryString.parse(window.location.search);

    const script = document.createElement('script');
    script.onload = () => {
      chat = window.Quiq({
        contactPoint: cp,
      });
    };
    script.src = `https://${tenant}.quiq-api.com/app/webchat/index.js`;
    document.head.appendChild(script);
  }, []);

  return null;
};

export default WebChat;
