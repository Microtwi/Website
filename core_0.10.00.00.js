// Variables
let isContextMenuOpen = 0;
let canOpenTheContextMenu = 1;
let currentTarget = null;
let currentMouseTarget = null;
let currentTargetType = null;
let currentMouseTargetType = null;
let contextmenu;

// Context Menu Initialization
function initializedContextMenu() {
    contextmenu = document.querySelector('#context-menu');
    const contextBackBtn = document.querySelector('#button-back');
    const contextForwardBtn = document.querySelector('#button-forward');
    const contextReloadBtn = document.querySelector('#button-reload');
    const contextOpenNewTab = document.querySelector('#button-open-new-tab');
    const contextShareBtn = document.querySelector('#button-share');
    const contextCopyBtn = document.querySelector('#button-copy');
    const contextPrintBtn = document.querySelector('#button-print');
    const contextZoomBtn = document.querySelector('#button-zoom');

    const contextHistorySection = document.querySelector('#history-actions-context-menu-section');
    const contextQuickActionsSection = document.querySelector('#quick-actions-context-menu-section');

    // Context Menu Handler
    document.addEventListener('contextmenu', event => {
        contextmenu.classList.remove("active");

        event.preventDefault();
        currentTarget = currentMouseTarget;
        currentTargetType = currentMouseTargetType;

        if (canOpenTheContextMenu == 0)
            return;

        // Context Menu Animations
        if (isContextMenuOpen == 0) {
            isContextMenuOpen = 1;
            contextmenu.classList.add("active");
        }
        else {
            isContextMenuOpen = 2;
            contextmenu.classList.add("activated");
        }

        // Context Menu Buttons
        if (history.length === 1) {
            contextBackBtn.style.display = 'none';
            contextForwardBtn.style.display = 'none';
            contextHistorySection.style.display = 'none';
        } else {
            contextBackBtn.style.display = 'inline';
            contextForwardBtn.style.display = 'inline';
            contextHistorySection.style.display = 'block';
        }

        if (currentTarget == null) {
            contextOpenNewTab.style.display = 'none';
        } else {
            contextOpenNewTab.style.display = 'inline';
        }

        var text = window.getSelection().toString();

        if (text.length > 0 || currentTargetType == "image" || currentTargetType == "video") {
            contextCopyBtn.style.display = 'inline';
        }
        else {
            contextCopyBtn.style.display = 'none';
        }

        if (currentTargetType == "image") {
            contextZoomBtn.style.display = 'inline';
        }
        else {
            contextZoomBtn.style.display = 'none';
        }

        if (currentTarget == null && text.length <= 0) {
            contextQuickActionsSection.style.display = 'none';
        }
        else {
            contextQuickActionsSection.style.display = 'block';
        }

        // Check Context Menu Pos
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        let contextMenuWidth = contextmenu.offsetWidth;
        let contextMenuHeight = contextmenu.offsetHeight;

        contextmenu.style.top = event.y + "px";
        contextmenu.style.left = event.x + "px";

        // Check Boundaries
        // console.log(window.innerHeight + "px");
        // console.log(event.y + "px");
        // console.log(window.innerHeight - contextmenu.offsetHeight - 20 + "px");

        if (event.y > window.innerHeight - contextmenu.offsetHeight - 20) {
            contextmenu.style.top = window.innerHeight - contextmenu.offsetHeight - 20 + "px";
        }

        if (event.x > window.innerWidth - contextmenu.offsetWidth - 20) {
            contextmenu.style.left = window.innerWidth - contextmenu.offsetWidth - 50 + "px";
        }

        // Context Menu Animations
        if (isContextMenuOpen == 1) {
            if (event.x > window.innerWidth - contextmenu.offsetWidth - 20) {
                contextmenu.style.left = window.innerWidth - contextmenu.offsetWidth - 70 + "px";
            }
        }
        else {
            if (event.x > window.innerWidth - contextmenu.offsetWidth - 20) {
                contextmenu.style.left = window.innerWidth - contextmenu.offsetWidth - 50 + "px";
            }
        }
    });

    document.addEventListener("scroll", event => {
        contextmenu.classList.remove("active");
        contextmenu.classList.remove("activated");

        currentTarget = null;
        currentTargetType = null;
        isContextMenuOpen = 0;
        closeImage();
    });

    // Get Elements
    document.addEventListener('mousemove', event => {
        const x = event.clientX;
        const y = event.clientY;
        const element = document.elementFromPoint(x, y);

        if (element == null)
            return;

        if (element.tagName === 'A') {
            const link = element.getAttribute('href');
            currentMouseTarget = link;
            currentMouseTargetType = "text";
        }
        else if (element.tagName === 'IMG') {
            const src = element.getAttribute('src');
            currentMouseTarget = src;
            currentMouseTargetType = "image";
        }
        else if (element.tagName === 'VIDEO') {
            const src = element.getAttribute('src');
            currentMouseTarget = src;
            currentMouseTargetType = "video";
        }
        else if (element.id === 'context-menu') { }
        else if (element.classList.contains('menuLinkLongAlt')) { }
        else if (element.classList.contains('line')) { }
        else if (element.tagName === 'BUTTON') {
            currentMouseTarget = event;
            currentMouseTargetType = "button";
        }
        else {
            currentBtnEvent = null;
            currentMouseTarget = null;
            currentMouseTargetType = null;
        }
    });

    // Close The Context Menu
    document.addEventListener('click', event => {
        contextmenu.classList.remove("active");
        contextmenu.classList.remove("activated");

        currentTarget = null;
        currentTargetType = null;
        isContextMenuOpen = 0;
    });

    document.addEventListener("keydown", function (event) {
        if (event.shiftKey || event.keyCode === 27) {
            contextmenu.classList.remove("active");
            contextmenu.classList.remove("activated");

            currentTarget = null;
            currentTargetType = null;
            isContextMenuOpen = 0;
        }
    });

    document.addEventListener("mousedown", function (event) {
        if (event.button === 1) {
            contextmenu.classList.remove("active");
            contextmenu.classList.remove("activated");

            currentTarget = null;
            currentTargetType = null;
            isContextMenuOpen = 0;
        }
    });

    // Context Menu Buttons
    contextReloadBtn?.addEventListener('click', () => {
        window.location.reload();
    });

    contextBackBtn?.addEventListener('click', () => {
        window.history.back();
    });

    contextForwardBtn?.addEventListener('click', () => {
        window.history.forward();
    });

    contextOpenNewTab?.addEventListener('click', () => {
        if (currentTargetType == "button") {
            console.log(currentTarget);
            currentTarget.target.click();
        }
        else {
            if (currentTarget != null)
                open(currentTarget, "_blank");
        }
    });

    contextShareBtn?.addEventListener('click', () => {
        navigator.share({
            text: 'Check this website!',
            url: 'https://microtwi.com',
            title: "Microtwi",
        });
    });

    contextCopyBtn?.addEventListener('click', () => {
        if (currentTargetType === "image" || currentTargetType === "video") {
            var text = "https://microtwi.com/" + currentTarget;
            navigator.clipboard.writeText(text);
        }
        else {
            var text = window.getSelection().toString();
            navigator.clipboard.writeText(text);
        }
    });

    contextPrintBtn?.addEventListener('click', () => {
        window.print();
    });

    contextZoomBtn?.addEventListener('click', () => {
        zoomImage();
    });
}

