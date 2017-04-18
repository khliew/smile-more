/** Storage key for enabling extension. */
const KEY_ENABLED = 'enabled';

/** The extension-enabled element. */
let enabledCheckbox;

/**
 * Load settings.
 */
function loadSettings() {
  chrome.storage.sync.get({[KEY_ENABLED]: true}, function(items) {
    setExtensionEnabled(items.enabled);
  });
}

/**
 * Saves a setting value.
 */
function saveSetting(key, value) {
  chrome.storage.sync.set({[key]: value});
}

/**
 * Sets whether or not the extension is enabled.
 */
function setExtensionEnabled(enabled) {
  enabledCheckbox.checked = enabled;
}

/**
 * Callback for enabled changes.
 */
function onEnableExtensionChange(event) {
  saveSetting(KEY_ENABLED, event.target.checked);
}

document.addEventListener('DOMContentLoaded', function() {
  enabledCheckbox = document.getElementById('enableExtension');
  enabledCheckbox.onchange = onEnableExtensionChange;

  loadSettings();
});
