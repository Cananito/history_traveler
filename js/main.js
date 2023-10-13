// UI elements.

let _backButton;
let _forwardButton;
let _pushButton;
let _popToRootButton;
let _historyIndexInfoSpan;
let _historyCountInfoSpan;


// Event handling.

function handlePopStateEvent(e) {
  updateUI();
};

function handleBackButtonClick(e) {
  history.back();
};

function handleForwardButtonClick(e) {
  history.forward();
};

function handlePushButtonClick(e) {
  let historyIndex = 1;
  let currentState = history.state;
  if (currentState.historyIndex) {
    historyIndex = currentState.historyIndex + 1;
  }
  currentState.historyIndex = historyIndex;
  history.pushState(currentState, null, null);
  const popStateEvent = new PopStateEvent('popstate', { state: currentState });
  dispatchEvent(popStateEvent);
};

function handlePopToRootButtonClick(e) {
  const currentState = history.state;
  const historyIndex = currentState.historyIndex;
  history.go(-historyIndex);
};


// Rendering.

function updateUI() {
  const currentState = history.state;
  const historyIndex = currentState.historyIndex;
  const historyCount =
      (history.length - currentState.firstKnownHistoryLength) + 1;

  if (historyIndex < 1) {
    _backButton.disabled = true;
    _popToRootButton.disabled = true;
  } else {
    _backButton.disabled = false;
    _popToRootButton.disabled = false;
  }
  if (historyIndex == historyCount - 1) {
    _forwardButton.disabled = true;
  } else {
    _forwardButton.disabled = false;
  }
  _historyIndexInfoSpan.innerHTML = "historyIndex: " + historyIndex;
  _historyCountInfoSpan.innerHTML = "historyCount: " + historyCount;
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

  const body = document.body;
  body.appendChild(bodyContentDiv);
};


// Start-up.

async function main() {
  if (!history.state) {
    const initialState = {
        historyIndex: 0,
        firstKnownHistoryLength: history.length
    };
    await history.replaceState(initialState, null, null);
  }
  initializeUI();
  updateUI();
  window.addEventListener("popstate", handlePopStateEvent);
};
document.addEventListener("DOMContentLoaded", main);
