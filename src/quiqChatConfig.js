(function () {
  var chat;
  var tenant = 'nate';
  var cp = 'default';
  var routes = [];
  var chatWasAvailable = false;

  fetch('/supported-routes.txt')
    .then((resp) => resp.text())
    .then((result) => {
      routes = result.split('\n');
    });

  var options = {
    contactPoint: cp,
    customLaunchButtons: ['.StartQuiqChat'],
    showDefaultLaunchButton: true,
  };

  function isPathSupported(path) {
    console.log(routes);

    return routes.some((r) => path.includes(r));
  }

  function initialLoadChat() {
    var pathSupported = isPathSupported(window.location.pathname);

    chat = window.Quiq({
      ...options,
      allowNewConversation: pathSupported,
      seo: {
        delayScriptLoad: {
          enabled: true,
          delay: 2000
        }
      }
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
            allowNewConversation: false
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
  script.src = `https://${tenant}.quiq-api.com/app/webchat/v2/index.js`;
  document.head.appendChild(script);
})();