let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

function zoomImage() {
    if (currentTargetType == "image") {
        var div = document.querySelector(".fullscreenImageBG");
        div.classList.add("active");

        var oldDiv = document.querySelector("#fullscreenImgContext");

        if (oldDiv != null) {
            oldDiv.remove();
        }

        let newWinWidth = window.innerWidth;
        let newWinHeight = window.innerHeight;
        if ((newWinWidth - winWidth > 150 || newWinWidth - winWidth < -150) && (newWinHeight - winHeight > 50 || newWinHeight - winHeight < -50)) {
            winWidth = window.innerWidth;
            winHeight = window.innerHeight;
        }

        div.insertAdjacentHTML("beforeend", '<img src="' + currentTarget + '"width="' + winWidth / 1.3 + 'px" class="fullscreenImage" id="fullscreenImgContext"></img>');

        var newDiv = document.querySelector("#fullscreenImgContext");
        newDiv?.addEventListener('click', () => {
            closeImage();
        })

        newDiv.style.top = ((winHeight - newDiv.offsetHeight) / 2) + "px";
        newDiv.style.left = ((winWidth - newDiv.offsetWidth) / 2) + "px";
        // document.body.style.overflow = 'hidden';
    }
}

function closeImage() {
    document.body.style.overflow = '';

    var div = document.querySelector(".fullscreenImageBG");
    div.classList.remove("active");

    var oldDiv = document.querySelector("#fullscreenImgContext");

    if (oldDiv != null) {
        oldDiv.remove();
    }
}

// Modal Window Initialization
function initializedModalVers() {
    const modalVers = document.querySelector('#version-modal');
    const openModalVers = document.querySelector('#button-open-version-modal');
    const closeModalVers = document.querySelector('#button-close-version-modal');

    openModalVers?.addEventListener('click', () => {
        modalVers.showModal();
        document.body.style.overflow = 'hidden';
        new Audio("Assets/Audio/Error Sound.mp3").play();

        // Close the context menu
        contextmenu?.classList.remove("active");
        contextmenu?.classList.remove("activated");

        currentTarget = null;
        currentTargetType = null;
        isContextMenuOpen = 0;
        canOpenTheContextMenu = 0;
    })

    closeModalVers?.addEventListener('click', () => {
        modalVers.close();
        document.body.style.overflow = '';
        canOpenTheContextMenu = 1;
    })
}