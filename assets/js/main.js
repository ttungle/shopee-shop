const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const modal = $(".modal");
const modalBody = $(".modal__body");
const registerModalForm = $(".auth-form.register-form");
const loginModalForm = $(".auth-form.login-form");
const closeModalFormBtn = $$(".auth-form__closeBtn");
const navBarRegister = $(".header__navbar-register");
const navBarLogin = $(".header__navbar-login");
const authForms = $$(".auth-form");
const authFormLoginLink = $(".auth-form__help-login");
const authFormRegisterLink = $(".auth-form__help-register");
const authFormRegisterInput = $(".auth-form__input-js");
const authFormRegisterBtn = $(".register-form .auth-form__input-btn-js");
const authFormRegisterValidateMsg = $(".auth-form__inputs-msg");
const authFormLoginInputs = $$(".login-form .auth-form__input-js");
const authFormLoginBtn = $(".login-form .auth-form__input-btn-js");
const authFormPwIcon = $(".auth-form__password-icon");
const authFormLogoutBtn = $(".header__navbar-user-item-logout");
const authFormUserNavItem = $(".header__navbar-item-user-js");
const searchSelections = $$(".header-search__dropdown-item");
const searchLabel = $(".header-search__dropdown-label");
const searchHistoryContainer = $(".header-search__history");
const searchHistoryOptions = $$(".header-search__history-item");
const searchInput = $(".header-search__box-input");
const searchSuggestions = $$(".header-search__suggestions-item");
const searchCartDeletes = $$(".header-search__cart-product-delete");
const searchCartItems = $$(".header-search__cart-product-item");
const searchCartType = $(".header-search__cart-list");
const searchCartNotify = $(".header-search__cart-notify");
const categorySortItemCheckBox = $$(".category-sort-item");
const categorySortMore = $$(".category-sort__more");
const categoryMainItems = $$(".category-item");
const filterSelectInput = $$(".select-input__item");
const filterSelectLabel = $(".select-input__label");
const filterBtns = $$(".home-filter__btn");

