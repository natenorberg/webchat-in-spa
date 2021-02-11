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

const routes = ['/one', '/three'];

const WebChat = ({firstName, lastName, phoneNumber, submittedTime}) => {
  const [chatLoaded, setChatLoaded] = useState(false);

  const {tenant = 'nate', cp = 'default'} = queryString.parse(window.location.search);

  function loadChat() {
    if (!chatLoaded) {
      if (routes.includes(window.location.pathname)) {
        console.log('loading chat');

        chat = window.Quiq({
          contactPoint: cp,
        });
        setChatLoaded(true);
      }
    }
  }

  useEffect(() => {
    (function (history) {
      var pushState = history.pushState;
      history.pushState = function (state) {
        loadChat();
        return pushState.apply(history, arguments);
      };
    })(window.history);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      loadChat();
    };
    script.src = `https://${tenant}.quiq-api.com/app/webchat/index.js`;
    document.head.appendChild(script);
  }, []);

  return null;
};

export default WebChat;
