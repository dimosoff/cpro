(() => {
  // src/scripts/functions.js
  var myPopupOverlay = new popupOverlay();
  var myGallery = new gallery();
  var mySetAnchorsEvents = new setAnchorsEvents();
  function addClassOnClick(itemClick, classToItem, nameOfClass) {
    document.querySelector(itemClick).addEventListener("click", () => {
      document.querySelectorAll(classToItem).forEach((item) => {
        item.classList.toggle(nameOfClass);
      });
    });
  }
  function addClassOnScroll(item, topOffset, nameOfClass) {
    window.addEventListener("scroll", function() {
      if (scrollY > topOffset) {
        document.querySelector(item).classList.add(nameOfClass);
      } else {
        document.querySelector(item).classList.remove(nameOfClass);
      }
    });
    if (scrollY > topOffset) {
      document.querySelector(item).classList.add(nameOfClass);
    }
  }
  function setAnchorsEvents() {
    let scrollElements = document.querySelectorAll("a[href^='#']");
    scrollElements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        const link = event.target.getAttribute("href") || event.target.parentElement.getAttribute("href") || event.target.firstElementChild.getAttribute("href");
        if (link === "#")
          return;
        const linkTarget = document.getElementById(link.substring(1));
        if (!linkTarget)
          return;
        const currentScrollTop = window.scrollY, targetScrollTop = linkTarget.offsetTop - 50;
        const burgerElem = document.querySelector("._menu-opened");
        if (burgerElem)
          burgerElem.classList.remove("_menu-opened");
        animate({
          duration: 600,
          timing: easeOut,
          draw: function(progress) {
            window.scrollTo(
              0,
              currentScrollTop - (currentScrollTop - targetScrollTop) * progress
            );
          }
        });
      });
    });
  }
  function animate({ timing, draw, duration }) {
    let start = performance.now();
    requestAnimationFrame(function animate2(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction < 0)
        timeFraction = 0;
      if (timeFraction > 1)
        timeFraction = 1;
      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate2);
      }
    });
  }
  function easeOut(timeFraction) {
    return Math.sqrt(timeFraction);
  }
  function myLazyLoad() {
    const lazyObjects = document.querySelectorAll("[data-lazyload]");
    if (!lazyObjects.length)
      return;
    if ("IntersectionObserver" in window) {
      const options = {
        rootMargin: "50px",
        threshold: [0, 0.5]
      };
      lazyObjects.forEach((item) => {
        const observer = new IntersectionObserver(manageIntersection, options);
        observer.observe(item);
        function manageIntersection(entries, observer2) {
          entries.forEach((item2) => {
            if (item2.isIntersecting) {
              replaceAttributes(item2.target);
              observer2.disconnect();
            }
            return;
          });
        }
      });
      return true;
    } else {
      lazyObjects.forEach((item) => replaceAttributes(item));
      return true;
    }
    function replaceAttributes(item) {
      if (item.hasAttribute("data-src")) {
        item.setAttribute("src", item.getAttribute("data-src"));
        item.removeAttribute("data-src");
      }
    }
  }
  function gallery() {
    const galleryObjects = document.querySelectorAll("[data-gallery]");
    if (!galleryObjects.length)
      return;
    const galleryWrapper = document.createElement("div");
    const closeButton = document.createElement("button");
    const galleryClassActive = "my-gallery_active";
    galleryWrapper.className = "my-gallery";
    closeButton.type = "button";
    closeButton.className = "my-gallery__close";
    closeButton.innerHTML = "<span class='sr-only'>\u0417\u0430\u043A\u0440\u044B\u0442\u044C</span>";
    document.body.appendChild(galleryWrapper);
    galleryWrapper.appendChild(closeButton);
    const galleryImage = new Image();
    this.show = () => galleryWrapper.classList.add(galleryClassActive);
    this.hide = () => galleryWrapper.classList.remove(galleryClassActive);
    closeButton.addEventListener("click", () => {
      myPopupOverlay.hide();
      this.hide();
    });
    galleryWrapper.addEventListener("click", () => {
      myPopupOverlay.hide();
      this.hide();
    });
    galleryObjects.forEach((elem) => {
      const imageLink = elem.firstElementChild.getAttribute("data-src") || elem.firstElementChild.getAttribute("src") || "images/placeholder.svg";
      const imageSource = imageLink.replace("/thumbnails", "");
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        myPopupOverlay.show();
        galleryImage.onload = () => galleryWrapper.appendChild(galleryImage);
        galleryImage.src = imageSource;
        galleryImage.alt = event.target.alt;
        this.show();
      });
    });
  }
  function popupOverlay() {
    const name = "popup-overlay";
    this.element = document.querySelector(`.${name}`);
    const elementClassActive = `${name}_active`;
    this.show = () => {
      this.element.classList.add(elementClassActive);
      document.body.style = `overflow: hidden; margin-right: ${window.innerWidth - document.body.clientWidth}px`;
    };
    this.hide = () => {
      this.element.classList.remove(elementClassActive);
      document.body.style = "";
    };
  }

  // src/scripts/main.js
  document.addEventListener("DOMContentLoaded", function() {
    addClassOnScroll(".header", 35, "_scrolled");
    addClassOnClick(".burger", ".header", "_menu-opened");
    myLazyLoad();
    myGallery;
    mySetAnchorsEvents;
    const myPopupOverlay2 = myPopupOverlay;
    const thankYouPopopup = document.querySelector(".thank-you-popup");
    const popupCloseButton = document.querySelector(
      "button[name='thank-you-close']"
    );
    const form = document.querySelector("form[name='evaluation']");
    const formElements = document.querySelectorAll(".f-item__input");
    const formRequiredElements = document.querySelectorAll("[data-required]");
    const thankYouPopopupClassActive = `${thankYouPopopup.className}_active`;
    const inputMessageClass = "f-item__error-message";
    const inputMessageClassActive = `${inputMessageClass}_active`;
    const inputClass = "f-item__input";
    const inputClassError = `${inputClass}_error`;
    const inputClassValid = `${inputClass}_valid`;
    const errorMessages = {
      emptyName: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F",
      emptyEmail: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email",
      emptyDescription: "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0438/\u0437\u0430\u0434\u0430\u0447\u0443",
      wrongEmail: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 email"
    };
    const allFaqItems = document.querySelectorAll(".faq-item");
    allFaqItems.forEach((item) => {
      const answerButton = item.querySelector(".faq-item__button");
      const answerWrapper = item.querySelector(".faq-item__answer-wrapper");
      answerButton.addEventListener("click", () => {
        faqCollapseAnimation(answerButton, answerWrapper);
      });
    });
    function faqCollapseAnimation(currentAnswerButton, currentAnswerWrapper) {
      if (currentAnswerButton.length && currentAnswerWrapper.length)
        return;
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
    popupCloseButton.addEventListener("click", () => {
      myPopupOverlay2.hide();
      thankYouPopopup.classList.remove(thankYouPopopupClassActive);
    });
    myPopupOverlay2.element.addEventListener("click", () => {
      myPopupOverlay2.hide();
      thankYouPopopup.classList.remove(thankYouPopopupClassActive);
    });
    if (formElements.length) {
      formElements.forEach((elem) => {
        const elemLabel = elem.previousElementSibling || elem.nextElementSibling;
        changePlaceholderState(elem.value, elemLabel);
        elem.addEventListener(
          "focusin",
          (e) => changePlaceholderState(elem.value, elemLabel, e.type)
        );
        elem.addEventListener(
          "focusout",
          (e) => changePlaceholderState(elem.value, elemLabel, e.type)
        );
      });
    }
    function changePlaceholderState(elemValue, label, event = "init") {
      if (!elemValue && event == "init" || !!elemValue && event == "focusout") {
        return;
      }
      const placeholderClassActive = "f-item__placeholder_active";
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
            currentElement.nextElementSibling
          ];
          const emptyParams = [
            currentElement,
            currentElementSiblings,
            inputClassValid,
            inputClassError
          ];
          const errorParams = [
            currentElement,
            currentElementSiblings,
            inputClassError,
            inputClassValid
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
            default:
              setValidationClasses(errorParams);
              break;
          }
        });
        const elemsWithErrors = document.querySelectorAll(
          "[data-required].f-item__input_error"
        ).length;
        if (elemsWithErrors)
          return;
        myPopupOverlay2.show();
        thankYouPopopup.classList.add(thankYouPopopupClassActive);
        const data = new FormData(form);
        let dataArray = [];
        console.info("%c\u0414\u0430\u043D\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u044B", "color: chartreuse; font-size: 160%");
        for (const [name, value] of data) {
          dataArray.push([name, value]);
          console.log(
            `\u042D\u043B\u0435\u043C\u0435\u043D\u0442: "${name}"; \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: %c"${value}"%c.`,
            "color: burlywood; font-style: italic; font-size: 120%"
          );
        }
        console.info("\u041C\u0430\u0441\u0441\u0438\u0432: ", dataArray);
      });
    }
    function setValidationClasses(elemParams, errorType = "") {
      const curEl = elemParams[0];
      const curElSibl = elemParams[1];
      const msgRemove = elemParams[2];
      const msgAdd = elemParams[3];
      if (curEl.classList.contains(msgRemove))
        curEl.classList.remove(msgRemove);
      if (!curEl.classList.contains(msgAdd))
        curEl.classList.add(msgAdd);
      curElSibl.forEach((e) => {
        setErrorMessage(e, curEl, errorType);
      });
    }
    function setErrorMessage(curElLabel, curEl, errorType) {
      if (curElLabel.classList.contains(inputMessageClassActive) && curEl.classList.contains(inputClassValid) && !errorType) {
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
})();
//# sourceMappingURL=main.js.map
