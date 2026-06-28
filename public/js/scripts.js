function goTo(url) {
    window.open(url, null, { popup: true })
}
function playSfx(file) {
    var audio = new Audio(file);
    audio.play();
}

var currentTab = 0
function switchTab(e) {
    if (!e.target.classList.contains("tab")) {
        return null
    }

    var parent = e.target.parentNode
    var child = e.target
    var index = Array.prototype.indexOf.call(parent.children, child)
    var tabsContent = document.getElementById('tabs-content')

    var selected = document.querySelector(".tab.selected")
    selected.classList.remove("selected")
    if (tabsContent.children[currentTab]) {
        tabsContent.children[currentTab].classList.add("hidden")
    }

    child.classList.add("selected")
    var targTabContent = tabsContent.children[index]
    if (targTabContent) {
        targTabContent.classList.remove("hidden")
    }
    currentTab = index
}

var slotTimeOut
function randomSlot() {
    slotTimeOut = setTimeout(function() {
        var wrapper = document.getElementById("slider-wrapper").children[0]
        var children = wrapper.children
        var randomVal = Math.ceil(Math.random() * (children.length - 1)) * 36

        wrapper.style.transform = 'translate(0px, -' + randomVal + 'px)'
    }, 600)
}

function resetSlot() {
    clearTimeout(slotTimeOut)

    var wrapper = document.getElementById("slider-wrapper").children[0]
    wrapper.classList.add('notransition')
    wrapper.style.transform = 'translate(0px, 0px)'
    setTimeout(function() {
        wrapper.classList.remove('notransition')
    }, 200)
}

function updateComments() {
    setTimeout(function() {
        var frameContent = document.all.submitpost.contentDocument.body.innerHTML
        if (frameContent == 'error') {

        } else {
            document.all['guestbook-comments'].innerHTML += frameContent
        }
    }, 500)
}