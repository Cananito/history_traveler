// UI elements.

let backButton;
let forwardButton;
let pushButton;
let popToRootButton;
let historyIndexInfoSpan;
let historyCountInfoSpan;


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
    backButton.disabled = true;
    popToRootButton.disabled = true;
  } else {
    backButton.disabled = false;
    popToRootButton.disabled = false;
  }
  if (historyIndex == historyCount - 1) {
    forwardButton.disabled = true;
  } else {
    forwardButton.disabled = false;
  }
  historyIndexInfoSpan.innerHTML = "historyIndex: " + historyIndex;
  historyCountInfoSpan.innerHTML = "historyCount: " + historyCount;
};

function initializeUI() {
  const bodyContentDiv = document.createElement("div");

  // back button
  backButton = document.createElement("button");
  backButton.innerHTML = "Back";
  backButton.addEventListener("click", handleBackButtonClick);
  bodyContentDiv.appendChild(backButton);

  // forward button
  forwardButton = document.createElement("button");
  forwardButton.innerHTML = "Forward";
  forwardButton.addEventListener("click", handleForwardButtonClick);
  bodyContentDiv.appendChild(forwardButton);

  // push button
  pushButton = document.createElement("button");
  pushButton.innerHTML = "Push +1";
  pushButton.addEventListener("click", handlePushButtonClick);
  bodyContentDiv.appendChild(pushButton);

  // pop button (does same as back)
  popToRootButton = document.createElement("button");
  popToRootButton.innerHTML = "Pop to root";
  popToRootButton.addEventListener("click", handlePopToRootButtonClick);
  bodyContentDiv.appendChild(popToRootButton);

  // line breaks
  bodyContentDiv.appendChild(document.createElement("br"));
  bodyContentDiv.appendChild(document.createElement("br"));

  // history length info span
  historyIndexInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(historyIndexInfoSpan);
  bodyContentDiv.appendChild(document.createElement("br"));

  // history state info span
  historyCountInfoSpan = document.createElement("span");
  bodyContentDiv.appendChild(historyCountInfoSpan);
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
