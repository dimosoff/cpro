(() => {
  // src/scripts/functions.js
  var myPopupOverlay = new popupOverlay();
  var myGallery = new gallery();
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
  function setAnchorsEvents(menuOpenedClass = "_menu-opened") {
    const scrollElements = document.querySelectorAll("a[href^='#']");
    scrollElements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        var _a;
        event.preventDefault();
        const link = event.target.getAttribute("href") || event.target.parentElement.getAttribute("href") || event.target.firstElementChild.getAttribute("href");
        if (link === "#")
          return;
        const linkTarget = document.getElementById(link.substring(1));
        if (!linkTarget)
          return;
        const currentScrollTop = window.scrollY, headerHeight = ((_a = document.querySelector("header")) == null ? void 0 : _a.clientHeight) || 50, targetScrollTop = linkTarget.offsetTop - +headerHeight;
        const burgerElem = document.querySelector(menuOpenedClass);
        if (burgerElem)
          burgerElem.classList.remove(menuOpenedClass);
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
  function scrollToTop() {
    let $scrollTopElement = document.querySelector(".scroll-top");
    window.addEventListener("scroll", function() {
      let hasClass = $scrollTopElement.classList.contains("_active"), isScrolled = scrollY > 35;
      if (isScrolled && !hasClass) {
        $scrollTopElement.classList.add("_active");
      } else if (!isScrolled && hasClass) {
        $scrollTopElement.classList.remove("_active");
      }
    });
    $scrollTopElement.addEventListener("click", () => {
      let currentScrollTop = window.scrollY;
      animate({
        duration: 600,
        timing: easeOut,
        draw: function(progress) {
          window.scrollTo(0, currentScrollTop - currentScrollTop * progress);
        }
      });
    });
    if (scrollY > 35 && !$scrollTopElement.classList.contains("_active")) {
      $scrollTopElement.classList.add("_active");
    }
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
    return Math.pow(timeFraction, 1 / 5);
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
      const imageElement = elem.querySelector("img");
      if (!imageElement)
        return;
      const imageLink = imageElement.getAttribute("data-src") || imageElement.getAttribute("src") || "images/placeholder.svg";
      const imageSource = imageLink.replace("/thumbnails", "");
      elem.addEventListener("click", (event) => {
        this.showGalleryElement(event, imageSource);
      });
      elem.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
          this.showGalleryElement(e, imageSource);
        }
      });
    });
    this.showGalleryElement = (event, imageSource) => {
      event.preventDefault();
      myPopupOverlay.show();
      galleryImage.onload = () => galleryWrapper.appendChild(galleryImage);
      galleryImage.src = imageSource;
      galleryImage.alt = event.target.alt;
      this.show();
    };
  }
  function popupOverlay() {
    const name = "popup-overlay";
    this.element = document.querySelector(`.${name}`);
    const elementClassActive = `${name}_active`;
    const bodyElement = document.body, headerElement = document.querySelector("header");
    this.show = () => {
      let scrollWidth = window.innerWidth - document.body.clientWidth;
      this.element.classList.add(elementClassActive);
      bodyElement.style = `overflow: hidden; margin-right: ${scrollWidth}px`;
      headerElement.style = `padding-right: ${scrollWidth}px`;
    };
    this.hide = () => {
      this.element.classList.remove(elementClassActive);
      setTimeout(() => {
        bodyElement.style = "";
        headerElement.style = "";
      }, 300);
    };
  }

  // src/scripts/main.js
  document.addEventListener("DOMContentLoaded", function() {
    const menuOpenedClass = "_menu-opened";
    addClassOnScroll(".header", 35, "_scrolled");
    addClassOnClick(".burger", ".header", menuOpenedClass);
    myLazyLoad();
    scrollToTop();
    setAnchorsEvents(menuOpenedClass);
    myGallery;
    const myPopupOverlay2 = myPopupOverlay;
    const thankYouPopopup = document.querySelector(".thank-you-popup");
    const topUpPopopup = document.querySelector(".top-up-popup");
    const popupCloseButtons = document.querySelectorAll(".popup__close");
    const popupClassActive = "popup_active";
    const forms = document.querySelectorAll("form.form");
    const formElements = document.querySelectorAll(".form__input");
    const topUpAccountButton = document.querySelector(
      "button[name=top-up-account]"
    );
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
    popupCloseButtons.forEach((elem) => {
      elem.addEventListener("click", () => {
        myPopupOverlay2.hide();
        thankYouPopopup.classList.remove(popupClassActive);
        topUpPopopup.classList.remove(popupClassActive);
      });
    });
    myPopupOverlay2.element.addEventListener("click", () => {
      myPopupOverlay2.hide();
      thankYouPopopup.classList.remove(popupClassActive);
      topUpPopopup.classList.remove(popupClassActive);
    });
    if (formElements) {
      formElements.forEach((elem) => {
        const elemLabel = elem.previousElementSibling || elem.nextElementSibling;
        if (!elemLabel.classList.contains("form__label_placeholder"))
          return;
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
    if (forms) {
      forms.forEach((form) => {
        const phoneElement = form.querySelector("[name=phone]");
        const fileElement = form.querySelector("[name=file]");
        if (phoneElement) {
          validatePhoneNumber(phoneElement);
        }
        if (fileElement) {
          fileElement.addEventListener(
            "change",
            (elem) => validateFile(elem.target)
          );
        }
      });
    }
    if (topUpAccountButton) {
      topUpAccountButton.addEventListener("click", () => {
        myPopupOverlay2.show();
        topUpPopopup.classList.add(popupClassActive);
      });
    }
    function changePlaceholderState(elemValue, label, event = "init") {
      if (!elemValue && event == "init" || !!elemValue && event == "focusout") {
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
      if (!currentAnswerButton && !currentAnswerWrapper)
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
    function validatePhoneNumber(inputElement) {
      const phoneFormat = (value) => value.replace(/((?!\+)\D+)+/g, "").match(/^(\+375)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
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
      var _a;
      const fileErrorClass = "file_error";
      if (!inputElement.files.length) {
        inputElement.classList.add(fileErrorClass);
        inputMessage.textContent = "\u0424\u0430\u0439\u043B \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D.";
        return;
      }
      const inputHeading = inputElement.parentElement.querySelector(
        ".form__item-heading"
      ), inputMessage = inputElement.parentElement.querySelector(
        ".form__error-message"
      ), maxFileSize = ((_a = inputElement.dataset) == null ? void 0 : _a.maxSize) * Math.pow(1024, 2) || 5e6, firstFile = inputElement.files[0], fileName = firstFile.name, fileSize = firstFile.size;
      inputElement.classList.remove(fileErrorClass);
      inputMessage.textContent = "";
      const fileNameToShow = fileName.length > 25 ? `${fileName.slice(0, 10)}...${fileName.slice(-10)}` : fileName, fileSizeToShow = formatBytes(fileSize);
      inputHeading.textContent = `\u0424\u0430\u0439\u043B: ${fileNameToShow} (${fileSizeToShow})`;
      if (fileSize > maxFileSize) {
        inputElement.classList.add(fileErrorClass);
        inputMessage.textContent = `\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 ${formatBytes(maxFileSize)}`;
        return;
      }
    }
    function formatBytes(bytes, decimals = 2) {
      if (!+bytes)
        return "0 \u0411\u0430\u0439\u0442";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["\u0411\u0430\u0439\u0442", "\u041A\u0411", "\u041C\u0411", "\u0413\u0411", "\u0422\u0411", "\u041F\u0411", "\u042D\u0411", "\u0417\u0411", "\u0419\u0411"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
  });
})();
//# sourceMappingURL=main.js.map
