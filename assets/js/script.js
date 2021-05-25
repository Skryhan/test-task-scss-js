const prev = document.querySelector(".arrow-left")
const next = document.querySelector(".arrow-right")
const slides = document.querySelectorAll(".slider-box-elem")
const dots = document.querySelectorAll(".dot")
const mobileMenu = document.querySelector(".menu-mobile-wrap")
const mobileSearch = document.querySelector(".search-mobile-wrap")

let index = 0

const activeSlide = n => {
    for (slide of slides) {
        slide.classList.remove("active")
    }
    slides[n].classList.add("active")
}

const activeDot = n => {
    for (dot of dots) {
        dot.classList.remove("active")
    }
    dots[n].classList.add("active")
}

const prepareCurrentSlide = ind => {
    activeSlide(ind)
    activeDot(ind)
}

const nextSlide = () => {
    if (index == slides.length - 1) {
        index = 0
        prepareCurrentSlide(index)
    } else {
        index++
        prepareCurrentSlide(index)
    }
}

const prevSlide = () => {
    if (index == 0) {
        index = slides.length - 1
        prepareCurrentSlide(index)
    } else {
        index--
        prepareCurrentSlide(index)
    }
}

dots.forEach((item, indexDot) => {
    item.addEventListener("click", () => {
        index = indexDot
        prepareCurrentSlide(index)
    })
})

next.addEventListener("click", nextSlide)
prev.addEventListener("click", prevSlide)


let _users = []

function modalControl() {

    const $modalWrap = document.querySelector(".modal-wrap")

    const open = () => {
        $modalWrap.classList.add("show")
    }

    const close = () => {
        $modalWrap.classList.remove("show")
    }

    const toggle = (event) => {
        if (event === "close") {
            close()
        } else {
            open()
        }
    }

    return { toggle }
}

const modal = modalControl()




function validate() {

    const clearForm = () => {

        let $inputs = document.querySelectorAll(".form-input")
        for (let $input of $inputs) {
            $input.value = ''
            $input.classList.remove('error')
        }
    };

    const getOk = () => {

        let $inputs = document.querySelectorAll(".form-input")
        let user = {}
        modal.toggle('close')
        for (let $input of $inputs) {
            user[$input.dataset.type] = $input.value
        }
        _users.push(user)
        clearForm()
    }

    const checkForm = () => {

        let errors = false
        let $inputs = document.querySelectorAll(".form-input")

        for (let $input of $inputs) {
            if (!$input.value) {
                errors = true
                $input.classList.add("error")
            } else {
                $input.classList.remove("error")
            }
        }
        if (!errors) {
            getOk()
        }
    }

    return { checkForm, clearForm}
}

let valid = validate()


document.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("modal-wrap") ||
        e.target.classList.contains("btn-close")
    ) {
        modal.toggle("close")
    }
    if (
        e.target.classList.contains("user-log-in") ||
        e.target.classList.contains("text-log-in")
    ) {
        modal.toggle("open")
    }
    if (e.target.classList.contains("form-btn")) {
        valid.checkForm()
    }
    if (e.target.classList.contains("burger")) {
        mobileMenu.classList.add("active")
    }
    if (e.target.classList.contains("menu-mobile-cross")) {
        mobileMenu.classList.remove("active")
    }
    if (e.target.classList.contains("search-mobile")) {
        mobileSearch.classList.add("active")
    }
    if (e.target.classList.contains("search-mobile-cross")) {
        mobileSearch.classList.remove("active")
    }
    
})