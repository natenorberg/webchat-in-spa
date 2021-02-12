(function () {
  var chat;
  var tenant = 'nate';
  var cp = 'default';
  var routes = ['/one', '/three'];
  var chatWasAvailable = false;

  var options = {
    contactPoint: cp,
  };

  function isPathSupported(path) {
    return routes.some((r) => path.includes(r));
  }

  function initialLoadChat() {
    var pathSupported = isPathSupported(window.location.pathname);

    chat = window.Quiq({
      ...options,
      allowNewConversation: pathSupported,
    });
    chat.getChatStatus().then((status) => {
      chatWasAvailable = pathSupported || status.active;
    });
  }

  function loadChat() {
    if (!chatWasAvailable) {
      chat.reinitialize({...options, allowNewConversation: true});
    }

    chatWasAvailable = true;
  }

  function hideChat() {
    if (chat) {
      chat.getChatStatus().then((status) => {
        if (!status.active && chatWasAvailable) {
          chat.reinitialize({
            ...options,
            allowNewConversation: false,
          });
          chatWasAvailable = false;
        }
      });
    }
  }

  function onPathChanged(path) {
    if (isPathSupported(path)) {
      loadChat();
    } else {
      hideChat();
    }
  }

  const script = document.createElement('script');
  script.onload = () => {
    initialLoadChat();
    (function (history) {
      var pushState = history.pushState;
      history.pushState = function (state) {
        try {
          onPathChanged(arguments[2]);
        } finally {
          return pushState.apply(history, arguments);
        }
      };
    })(window.history);
  };
  script.src = `https://nate.quiq.dev:3000/app/webchat/index.js`;
  document.head.appendChild(script);
})();
