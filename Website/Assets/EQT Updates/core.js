// function openPage() {
//     var x = document.getElementById("search").value;
//     if (x == "h" || x == "H" || x == "Home" || x == "home" || x == "1")
//         window.open("main_page.html", "_self");
// }

function initializedModalVers() {

    // Variables
    let isContextMenuOpen = 0;
    let canOpenTheContextMenu = 1;
    let currentTarget = null;
    let currentTargetType = null;

    const contextmenu = document.querySelector('#context-menu');
    const contextBackBtn = document.querySelector('#button-back');
    const contextForwardBtn = document.querySelector('#button-forward');
    const contextReloadBtn = document.querySelector('#button-reload');
    const contextOpenNewTab = document.querySelector('#button-open-new-tab');
    const contextShareBtn = document.querySelector('#button-share');
    const contextCopyBtn = document.querySelector('#button-copy');
    const contextDownloadImageBtn = document.querySelector('#button-download-image');
    const contextPrintBtn = document.querySelector('#button-print');

    const contextHistorySection = document.querySelector('#history-actions-context-menu-section');
    const contextQuickActionsSection = document.querySelector('#quick-actions-context-menu-section');
    const contextAdvanceActionsSection = document.querySelector('#advance-actions-context-menu-section');

    const modalVers = document.querySelector('#version-modal');
    const openModalVers = document.querySelector('#button-open-version-modal');
    const closeModalVers = document.querySelector('#button-close-version-modal');
    const openEqtPageBtn = document.querySelector('#button-open-eqt');
    const changelogBtn = document.querySelector('#changelog-btn');
    const playEqtGameBtn = document.querySelector('#button-play-eqt');
    const downloadEqtPageBtn = document.querySelector('#button-download-eqt');
    const aboutACLBtn = document.querySelector('#acl-btn');

    // Context Menu Handler
    document.addEventListener('contextmenu', event => {
        contextmenu.classList.remove("active");
        event.preventDefault();

        if (!canOpenTheContextMenu)
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

        if (text.length > 0 || currentTargetType == "image") {
            contextCopyBtn.style.display = 'inline';
        }
        else {
            contextCopyBtn.style.display = 'none';
        }

        if (currentTargetType == "image") {
            contextDownloadImageBtn.style.display = 'inline';
        }
        else {
            contextDownloadImageBtn.style.display = 'none';
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
    })

    document.addEventListener("scroll", event => {
        contextmenu.classList.remove("active");
        contextmenu.classList.remove("activated");

        currentTarget = null;
        currentTargetType = null;
        isContextMenuOpen = 0;
    });

    // Get Elements
    document.addEventListener('mousemove', event => {

        if (isContextMenuOpen == 1) return;

        const x = event.clientX;
        const y = event.clientY;
        const element = document.elementFromPoint(x, y);

        if (element == null)
            return;

        if (element.tagName === 'A') {
            const link = element.getAttribute('href');
            currentTarget = link;
            currentTargetType = "text";
        }
        else if (element.tagName === 'IMG') {
            const src = element.getAttribute('src');
            currentTarget = src;
            currentTargetType = "image";
        }
        else if (element.id === 'context-menu') { }
        else if (element.classList.contains('menuLinkLongAlt')) { }
        else if (element.classList.contains('line')) { }
        else if (element.tagName === 'BUTTON') {
            currentTargetType = "button";
            currentTarget = event;
        }
        else {
            if (isContextMenuOpen > 1) {
                currentBtnEvent = null;
                currentTarget = null;
                currentTargetType = null;
            }
        }
    });

    // Close The Context Menu
    document.addEventListener('click', event => {
        contextmenu.classList.remove("active");
        contextmenu.classList.remove("activated");

        currentTarget = null;
        currentTargetType = null;
        isContextMenuOpen = 0;
    })

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
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
    })

    contextBackBtn?.addEventListener('click', () => {
        window.history.back();
    })

    contextForwardBtn?.addEventListener('click', () => {
        window.history.forward();
    })

    contextOpenNewTab?.addEventListener('click', () => {
        if (currentTargetType == "button") {
            console.log(currentTarget);
            currentTarget.target.click();
        }
        else {
            if (currentTarget != null)
                open(currentTarget, "_blank");
        }
    })

    contextShareBtn?.addEventListener('click', () => {
        navigator.share({
            text: 'Check this website!',
            url: 'https://microtwi.com',
            title: "Microtwi",
        });
    })

    contextCopyBtn?.addEventListener('click', () => {
        if (currentTargetType === "image") {
            var text = "https://microtwi.com/" + currentTarget;
            navigator.clipboard.writeText(text);
        }
        else {
            var text = window.getSelection().toString();
            navigator.clipboard.writeText(text);
        }
    })

    contextDownloadImageBtn?.addEventListener('click', () => {
        if (currentTargetType === "image") {
            var text = "https://microtwi.com/" + currentTarget;

            const imgUrl = text;
            const a = document.createElement("a");
            a.href = imgUrl;
            a.download = "";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    })

    contextPrintBtn?.addEventListener('click', () => {
        window.print();
    })

    openModalVers?.addEventListener('click', () => {
        modalVers.showModal();
        document.body.style.overflow = 'hidden';
        new Audio("Assets/Audio/Error Sound.mp3").play();

        // Close the context menu
        contextmenu.classList.remove("active");
        contextmenu.classList.remove("activated");

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

    // Other Buttons

    openEqtPageBtn?.addEventListener('click', () => {
        if (isContextMenuOpen != 0) {
            open("eqt.html", "_blank");
        }
        else {
            open("eqt.html", "_self");
        }
    })

    playEqtGameBtn?.addEventListener('click', () => {
        open("microtwieqt://", "_self");
    })

    changelogBtn?.addEventListener('click', () => {
        if (isContextMenuOpen != 0) {
            open("eqt_changelog.html", "_blank");
        }
        else {
            open("eqt_changelog.html", "_self");
        }
    })

    aboutACLBtn?.addEventListener('click', () => {
        if (isContextMenuOpen != 0) {
            open("acl.html", "_blank");
        }
        else {
            open("acl.html", "_self");
        }
    })

    // Check to see if the user has downloaded the game!
    var hasDownloadedTheGame = localStorage.getItem("hasDownloadedTheGame");

    if (window.screen.width > 850) {
        if (hasDownloadedTheGame != null && hasDownloadedTheGame == "true") {
            playEqtGameBtn.style.display = "inline";
            downloadEqtPageBtn.style.display = "none";
        }
        else {
            playEqtGameBtn.style.display = "none";
            downloadEqtPageBtn.style.display = "inline";

            downloadEqtPageBtn?.addEventListener('click', () => {
                localStorage.setItem("hasDownloadedTheGame", "true");
                open("eqt_changelog.html", "_self");
                // Download The Game!
            })
        }
    }
    else {
        playEqtGameBtn.style.display = "none";
        downloadEqtPageBtn.style.display = "inline";
    }
}

function redirectToPage() {
    window.open("construction.html", "_self");
}

function cancelScrolling() {
    document.body.style.overflow = 'hidden';
}

// const disabledKeys = ["u", "I"];

// const showAlert = e => {
//     e.preventDefault();
//     return alert("Sorry, you can't view or copy source codes this way!");
// }

// document.addEventListener("contextmenu", e => {
//     showAlert(e);
// });

// document.addEventListener("keydown", e => {
//     if (e.ctrlKey && disabledKeys.includes(e.key) || e.key === "F12") {
//         showAlert(e);
//     }
// });