const app = {
  handleEvents: function () {
    const _this = this;

    //validate message hide and active btn
    const activeRegisterModalBtn = function () {
      authFormRegisterBtn.classList.add("auth-form__input--active");
      authFormLoginBtn.classList.add("auth-form__input--active");
      authFormRegisterBtn.removeAttribute("disabled");
      authFormLoginBtn.removeAttribute("disabled");
      authFormRegisterInput.classList.remove("auth-form__input--validate");
      authFormRegisterValidateMsg.style.visibility = "";
    };

    //validate message show and disable btn
    const disableRegisterModalBtn = function () {
      authFormRegisterBtn.classList.remove("auth-form__input--active");
      authFormLoginBtn.classList.remove("auth-form__input--active");
      authFormRegisterInput.classList.add("auth-form__input--validate");
      authFormRegisterValidateMsg.style.visibility = "visible";
    };

    //handle when click register menu
    if (navBarRegister) {
      navBarRegister.onclick = function () {
        _this.resetAuthForm();
        modal.style.display = "flex";
        registerModalForm.classList.add("active-form");
      };
    }

    //handle when click login menu
    if (navBarLogin) {
      navBarLogin.onclick = function () {
        _this.resetAuthForm();
        modal.style.display = "flex";
        loginModalForm.classList.add("active-form");
      };
    }

    //handle when click close form btn
    Array.from(closeModalFormBtn).forEach(function (e) {
      e.onclick = function () {
        _this.resetAuthForm();
      };
    });

    //handle when click outside modal form
    modalBody.onclick = function (e) {
      e.stopPropagation();
    };
    modal.onclick = function () {
      _this.resetAuthForm();
    };

    //handle when click login link in register form
    authFormLoginLink.onclick = function () {
      registerModalForm.classList.remove("active-form");
      loginModalForm.classList.add("active-form");
    };

    //handle when click register in login form
    authFormRegisterLink.onclick = function () {
      loginModalForm.classList.remove("active-form");
      registerModalForm.classList.add("active-form");
    };

    //validate register form phone number equal 10 number & first number is 0
    authFormRegisterInput.oninput = function (e) {
      if (e.target.value.length == 10 && e.target.value[0] == 0) {
        activeRegisterModalBtn();
      } else {
        disableRegisterModalBtn();
      }
    };

    //handle limit 16 character of password in Modal Login form
    Array.from(authFormLoginInputs).forEach(function (element) {
      element.oninput = function () {
        const hasFullLoginValue = Array.from(authFormLoginInputs).every(
          function (element) {
            return element.value;
          }
        );

        if (hasFullLoginValue) {
          activeRegisterModalBtn();
        } else {
          disableRegisterModalBtn();
        }
      };
    });

    //handle when clicking show/hide authForm password login
    authFormPwIcon.onclick = function (e) {
      if (e.target.classList.contains("fa-eye-slash")) {
        e.target.classList.remove("fa-eye-slash");
        e.target.classList.add("fa-eye");
        e.target.previousElementSibling.type = "text";
      } else {
        e.target.classList.remove("fa-eye");
        e.target.classList.add("fa-eye-slash");
        e.target.previousElementSibling.type = "password";
      }
    };

    //handle when clicking search selections
    Array.from(searchSelections).forEach((e) => {
      e.onclick = function () {
        //reset active selection
        Array.from(searchSelections).forEach((element) => {
          element.classList.remove("header-search__dropdown-item--active");
        });

        if (!e.classList.contains("header-search__dropdown-item--active")) {
          e.classList.add("header-search__dropdown-item--active");
          searchLabel.innerText = e.innerText;
          searchInput.placeholder = "Tìm " + e.innerText;
        }
      };
    });

    //handle when click search input & history list, close when click outside
    document.onclick = function (e) {
      if (
        e.target.matches(".header-search__box-input") ||
        e.target.closest(".header-search__history")
      ) {
        searchHistoryContainer.style.display = "block";
      } else {
        searchHistoryContainer.style.display = "none";
      }
    };

    //handle when clicking history options
    Array.from(searchHistoryOptions).forEach((e) => {
      e.onclick = function () {
        searchInput.value = e.innerText;
      };
    });

    //handle when clicking suggestion
    Array.from(searchSuggestions).forEach((e) => {
      e.onclick = function () {
        searchInput.value = e.innerText;
      };
    });

    //handle when clicking delete cart item
    Array.from(searchCartDeletes).forEach((e, index) => {
      e.onclick = function () {
        searchCartItems[index].remove();
        const currentCart = $$(".header-search__cart-product-item");
        searchCartNotify.innerText = currentCart.length;
        if (currentCart.length <= 0) {
          searchCartType.classList.remove("header-search__cart--has-cart");
          searchCartType.classList.remove("header-search__cart--no-cart");
          searchCartType.classList.add("header-search__cart--no-cart");
        }
      };
    });

    //handle when clicking category sort checkbox
    Array.from(categorySortItemCheckBox).forEach((e) => {
      e.onclick = function () {
        e.classList.toggle("category-sort-item__checked");
      };
    });

    //handle when clicking category more btn
    Array.from(categorySortMore).forEach((e) => {
      e.onclick = function () {
        if (e.classList.contains("category-sort__category")) {
          e.previousElementSibling.style.display = "block";
          e.style.display = "none";
        } else {
          e.previousElementSibling.style.display = "block";
          e.style.display = "none";
        }
      };
    });

    //handle when select category main items
    Array.from(categoryMainItems).forEach((e) => {
      e.onclick = function () {
        Array.from(categoryMainItems).forEach((elementRS) => {
          elementRS.classList.remove("category-item--active");
        });
        e.classList.add("category-item--active");
      };
    });

    //handle when clicking home filter selections
    Array.from(filterSelectInput).forEach((e) => {
      e.onclick = function () {
        Array.from(filterSelectInput).forEach((eReset) => {
          eReset.classList.remove("select-input__item--active");
        });

        e.classList.add("select-input__item--active");
        filterSelectLabel.classList.add("select-input__label--active");
        filterSelectLabel.innerText = e.innerText;
      };
    });

    //handle when clicking home filter btn
    Array.from(filterBtns).forEach((e) => {
      e.onclick = function () {
        Array.from(filterBtns).forEach((eReset) => {
          eReset.classList.remove("btn--primary");
        });
        e.classList.add("btn--primary");
      };
    });

    //handle when clicking logout button
    if (navBarLogin && navBarRegister) {
      authFormLogoutBtn.onclick = function () {
        authFormUserNavItem.style.display = "none";
        navBarLogin.style.display = "inline-flex";
        navBarRegister.style.display = "inline-flex";
      };
    };

    //handle when clicking login btn 
    authFormLoginBtn.onclick = function () {
      if (authFormUserNavItem.offsetParent == null) {
        navBarRegister.style.display = "none";
        navBarLogin.style.display = "none";
        _this.resetAuthForm();
        authFormUserNavItem.style.display = "inline-flex";
      }
    };
  },

  resetAuthForm: function () {
    modal.style.display = "none";
    registerModalForm.classList.remove("active-form");
    loginModalForm.classList.remove("active-form");

    authFormRegisterInput.value = null;
    Array.from(authFormLoginInputs).forEach(function (element) {
      element.value = null;
    });

    authFormRegisterBtn.classList.remove("auth-form__input--active");
    authFormLoginBtn.classList.remove("auth-form__input--active");
    authFormRegisterValidateMsg.style.visibility = "";
    authFormRegisterInput.classList.remove("auth-form__input--validate");
  },

  start: function () {
    this.handleEvents();
  },
};

app.start();
