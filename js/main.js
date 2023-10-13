// UI elements.

let _backButton;
let _forwardButton;
let _pushButton;
let _popToRootButton;
let _currentIndexInfoSpan;
let _historyCountInfoSpan;
let _lastEventSpan;


// State.

let _currentIndex = 0;
let _historyCount = 1;


// Event handling.

function handlePopStateEvent(e) {
  // TODO: Handle back and forward here instead of button handlers.
  // That way browser buttons work as well.
  updateUIWithLastEvent(e);
};

function handleBackButtonClick(e) {
  history.back();
  _currentIndex -= 1;
  updateUIWithLastEvent(null);
};

function handleForwardButtonClick(e) {
  history.forward();
  _currentIndex += 1;
  updateUIWithLastEvent(null);
};

function handlePushButtonClick(e) {
  history.pushState(null, null, null);
  _currentIndex += 1;
  _historyCount = _currentIndex + 1;
  updateUIWithLastEvent(null);
};

function handlePopToRootButtonClick(e) {
  history.go(-_currentIndex);
  _currentIndex = 0;
  updateUIWithLastEvent(null);
};


// Rendering.

function updateUIWithLastEvent(lastEvent) {
  if (_currentIndex < 1) {
    _backButton.disabled = true;
    _popToRootButton.disabled = true;
  } else {
    _backButton.disabled = false;
    _popToRootButton.disabled = false;
  }
  if (_currentIndex == _historyCount - 1) {
    _forwardButton.disabled = true;
  } else {
    _forwardButton.disabled = false;
  }
  _currentIndexInfoSpan.innerHTML = "_currentIndex: " + _currentIndex;
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
  _currentIndexInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(_currentIndexInfoSpan);
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
