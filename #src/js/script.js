"use strict"

// * PRELOADER

window.onload = function () {
    document.body.classList.add('loaded-hiding');
    document.body.style.overflow = 'hidden';
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded-hiding');
        document.body.style.overflow = 'auto';
    }, 500);
}

window.addEventListener('DOMContentLoaded', function () {

    // * CHECK MOBILE DEVICES

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.iOS() ||
                isMobile.Opera()
            );
        }
    }

    if (isMobile.any()) {
        document.body.classList.add('_touch');

        let menuArrows = document.querySelectorAll('.menu__arrow');
        if (menuArrows.length > 0) {
            for (let index = 0; index < menuArrows.length; index++) {
                const menuArrow = menuArrows[index];
                menuArrow.addEventListener('click', function (e) {
                    menuArrow.parentElement.classList.toggle('_active');
                });
            }
        }
    } else {
        document.body.classList.add('_pc');
    }

    // * STICKY HEADER & TOP UP BUTTON

    const header = document.querySelector('.header');
    const topUp = document.querySelector('.top-up');

    window.addEventListener('scroll', function () {

        if (this.scrollY > 1200) {
            header.style.visibility = 'visible';
            header.style.opacity = '1';
        } else {
            header.style.visibility = 'hidden';
            header.style.opacity = '0';
        }

        if (this.scrollY > 3280) {
            topUp.style.visibility = 'visible';
            topUp.style.opacity = '1';
        } else {
            topUp.style.visibility = 'hidden';
            topUp.style.opacity = '0';
        }
    });

    // * BURGER MENU

    const iconMenu = document.querySelector('.header__menu-icon');
    const menuBody = document.querySelector('.header__menu-body');

    window.addEventListener('scroll', function () {
        if (iconMenu) {
            iconMenu.addEventListener("click", function (e) {
                document.body.classList.toggle('_lock');
                iconMenu.classList.toggle('_active');
                menuBody.classList.toggle('_active');
            });
        }
    })

    // * SMOOTH SCROOLL ONCLICK

    const menuLinks = document.querySelectorAll('.header__menu-link[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

                if (iconMenu.classList.contains('_active')) {
                    document.body.classList.remove('_lock')
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }

    // * TABS

    let skillsNavItems = document.querySelectorAll(".skills__nav-item");
    let skillsTabs = document.querySelectorAll(".skills__tab");

    for (let i = 0; i < skillsNavItems.length; i++) {

        skillsNavItems[i].addEventListener("click", function (e) {
            e.preventDefault();
            let activeItem = e.target.getAttribute("data-nav");

            for (let j = 0; j < skillsNavItems.length; j++) {
                let activeTab = skillsTabs[j].getAttribute("data-tab");

                if (activeItem === activeTab) {
                    skillsNavItems[j].classList.add("_active");
                    skillsTabs[j].classList.add("_active");
                } else {
                    skillsNavItems[j].classList.remove("_active");
                    skillsTabs[j].classList.remove("_active");
                }
            }
        });
    }

    // * FORM VALIDATION

    const contactForm = document.querySelector('#contact-form')
    const fullName = document.querySelector('#fullname');
    const email = document.querySelector('#email');
    const subject = document.querySelector('#subject');
    const message = document.querySelector('#message');
    const contactInputs = document.querySelectorAll('.contact__form-inp');

    function checkFullname(fullname) {
        const fullnameValue = fullname.value.trim();

        if (fullnameValue === "") {
            setErrorFor(fullname, "Fullname cannot be blank");
        } else if (!isFullname(fullnameValue)) {
            setErrorFor(fullname, "Incorrect fullname");
        } else {
            setSuccessFor(fullname);
        }
    }

    function checkEmail(email) {
        const emailValue = email.value.trim();

        if (emailValue === "") {
            setErrorFor(email, "Email cannot be blank");
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, "Not a valid email");
        } else {
            setSuccessFor(email);
        }
    }

    function checkSubject() {
        const subjectValue = subject.value.trim();

        if (subjectValue === "") {
            setErrorFor(subject, "Subject cannot be blank");
        } else {
            setSuccessFor(subject);
        }
    }

    function checkMessage() {
        const messageValue = message.value.trim();

        if (messageValue === "") {
            setErrorFor(message, "Subject cannot be blank");
        } else if (messageValue.length <= 20) {
            setErrorFor(message, 'Message cannot be less than 20 characters');
        } else {
            setSuccessFor(message);
        }
    }

    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");
      
        formControl.classList.add("_error");
        formControl.classList.remove("_success");
        small.textContent = message;
      }
      
      function setSuccessFor(input) {
        const formControl = input.parentElement;
      
        formControl.classList.remove("_error");
        formControl.classList.add("_success");
      }

    // * RegEx

    function isFullname(fullname) {
        return /\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}[a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/.test(fullname);
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    // * Call functions

    contactInputs.forEach((currentInputs) => {
        currentInputs.addEventListener("input", function (e) {
            e.preventDefault();
            e = event.currentTarget;

            if (fullName && e == fullName) {
                setTimeout(function() {checkFullname(fullName);}, 3000);
            }
            if (email && e == email) {
                setTimeout(function() {checkEmail(email);}, 3000);
            }
            if (subject && e == subject) {
                setTimeout(function() {checkSubject(subject);}, 3000);
            }
            if (message && e == message) {
                setTimeout(function() {checkMessage(message)}, 3000);
            }
        });
    });

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        checkFullname(fullName);
        checkEmail(email);
        checkSubject(subject);
        checkMessage(message);
    });
})