(function () {
  var chat;

  // Configuration variables
  var tenant = "nate";
  var cp = "default";
  // This is the list of keywords to show webchat for
  // We can set this up to load from an external source if needed
  var routes = ["one", "three"];

  // // Configuration variables
  // var tenant = "bbb-test";
  // var cp = "webtest";
  // // This is the list of keywords to show webchat for
  // // We can set this up to load from an external source if needed
  // var routes = ["knowledgecenter"];

  var chatHasLoaded = false;
  var chatWasAvailable = false;

  var options = {
    contactPoint: cp,
    showDefaultLaunchButton: true,
    styles: {
      ToggleChatButtonIcon: {
        display: "none"
      },
      ToggleChatButton: {
        width: 70,
        height: 70,
        backgroundColor: "transparent",
        backgroundImage:
          'url("data:image/png;base64,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")',
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        boxShadow: "none"
      }
    }
  };

  function isPathSupported(path) {
    return routes.some(function (r) {
      return path.includes(r);
    });
  }

  function initialLoadChat() {
    var pathSupported = isPathSupported(window.location.pathname);

    chat = window.Quiq(
      Object.assign({}, options, {
        allowNewConversation: pathSupported
      })
    );
    chat.getChatStatus().then(function (status) {
      chatWasAvailable = pathSupported || status.active;
    });
  }

  function loadChat() {
    if (!chatWasAvailable) {
      chat.reinitialize(
        Object.assign({}, options, { allowNewConversation: true })
      );
    }

    chatWasAvailable = true;
  }

  function hideChat() {
    if (chat) {
      chat.getChatStatus().then(function (status) {
        if (!status.active && chatWasAvailable) {
          chat.reinitialize(
            Object.assign({}, options, {
              allowNewConversation: false
            })
          );
          chatWasAvailable = false;
        }
      });
    }
  }

  function loadScriptsFromQuiq(onLoad) {
    const script = document.createElement("script");
    script.onload = function () {
      initialLoadChat();
    };
    script.src = "https://" + tenant + ".quiq-api.com/app/webchat/index.js";
    document.head.appendChild(script);
    chatHasLoaded = true;
  }

  function onPathChanged(path) {
    if (isPathSupported(path)) {
      if (!chatHasLoaded) {
        loadScriptsFromQuiq();
      } else {
        loadChat();
      }
    } else {
      hideChat();
    }
  }

  // Subscribe to path change event
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

  // Load chat if we're already on a supported page
  if (isPathSupported(window.location.pathname)) {
    loadScriptsFromQuiq();
  }
})();
