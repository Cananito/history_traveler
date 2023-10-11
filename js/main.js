// UI elements.

let _backButton;
let _forwardButton;
let _pushButton;
let _popToRootButton;
let _historyLengthInfoSpan;
let _historyStateInfoSpan;
let _windowLocationInfoSpan;
let _lastEventSpan;


// Event handling.

function handlePopStateEvent(e) {
  // TODO: might need to combine this with pushState to keep track of
  // history index (history.length is all of the tab's history).
};

function handleBackButtonClick(e) {
  history.back();
  updateUI();
};

function handleForwardButtonClick(e) {
  history.forward();
  updateUI();
};

function handlePushButtonClick(e) {
  // TODO
  // * history.pushState()
  // OR?
  // * window.location
    // * set
  updateUI();
};

function handlePopToRootButtonClick(e) {
  // TODO
  // history.go()
  updateUI();
};


// Rendering.

function updateInfoSpansWithLastEvent(lastEvent) {
  _historyLengthInfoSpan.innerHTML = "history.length: " + history.length;
  _historyStateInfoSpan.innerHTML = "history.state: " + history.state;
  _windowLocationInfoSpan.innerHTML = "window.location: " + window.location.toString();
  _lastEventSpan.innerHTML = "Last event: " + lastEvent;
};

function updateUI() {
  // TODO: length includes all of the tab's history, so won't work.
  if (history.length < 2) {
    _backButton.disabled = true;
    _forwardButton.disabled = true;
    _popToRootButton.disabled = true;
  }
  updateInfoSpansWithLastEvent(null);
};

function initializeUI() {
  const bodyContentDiv = document.createElement("div");

  // back button
  _backButton = document.createElement("button");
  _backButton.innerHTML = "Back";
  _backButton.addEventListener("click", handleBackButtonClick);
  bodyContentDiv.appendChild(_backButton);

  // forward button
  _forwardButton = document.createElement("button");
  _forwardButton.innerHTML = "Forward";
  _forwardButton.addEventListener("click", handleForwardButtonClick);
  bodyContentDiv.appendChild(_forwardButton);

  // push button
  _pushButton = document.createElement("button");
  _pushButton.innerHTML = "Push +1";
  _pushButton.addEventListener("click", handlePushButtonClick);
  bodyContentDiv.appendChild(_pushButton);

  // pop button (does same as back)
  _popToRootButton = document.createElement("button");
  _popToRootButton.innerHTML = "Pop to root";
  _popToRootButton.addEventListener("click", handlePopToRootButtonClick);
  bodyContentDiv.appendChild(_popToRootButton);

  // line breaks
  bodyContentDiv.appendChild(document.createElement("br"));
  bodyContentDiv.appendChild(document.createElement("br"));

  // history length info span
  _historyLengthInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(_historyLengthInfoSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  // history state info span
  _historyStateInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(_historyStateInfoSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  // window location info span
  _windowLocationInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(_windowLocationInfoSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  // last event span
  _lastEventSpan = document.createElement("span");
  bodyContentDiv.appendChild(_lastEventSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  const body = document.body;
  body.appendChild(bodyContentDiv);

  updateUI();
};


// Start-up.

function main() {
  initializeUI();
  window.addEventListener("popstate", handlePopStateEvent);
};
document.addEventListener("DOMContentLoaded", main);
