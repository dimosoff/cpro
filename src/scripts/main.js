document.addEventListener("DOMContentLoaded", function () {
  const menuOpenedClass = "_menu-opened";
  myFunctions.addClassOnScroll(".header", 35, "_scrolled");
  myFunctions.addClassOnClick(".burger", ".header", menuOpenedClass);
  myFunctions.myLazyLoad();
  myFunctions.scrollToTop();
  myFunctions.setAnchorsEvents(menuOpenedClass);
  myFunctions.myGallery;
  const myPopupOverlay = myFunctions.myPopupOverlay;

  const thankYouPopopup = document.querySelector(".thank-you-popup");
  const topUpPopopup = document.querySelector(".top-up-popup");
  const popupCloseButtons = document.querySelectorAll(".popup__close");

  const popupClassActive = "popup_active";

  const forms = document.querySelectorAll("form.form");
  const formElements = document.querySelectorAll(".form__input");

  // const inputMessageClass = "form__error-message";
  // const inputMessageClassActive = `${inputMessageClass}_active`;

  // const inputClassError = "error";
  // const inputClassValid = "valid";

  // const errorMessages = {
  //   emptyName: "Введите имя",
  //   emptyPhone: "Введите телефон",
  //   emptyWebsite: "Введите телефон",
  //   emptyEmail: "Введите email",
  //   wrongPhone: "Неверный телефон",
  //   wrongWebsite: "Неверный телефон",
  //   wrongEmail: "Неверный email",
  // };

  const topUpAccountButton = document.querySelector(
    "button[name=top-up-account]"
  );

  //faq list collapse
  const allFaqItems = document.querySelectorAll(".faq-item");

  if (allFaqItems.length) {
    allFaqItems.forEach((item) => {
      const answerButton = item.querySelector(".faq-item__button");
      const answerWrapper = item.querySelector(".faq-item__answer-wrapper");

      answerButton.addEventListener("click", () => {
        faqCollapseAnimation(answerButton, answerWrapper);
      });
      answerButton.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
          e.preventDefault();
          faqCollapseAnimation(answerButton, answerWrapper);
        }
      });
    });
  }

  //popup click events

  popupCloseButtons.forEach((elem) => {
    elem.addEventListener("click", () => {
      myPopupOverlay.hide();
      thankYouPopopup.classList.remove(popupClassActive);
      topUpPopopup.classList.remove(popupClassActive);
    });
  });

  myPopupOverlay.element.addEventListener("click", () => {
    myPopupOverlay.hide();
    thankYouPopopup.classList.remove(popupClassActive);
    topUpPopopup.classList.remove(popupClassActive);
  });

  // "contacts" form placeholder state movement //

  if (formElements) {
    formElements.forEach((elem) => {
      const elemLabel = elem.previousElementSibling || elem.nextElementSibling;
      if (!elemLabel.classList.contains("form__label_placeholder")) return;

      changePlaceholderState(elem.value, elemLabel);

      elem.addEventListener("focusin", (e) =>
        changePlaceholderState(elem.value, elemLabel, e.type)
      );
      elem.addEventListener("focusout", (e) =>
        changePlaceholderState(elem.value, elemLabel, e.type)
      );
    });
  }

  // form validation //

  // const validateEmail = (email) => {
  //   return email.match(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // };
  // const validateWebsite = (website) => {
  //   return website.match(
  //     /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/
  //   );
  // };

  if (forms) {
    // forms.forEach((form) => {
    //   submitForm(form);
    // });

    forms.forEach((form) => {
      const phoneElement = form.querySelector("[name=phone]");
      const fileElement = form.querySelector("[name=file]");

      if (phoneElement) {
        validatePhoneNumber(phoneElement);
      }
      if (fileElement) {
        fileElement.addEventListener("change", (elem) =>
          validateFile(elem.target)
        );
      }
    });
  }

  if (topUpAccountButton) {
    topUpAccountButton.addEventListener("click", () => {
      myPopupOverlay.show();
      topUpPopopup.classList.add(popupClassActive);
    });
  }

  // function submitForm(form) {
  //   const formRequiredElements = form.querySelectorAll("[data-required]"),
  //     formName = form.name;

  //   const phoneElement = form.querySelector(`#${formName}-phone`);

  //   if (phoneElement) {
  //     validatePhoneNumber(phoneElement);
  //   }

  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     let elemsWithErrors = 0;

  //     formRequiredElements.forEach((currentElement) => {
  //       const currentElementSiblings = [
  //         currentElement.previousElementSibling,
  //         currentElement.nextElementSibling,
  //       ];
  //       const emptyParams = [
  //         currentElement,
  //         currentElementSiblings,
  //         inputClassValid,
  //         inputClassError,
  //       ];
  //       const errorParams = [
  //         currentElement,
  //         currentElementSiblings,
  //         inputClassError,
  //         inputClassValid,
  //       ];

  //       if (!currentElement.value) {
  //         setValidationClasses(emptyParams, "empty");
  //         return;
  //       }

  //       switch (currentElement.id) {
  //         case `${formName}-email`:
  //           if (!validateEmail(currentElement.value)) {
  //             setValidationClasses(emptyParams, "wrong");
  //             break;
  //           }
  //         // eslint-disable-next-line no-fallthrough
  //         case `${formName}-website`:
  //           if (!validateWebsite(currentElement.value)) {
  //             setValidationClasses(emptyParams, "wrong");
  //             break;
  //           }
  //         // eslint-disable-next-line no-fallthrough
  //         default:
  //           setValidationClasses(errorParams);
  //           break;
  //       }
  //     });

  //     elemsWithErrors = document.querySelectorAll(
  //       `[data-required]${inputClassError}`
  //     ).length;

  //     if (elemsWithErrors) return;

  //     myPopupOverlay.show();
  //     thankYouPopopup.classList.add(popupClassActive);

  //     const data = new FormData(form);
  //     let dataArray = [];
  //     //console.info("%cДанные формы", "color: chartreuse; font-size: 160%");
  //     for (const [name, value] of data) {
  //       dataArray.push([name, value]);
  //       console.log(
  //         `Элемент: "${name}"; значение: %c"${value}"%c.`,
  //         "color: burlywood; font-style: italic; font-size: 120%"
  //       );
  //     }
  //     //console.info("Массив: ", dataArray);

  //     formRequiredElements.forEach((e) => {
  //       e.classList.remove(inputClassValid);
  //     });
  //     form.reset();
  //   });
  // }

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

  function faqCollapseAnimation(currentAnswerButton, currentAnswerWrapper) {
    if (!currentAnswerButton && !currentAnswerWrapper) return;
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

  // function setValidationClasses(elemParams, errorType = "") {
  //   const curEl = elemParams[0];
  //   const curElSibl = elemParams[1];
  //   const msgRemove = elemParams[2];
  //   const msgAdd = elemParams[3];

  //   if (curEl.classList.contains(msgRemove)) curEl.classList.remove(msgRemove);
  //   if (!curEl.classList.contains(msgAdd)) curEl.classList.add(msgAdd);

  //   curElSibl.forEach((e) => {
  //     setErrorMessage(e, curEl, errorType);
  //   });
  // }

  // function setErrorMessage(curElLabel, curEl, errorType) {
  //   if (
  //     curElLabel.classList.contains(inputMessageClassActive) &&
  //     curEl.classList.contains(inputClassValid) &&
  //     !errorType
  //   ) {
  //     curElLabel.classList.remove(inputMessageClassActive);
  //     curElLabel.textContent = "";
  //     return;
  //   }

  //   const isElemHasClass = curElLabel.classList.contains(inputMessageClass),
  //     elementType = curEl.name.split("-")[1];

  //   if (isElemHasClass && errorType == "empty") {
  //     curElLabel.classList.add(inputMessageClassActive);

  //     switch (elementType) {
  //       case `name`:
  //         curElLabel.textContent = errorMessages.emptyName;
  //         break;
  //       case `email`:
  //         curElLabel.textContent = errorMessages.emptyEmail;
  //         break;
  //       case `website`:
  //         curElLabel.textContent = errorMessages.emptyWebsite;
  //         break;
  //       case `phone`:
  //         curElLabel.textContent = errorMessages.emptyPhone;
  //         break;
  //     }
  //     return;
  //   }
  //   if (isElemHasClass && errorType == "wrong") {
  //     curElLabel.classList.add(inputMessageClassActive);
  //     switch (curEl.id) {
  //       case `email`:
  //         curElLabel.textContent = errorMessages.wrongEmail;
  //         break;
  //       case `website`:
  //         curElLabel.textContent = errorMessages.wrongWebsite;
  //         break;
  //       case `phone`:
  //         curElLabel.textContent = errorMessages.wrongPhone;
  //         break;
  //     }
  //     return;
  //   }
  // }

  function validatePhoneNumber(inputElement) {
    const phoneFormat = (value) =>
      value
        .replace(/((?!\+)\D+)+/g, "")
        .match(/^(\+375)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);

    inputElement.addEventListener("click", (e) => {
      if (e.target.value === "" || !phoneFormat(e.target.value))
        e.target.value = "+375";
    });
    inputElement.addEventListener("input", (e) => {
      const elem = e.target;
      let cursorPosition = elem.selectionStart;
      elem.value = elem.value.slice(0, cursorPosition) + elem.value.slice(cursorPosition + 1);
      elem.selectionEnd = cursorPosition;

      let x = phoneFormat(elem.value);
      let phoneArray = "";

      if (x === null || !x[1]) {
        phoneArray = "";
      } else if (x[1] && !x[2]) {
        phoneArray = `${x[1]}`;
      } else if (x[1] && x[2] && !x[3]) {
        phoneArray = `${x[1]} (${x[2]}`;
      } else if (x[1] && x[2] && x[3] && !x[4]) {
        phoneArray = `${x[1]} (${x[2]}) ${x[3]}`;
      } else if (x[1] && x[2] && x[3] && x[4] && !x[5]) {
        phoneArray = `${x[1]} (${x[2]}) ${x[3]}-${x[4]}`;
      } else {
        phoneArray = `${x[1]} (${x[2]}) ${x[3]}-${x[4]}-${x[5]}`;
      }
      elem.value = phoneArray;
    });
  }

  function validateFile(inputElement) {
    const fileErrorClass = "file_error";
    if (!inputElement.files.length) {
      inputElement.classList.add(fileErrorClass);
      inputMessage.textContent = "Файл не выбран.";
      return;
    }

    // init state //
    const inputHeading = inputElement.parentElement.querySelector(
        ".form__item-heading"
      ),
      inputMessage = inputElement.parentElement.querySelector(
        ".form__error-message"
      ),
      maxFileSize = inputElement.dataset?.maxSize * Math.pow(1024, 2) || 5e6,
      firstFile = inputElement.files[0],
      fileName = firstFile.name,
      fileSize = firstFile.size;

    // clear validation //
    inputElement.classList.remove(fileErrorClass);
    inputMessage.textContent = "";

    const fileNameToShow =
        fileName.length > 25
          ? `${fileName.slice(0, 10)}...${fileName.slice(-10)}`
          : fileName,
      fileSizeToShow = formatBytes(fileSize);

    inputHeading.textContent = `Файл: ${fileNameToShow} (${fileSizeToShow})`;

    if (fileSize > maxFileSize) {
      inputElement.classList.add(fileErrorClass);
      inputMessage.textContent = `Файл больше ${formatBytes(maxFileSize)}`;
      return;
    }
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Байт";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Байт", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
});

import * as myFunctions from "./functions.js";
