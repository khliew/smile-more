/**
 * Gets the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

/**
 * Returns {@code true} if a URL can be redirected.
 */
function isRedirectable(url) {
  return url.startsWith('https://www.amazon');
}

/**
 * Gets the redirected version of a URL.
 */
function getRedirectedUrl(url) {
  return 'https://smile.amazon' + url.substr(18);
}

function setStatus(text) {
  document.getElementById('status').textContent = text;
}

/**
 * Directs the current active tab to a URL.
 */
function sendCurrentTabTo(url) {
  var updateProps = {
    url: url
  }
  chrome.tabs.update(updateProps);
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    document.getElementById('original').textContent = url;
    if (isRedirectable(url)) {
      setStatus('Success!');
      var redirected = getRedirectedUrl(url);
      document.getElementById('redirected').textContent = redirected;

      sendCurrentTabTo(redirected);
    } else {
      setStatus('Not redirectable!');
    }
  }, function(errorMessage) {
    setStatus('Error: ' + errorMessage);
    document.getElementById('original').textContent = url;
  });
});
