document.addEventListener("DOMContentLoaded", function () {
  myFunctions.addClassOnScroll(".header", 35, "_scrolled");
  myFunctions.addClassOnClick(".burger", ".header", "_menu-opened");
  myFunctions.myLazyLoad();
  myFunctions.scrollToTop();
  myFunctions.myGallery;
  myFunctions.mySetAnchorsEvents;
  const myPopupOverlay = myFunctions.myPopupOverlay;

  const thankYouPopopup = document.querySelector(".thank-you-popup");
  const popupCloseButton = document.querySelector(
    "button[name='thank-you-close']"
  );

  const form = document.querySelector("form[name='conatcts-form']");
  const formElements = document.querySelectorAll(".form__input");
  const formRequiredElements = document.querySelectorAll("[data-required]");

  const thankYouPopopupClassActive = `${thankYouPopopup.className}_active`;

  const inputMessageClass = "form__error-message";
  const inputMessageClassActive = `${inputMessageClass}_active`;

  const inputClass = "form__input";
  const inputClassError = `${inputClass}_error`;
  const inputClassValid = `${inputClass}_valid`;

  const errorMessages = {
    emptyName: "Введите имя",
    emptyPhone: "Введите телефон",
    emptyEmail: "Введите email",
    wrongPhone: "Неверный телефон",
    wrongEmail: "Неверный email",
  };

  //faq list collapse
  const allFaqItems = document.querySelectorAll(".faq-item");
  allFaqItems.forEach((item) => {
    const answerButton = item.querySelector(".faq-item__button");
    const answerWrapper = item.querySelector(".faq-item__answer-wrapper");

    answerButton.addEventListener("click", () => {
      faqCollapseAnimation(answerButton, answerWrapper);
    });
  });

  function faqCollapseAnimation(currentAnswerButton, currentAnswerWrapper) {
    if (currentAnswerButton.length && currentAnswerWrapper.length) return;
    const currentAnswerItem = currentAnswerButton.parentElement;

    if (!currentAnswerItem.classList.contains("_active")) {
      allFaqItems.forEach((e) => {
        e.classList.add("_not-active");
        e.classList.remove("_active");
        e.querySelector(".faq-item__answer-wrapper").removeAttribute("style");
      });

      currentAnswerItem.classList.add("_active");
      currentAnswerItem.classList.remove("_not-active");
      currentAnswerWrapper.style.height = `${currentAnswerWrapper.firstElementChild.offsetHeight}px`;
    } else {
      allFaqItems.forEach((e) => {
        e.classList.remove("_active", "_not-active");
        e.querySelector(".faq-item__answer-wrapper").removeAttribute("style");
      });
    }
  }

  //popup click events

  popupCloseButton.addEventListener("click", () => {
    myPopupOverlay.hide();
    thankYouPopopup.classList.remove(thankYouPopopupClassActive);
  });

  myPopupOverlay.element.addEventListener("click", () => {
    myPopupOverlay.hide();
    thankYouPopopup.classList.remove(thankYouPopopupClassActive);
  });

  // form placeholder state movement //

  if (formElements.length) {
    formElements.forEach((elem) => {
      const elemLabel = elem.previousElementSibling || elem.nextElementSibling;
      changePlaceholderState(elem.value, elemLabel);

      elem.addEventListener("focusin", (e) =>
        changePlaceholderState(elem.value, elemLabel, e.type)
      );
      elem.addEventListener("focusout", (e) =>
        changePlaceholderState(elem.value, elemLabel, e.type)
      );
    });
  }

  function changePlaceholderState(elemValue, label, event = "init") {
    if (
      (!elemValue && event == "init") ||
      (!!elemValue && event == "focusout")
    ) {
      return;
    }

    const placeholderClassActive = "form__label_placeholder_active";

    switch (event) {
      case "init":
      case "focusin":
        label.classList.add(placeholderClassActive);
        break;
      case "focusout":
        label.classList.remove(placeholderClassActive);
        break;
    }
  }

  // swiper //

  // eslint-disable-next-line no-unused-vars, no-undef
  /*const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,
    rewind: false,
    grabCursor: true,
    slidesPerView: 3,
    //autoHeight: true,
    //setWrapperSize: true,

    // If we need pagination
    //pagination: {
    //  el: '.swiper-pagination',
    //},

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
    },
    on: {
      update: function () {
        myFunctions.myLazyLoad();
      },
    },
  });*/

  // form validation //

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  if (form.length) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      formRequiredElements.forEach((currentElement) => {
        const currentElementSiblings = [
          currentElement.previousElementSibling,
          currentElement.nextElementSibling,
        ];
        const emptyParams = [
          currentElement,
          currentElementSiblings,
          inputClassValid,
          inputClassError,
        ];
        const errorParams = [
          currentElement,
          currentElementSiblings,
          inputClassError,
          inputClassValid,
        ];

        if (!currentElement.value) {
          setValidationClasses(emptyParams, "empty");
          return;
        }

        switch (currentElement.id) {
          case "email":
            if (!validateEmail(currentElement.value)) {
              setValidationClasses(emptyParams, "wrong");
              break;
            }
          // eslint-disable-next-line no-fallthrough
          default:
            setValidationClasses(errorParams);
            break;
        }
      });

      const elemsWithErrors = document.querySelectorAll(
        "[data-required].form__input_error"
      ).length;

      if (elemsWithErrors) return;

      myPopupOverlay.show();
      thankYouPopopup.classList.add(thankYouPopopupClassActive);

      const data = new FormData(form);
      let dataArray = [];
      console.info("%cДанные формы", "color: chartreuse; font-size: 160%");
      for (const [name, value] of data) {
        dataArray.push([name, value]);
        console.log(
          `Элемент: "${name}"; значение: %c"${value}"%c.`,
          "color: burlywood; font-style: italic; font-size: 120%"
        );
      }
      console.info("Массив: ", dataArray);
    });
  }

  function setValidationClasses(elemParams, errorType = "") {
    const curEl = elemParams[0];
    const curElSibl = elemParams[1];
    const msgRemove = elemParams[2];
    const msgAdd = elemParams[3];

    if (curEl.classList.contains(msgRemove)) curEl.classList.remove(msgRemove);
    if (!curEl.classList.contains(msgAdd)) curEl.classList.add(msgAdd);

    curElSibl.forEach((e) => {
      setErrorMessage(e, curEl, errorType);
    });
  }

  function setErrorMessage(curElLabel, curEl, errorType) {
    if (
      curElLabel.classList.contains(inputMessageClassActive) &&
      curEl.classList.contains(inputClassValid) &&
      !errorType
    ) {
      curElLabel.classList.remove(inputMessageClassActive);
      curElLabel.textContent = "";
      return;
    }

    const isElemHasClass = curElLabel.classList.contains(inputMessageClass);

    if (isElemHasClass && errorType == "empty") {
      curElLabel.classList.add(inputMessageClassActive);
      switch (curEl.id) {
        case "name":
          curElLabel.textContent = errorMessages.emptyName;
          break;
        case "email":
          curElLabel.textContent = errorMessages.emptyEmail;
          break;
        case "description":
          curElLabel.textContent = errorMessages.emptyDescription;
          break;
      }
      return;
    }
    if (isElemHasClass && errorType == "wrong") {
      curElLabel.classList.add(inputMessageClassActive);
      switch (curEl.id) {
        case "email":
          curElLabel.textContent = errorMessages.wrongEmail;
          break;
      }
      return;
    }
  }
});

import * as myFunctions from "./functions.js";
