(function () {
  var chat;
  // var tenant = 'nate';
  var cp = 'default';
  var routes = ['/one', '/three'];

  var options = {
    contactPoint: cp,
  };

  function loadChat() {
    if (chat) {
      chat.reinitialize(options);
    } else {
      chat = window.Quiq(options);
    }
  }

  function unloadChat() {
    if (chat) {
      chat.reinitialize({
        contactPoint: 'dont-show',
      });
    }
  }

  function checkPathForChat(path) {
    if (routes.some((r) => path.includes(r))) {
      loadChat();
    } else {
      unloadChat();
    }
  }

  const script = document.createElement('script');
  script.onload = () => {
    checkPathForChat(window.location.pathname);

    (function (history) {
      var pushState = history.pushState;
      history.pushState = function (state) {
        try {
          checkPathForChat(arguments[2]);
        } finally {
          return pushState.apply(history, arguments);
        }
      };
    })(window.history);
  };
  script.src = `https://nate.quiq.dev:3000/app/webchat/index.js`;
  document.head.appendChild(script);
})();
