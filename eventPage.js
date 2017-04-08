/**
 * Returns the URL to redirect to.
 */
function getRedirectedUrl(url) {
  var regex = /(.*)www\.amazon\.(.*)/;
  return url.replace(regex, '$1smile.amazon.$2');
}

/**
 * Loads a URL on a tab.
 */
function setTabUrl(tabId, url) {
  var updateProps = {
    url: url
  }
  chrome.tabs.update(tabId, updateProps);
}

/**
 * Callback for "onBeforeNavigate" event.
 */
function onBeforeNavigate(details) {
  // redirect the tab
  var tabId = details.tabId;
  var url = details.url;
  setTabUrl(tabId, getRedirectedUrl(url));
};

chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate, {
  url: [
    {hostEquals: 'www.amazon.com'},
    {hostEquals: 'www.amazon.de'}
  ]
});
