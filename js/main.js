// UI elements.

let _backButton;
let _forwardButton;
let _pushButton;
let _popToRootButton;
let _historyIndexInfoSpan;
let _historyCountInfoSpan;
let _lastEventSpan;


// State.

// TODO: This strategy breaks apart when reloading the page.
let _historyCount = 1;


// Event handling.

function handlePopStateEvent(e) {
  updateUIWithLastEvent(e);
};

function handleBackButtonClick(e) {
  history.back();
};

function handleForwardButtonClick(e) {
  history.forward();
};

function handlePushButtonClick(e) {
  let historyIndex = 1;
  const currentState = history.state;
  if (currentState) {
    historyIndex = currentState.historyIndex + 1;
  }
  _historyCount = historyIndex + 1;
  const newState = { historyIndex: historyIndex };
  history.pushState(newState, null, null);
  const popStateEvent = new PopStateEvent('popstate', { state: newState });
  dispatchEvent(popStateEvent);
};

function handlePopToRootButtonClick(e) {
  const currentState = history.state;
  const historyIndex = currentState.historyIndex;
  history.go(-historyIndex);
};


// Rendering.

function updateUIWithLastEvent(lastEvent) {
  let historyIndex = 0;
  if (lastEvent && lastEvent.state) {
    const currentState = lastEvent.state;
    historyIndex = currentState.historyIndex;
  }
  if (historyIndex < 1) {
    _backButton.disabled = true;
    _popToRootButton.disabled = true;
  } else {
    _backButton.disabled = false;
    _popToRootButton.disabled = false;
  }
  if (historyIndex == _historyCount - 1) {
    _forwardButton.disabled = true;
  } else {
    _forwardButton.disabled = false;
  }
  _historyIndexInfoSpan.innerHTML = "historyIndex: " + historyIndex;
  _historyCountInfoSpan.innerHTML = "_historyCount: " + _historyCount;
  _lastEventSpan.innerHTML = "Last event: " + lastEvent;
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
  _historyIndexInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(_historyIndexInfoSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  // history state info span
  _historyCountInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(_historyCountInfoSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  // last event span
  _lastEventSpan = document.createElement("span");
  bodyContentDiv.appendChild(_lastEventSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  const body = document.body;
  body.appendChild(bodyContentDiv);

  updateUIWithLastEvent(null);
};


// Start-up.

function main() {
  initializeUI();
  window.addEventListener("popstate", handlePopStateEvent);
};
document.addEventListener("DOMContentLoaded", main);
