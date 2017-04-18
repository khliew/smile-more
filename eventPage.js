/** Storage key for enabling extension. */
const KEY_ENABLED = 'enabled';

/**
 * Returns the URL to redirect to.
 */
function getRedirectedUrl(url) {
  let regex = /(.*)www\.amazon\.(.*)/;
  return url.replace(regex, '$1smile.amazon.$2');
}

/**
 * Loads a URL on a tab.
 */
function setTabUrl(tabId, url) {
  let updateProps = {
    url: url
  }
  chrome.tabs.update(tabId, updateProps);
}

/**
 * Callback for "onBeforeNavigate" event.
 */
function onBeforeNavigate(details) {
  // check to see if redirect is enabled before redirecting
  chrome.storage.sync.get({[KEY_ENABLED]: true}, function(items) {
    if(items.enabled) {
      // redirect the tab
      let tabId = details.tabId;
      let url = details.url;
      setTabUrl(tabId, getRedirectedUrl(url));
    }
  });
};

// set url filtering
chrome.webNavigation.onBeforeNavigate.addListener(onBeforeNavigate, {
  url: [
    {hostEquals: 'www.amazon.com'},
    {hostEquals: 'www.amazon.de'}
  ]
});
