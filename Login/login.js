(function () {
  // DOM elements
  const loginForm = document.getElementById("loginForm");
  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const toastEl = document.getElementById("toastMessage");
  const toastTextSpan = document.getElementById("toastText");
  const rememberCheck = document.getElementById("rememberMe");

  // Helper: Show toast notification with animation
  function showToast(message, isError = false) {
    // clear any pending timeout
    if (window.toastTimeout) clearTimeout(window.toastTimeout);

    toastTextSpan.innerText = message;
    if (isError) {
      toastEl.classList.add("error");
      const icon = toastEl.querySelector("i");
      if (icon) {
        icon.className = "fas fa-circle-exclamation";
      }
    } else {
      toastEl.classList.remove("error");
      const icon = toastEl.querySelector("i");
      if (icon) {
        icon.className = "fas fa-circle-check";
      }
    }
    toastEl.classList.add("show");

    window.toastTimeout = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 3200);
  }

  // Helper: add shake animation to specific input
  function shakeInput(inputElement) {
    inputElement.classList.add("input-shake");
    inputElement.addEventListener(
      "animationend",
      () => {
        inputElement.classList.remove("input-shake");
      },
      { once: true },
    );
    // also highlight border
    inputElement.style.borderColor = "#f43f5e";
    setTimeout(() => {
      if (inputElement.style.borderColor === "#f43f5e") {
        inputElement.style.borderColor = "";
      }
    }, 500);
  }

  // simulate loading state on button (async)
  function setLoading(isLoading) {
    if (isLoading) {
      // store original button content
      if (!loginBtn.hasAttribute("data-original")) {
        loginBtn.setAttribute("data-original", loginBtn.innerHTML);
      }
      loginBtn.classList.add("loading");
      loginBtn.innerHTML = `<span class="spinner"></span><span class="btn-text" style="margin-left: 8px;">Authenticating...</span>`;
      loginBtn.disabled = true;
    } else {
      loginBtn.classList.remove("loading");
      const originalHtml = loginBtn.getAttribute("data-original");
      if (originalHtml) {
        loginBtn.innerHTML = originalHtml;
      } else {
        loginBtn.innerHTML = `<span class="btn-text"><i class="fas fa-arrow-right-to-bracket" style="margin-right: 8px;"></i> Sign In</span>`;
      }
      loginBtn.disabled = false;
    }
  }

  // demo credentials (for modern simulation)
  const DEMO_EMAIL = "demo@nova.com";
  const DEMO_PASS = "password123";

  // fake async login request (simulate network latency)
  function performLogin(email, password, remember) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // simple validation: not empty + correct demo values
        if (!email || !password) {
          reject(new Error("Email and password are required"));
          return;
        }
        // email format simple check (contains @ and .)
        if (!email.includes("@") || !email.includes(".")) {
          reject(new Error("Please enter a valid email address"));
          return;
        }
        if (password.length < 4) {
          reject(new Error("Password must be at least 4 characters"));
          return;
        }
        // actual demo credential check
        if (email === DEMO_EMAIL && password === DEMO_PASS) {
          resolve({
            success: true,
            message: "Welcome back! Login successful.",
          });
        } else {
          reject(
            new Error(
              "Invalid email or password. Try demo@nova.com / password123",
            ),
          );
        }
      }, 1400); // modern loading simulation
    });
  }

  // handle form submission
  async function onSubmit(e) {
    e.preventDefault();

    // get raw values
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    const remember = rememberCheck.checked;

    // reset temporary inline border colors
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";

    // Basic front-end validation before loading state (just to avoid empty loading)
    if (!email) {
      shakeInput(emailInput);
      showToast("Please enter your email address", true);
      emailInput.focus();
      return;
    }
    if (!password) {
      shakeInput(passwordInput);
      showToast("Please enter your password", true);
      passwordInput.focus();
      return;
    }

    // start loading animation
    setLoading(true);

    try {
      const result = await performLogin(email, password, remember);
      if (result.success) {
        showToast(result.message, false);
        // optional: reset form or redirect simulation
        // for demo: we simulate a redirect-like success message, clear fields?
        // Not clearing fields to show success, but we can add extra effect.
        // extra: add a little bounce effect on container for delight
        const container = document.querySelector(".login-container");
        container.style.transform = "scale(1.01)";
        setTimeout(() => {
          container.style.transform = "";
        }, 200);
        // we can also set a fake success marker in localStorage for remember me? not needed.
        if (remember) {
          // store demo preference (just for show, but we don't autofill due to security)
          localStorage.setItem("demo_remember_email", email);
          showToast("Session will be remembered (demo)", false);
        } else {
          localStorage.removeItem("demo_remember_email");
        }
        // reset form optional after success? maybe not to keep smoothness
        // but we can show extra glow effect
        emailInput.value = "";
        passwordInput.value = "";
        // refocus email for next demo experience? optional
        setTimeout(() => emailInput.focus(), 300);
      } else {
        // shouldn't happen with reject but safe
        throw new Error(result.message || "Login failed");
      }
    } catch (err) {
      // error handling with shake on relevant field based on error context
      const errorMsg = err.message || "Authentication error";
      if (errorMsg.toLowerCase().includes("email")) {
        shakeInput(emailInput);
        emailInput.focus();
      } else if (errorMsg.toLowerCase().includes("password")) {
        shakeInput(passwordInput);
        passwordInput.focus();
      } else {
        // generic: shake both slightly
        shakeInput(emailInput);
        shakeInput(passwordInput);
      }
      showToast(errorMsg, true);
    } finally {
      setLoading(false);
    }
  }

  // Helper to prefill from localStorage (just for demo 'remember me' show)
  function loadStoredDemo() {
    const remembered = localStorage.getItem("demo_remember_email");
    if (remembered) {
      emailInput.value = remembered;
      rememberCheck.checked = true;
      // optional: small tooltip like effect?
    }
  }

  // interactive events: hover transitions, plus forgot / signup demo
  const forgotLink = document.getElementById("forgotLink");
  const signupLink = document.getElementById("signupLink");

  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    showToast(
      "✨ Password reset link sent to your registered email (demo)",
      false,
    );
  });

  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    showToast(
      "🚀 Join the future — signup demo triggered (create account)",
      false,
    );
    // extra micro interaction: ripple effect
  });

  // Add extra live validation & modern floating label feel: focus effect glow
  const allInputs = [emailInput, passwordInput];
  allInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused");
    });
  });

  // Extra micro: if user types something nice, remove red border from previous error
  emailInput.addEventListener("input", () => {
    emailInput.style.borderColor = "";
  });
  passwordInput.addEventListener("input", () => {
    passwordInput.style.borderColor = "";
  });

  // load any demo stored email on page load
  loadStoredDemo();

  // attach form listener
  loginForm.addEventListener("submit", onSubmit);

  // optional: double-check that button loading state doesn't conflict with multiple submits
  // prevent multi-submit during loading via setLoading disabled property
})();
