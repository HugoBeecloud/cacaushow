var CHAT_VOLL = '#chat_Voll';
var HELP_BUTTON_ENABLED = '.helpButtonEnabled';
var DOCKABLE_CONTAINER = '.dockableContainer';
var EMBEDDED_SERVICE_SIDEBAR_MINIMIZED_DEFAULT_UI =
  '.embeddedServiceSidebarMinimizedDefaultUI';

function waitForElementAndRun(selector, callback) {
  var observerInterval = setInterval(function () {
    var element = document.querySelector(selector);
    if (element) {
      callback();
      clearInterval(observerInterval);
    }
  }, 500);

  setTimeout(function () {
    clearInterval(observerInterval);
  }, 30000);
}

function hideBaseElements() {
  // Hiding voll chat
  waitForElementAndRun(CHAT_VOLL, function () {
    document.querySelector(CHAT_VOLL).style.display = 'none';
  });

  // Hiding help button
  waitForElementAndRun(HELP_BUTTON_ENABLED, function () {
    document.querySelector(HELP_BUTTON_ENABLED).style.display = 'none';
  });
}

function buildChatMenu() {
  var chat = document.createElement('div');
  chat.innerHTML =
    '' +
    '<style>' +
    '.dockableContainer {' +
    '	left: 0 !important;' +
    '}' +
    '.embeddedServiceSide {' +
    '	left: 0 !important;' +
    '}' +
    '.embeddedServiceHelpButton .helpButton, .embeddedServiceSidebarMinimizedDefaultUI {' +
    '	left: 0 !important;' +
    '}' +
    '.helpButton {width: 50% !important;}' +
    '  .chat-menu {' +
    '    background-color: #352727;' +
    '    right: 0;' +
    '    bottom: 0;' +
    '    position: fixed;' +
    '    width: 15%;' +
    '    border-radius: 10px 10px 0 0;' +
    '    background-position: 100%;' +
    '    background-repeat: no-repeat;' +
    '    background-size: cover;' +
    '    z-index: 99;' +
    '  }' +
    '  .chat-menu-header {' +
    '    list-style: none;' +
    '    cursor: pointer;' +
    '    text-align: center;' +
    '    font-weight: bold;' +
    '    background-color: #5a9857;' +
    '    color: white;' +
    '    padding: 1rem;' +
    '    border-radius: 10px 10px 0 0;' +
    '    display: flex;' +
    '    justify-content: center;' +
    '    align-items: center;' +
    '    gap: 1rem;' +
    '  }' +
    '  .buttons-list {' +
    '    display: flex;' +
    '    flex-direction: column;' +
    '    gap: 1rem;' +
    '    padding: 1rem;' +
    '  }' +
    '  .chat-button {' +
    '    cursor: pointer;' +
    '    background-color: #659c57;' +
    '    color: white;' +
    '    border: none;' +
    '    padding: 1rem;' +
    '    border-radius: 10px;' +
    '    transition: all 0.5s;' +
    '    font-weight: bold;' +
    '  }' +
    '  .chat-button:hover {' +
    '    background-color: #446e3a;' +
    '  }' +
    '  @media (max-width: 768px) {' +
    '    .chat-menu {' +
    '      width: 40%;' +
    '    }' +
    '  }' +
    '</style>' +
    "<details class='chat-menu'>" +
    "  <summary class='chat-menu-header'>Atendimento</summary>" +
    "  <div class='buttons-list'></div>" +
    '</details>';

  document.body.appendChild(chat);

  var buttonsToCreate = [
    {
      id: 'bchat',
      text: 'Fale com o SAC',
      preConditionSelector: HELP_BUTTON_ENABLED,
      action: function () {
        var bchatButton = document.querySelector('#bchat');
        var dockableContainer = document.querySelector(DOCKABLE_CONTAINER);

        if (dockableContainer) {
          bchatButton.innerHTML = 'O atendimento já está aberto!';

          setTimeout(function () {
            bchatButton.innerHTML = 'Fale com o SAC';
          }, 1000);

          return;
        }

        if (bchatButton) bchatButton.innerHTML = 'Aguarde...';

        setTimeout(function () {
          bchatButton.innerHTML = 'Fale com o SAC';
        }, 2000);

        var helpButtonEnabled = document.querySelector(HELP_BUTTON_ENABLED);

        if (helpButtonEnabled) helpButtonEnabled.click();

        if (dockableContainer)
          dockableContainer.style.setProperty('display', 'block', 'important');
      },
    },
    {
      id: 'cchat',
      text: 'Vendas Online',
      preConditionSelector: CHAT_VOLL,
      action: function () {
        var linkComponent = document.querySelector(CHAT_VOLL);
        if (linkComponent) window.open(linkComponent.href, '_blank');
      },
    },
  ];

  var buttonsList = document.querySelector('.buttons-list');

  buttonsToCreate.forEach(function (buttonToCreate) {
    waitForElementAndRun(buttonToCreate.preConditionSelector, function () {
      var button = document.createElement('button');
      button.id = buttonToCreate.id;
      button.className = 'chat-button';
      button.innerHTML = buttonToCreate.text;

      button.addEventListener('click', buttonToCreate.action);

      buttonsList.appendChild(button);
    });
  });

  checkIfHasChatActions();
}

function checkIfHasChatActions() {
  setInterval(function () {
    var buttons = document.querySelectorAll('.chat-button');

    if (buttons.length === 0) {
      var menu = document.querySelector('.chat-menu');

      if (menu) {
        menu.remove();
      }
    }
  }, 1000);
}

function runCustomChat() {
  console.log('👋 CustomChatMenu Started...');
  hideBaseElements();
  buildChatMenu();
}

runCustomChat();
