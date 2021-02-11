(function () {
  var chatLoaded = false;
  var tenant = 'nate';
  var cp = 'default';
  var routes = ['/one', '/three'];

  function loadChat(newPath) {
    var path = newPath || window.location.pathname;

    if (!chatLoaded) {
      if (routes.includes(path)) {
        console.log('loading chat');

        // eslint-disable-next-line no-unused-vars
        var chat = window.Quiq({
          contactPoint: cp,
        });

        chatLoaded = true;
      }
    }
  }

  const script = document.createElement('script');
  script.onload = () => {
    loadChat();

    (function (history) {
      var pushState = history.pushState;
      history.pushState = function (state) {
        console.log(arguments);

        loadChat(arguments[2]);
        return pushState.apply(history, arguments);
      };
    })(window.history);
  };
  script.src = `https://${tenant}.quiq-api.com/app/webchat/index.js`;
  document.head.appendChild(script);
})();
