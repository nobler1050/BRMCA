const NAV_LINKS = [
  { href: "index.html", label: "HOME" },
  {
    href: "membership.html",
    label: "MEMBERSHIP",
    children: [
      { href: "membership.html", label: "JOIN" },
      { href: "activities.html", label: "ACTIVITIES" },
      { href: "get-involved.html", label: "GET INVOLVED" },
      { href: "donate.html", label: "DONATE" },
    ],
  },
  {
    href: "firewise.html",
    label: "FIRE SAFETY",
    children: [
      { href: "firewise.html", label: "FIREWISE" },
      { href: "evacuation.html", label: "EVACUATION" },
    ],
  },
  {
    href: "resources.html",
    label: "RESOURCES",
    children: [
      { href: "resources.html", label: "KEY INFO" },
      { href: "conservation.html", label: "CONSERVATION" },
    ],
  },
  {
    href: "about.html",
    label: "ABOUT",
    children: [
      { href: "about.html", label: "ABOUT BRMCA" },
      { href: "sponsors.html", label: "SPONSORS" },
      { href: "history.html", label: "HISTORY" },
    ],
  },
  { href: "contact.html", label: "CONTACT US" },
];

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function buildNavMarkup() {
  const here = currentPage();
  const link = (item, active) =>
    `<a href="${item.href}"${active ? ' class="active"' : ""}${item.href === here ? ' aria-current="page"' : ""}>${item.label}</a>`;
  return NAV_LINKS.map((item) => {
    const childMatch =
      item.children && item.children.some((c) => c.href === here);
    const top = link(item, item.href === here || childMatch);
    if (!item.children) {
      return `<li>${top}</li>`;
    }
    const children = item.children
      .map((c) => link(c, c.href === here))
      .join("");
    return `<li class="dropdown">${top}<div class="dropdown-content">${children}</div></li>`;
  }).join("");
}

function ensureSkipLink() {
  const main = document.querySelector("main");
  if (main && !main.id) main.id = "main-content";

  const skip = document.createElement("a");
  skip.href = "#main-content";
  skip.className = "skip-link";
  skip.textContent = "Skip to main content";
  document.body.prepend(skip);
}

function renderHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  header.innerHTML = `
        <div class="logo">
            <a href="index.html" class="logo-link">
                <img src="assets/images/logo-small.png" alt="Blue Ridge Mountain Civic Association" width="297" height="300">
            </a>
        </div>
        <button class="menu-toggle" aria-label="Toggle Navigation" aria-expanded="false" aria-controls="main-nav">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav id="main-nav">
            <ul>${buildNavMarkup()}</ul>
        </nav>
    `;

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector("#main-nav");

  const closeNav = () => {
    nav.classList.remove("active");
    nav.style.maxHeight = "";
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  const openNav = () => {
    nav.classList.add("active");
    nav.style.maxHeight = `${window.innerHeight - header.getBoundingClientRect().bottom}px`;
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  };

  toggle.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      closeNav();
    } else {
      openNav();
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("active")) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("active")) {
      closeNav();
      toggle.focus();
    }
  });
}

function renderFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;
  const year = new Date().getFullYear();
  footer.innerHTML = `
        <div class="footer-content">
            <p>BLUE RIDGE MOUNTAIN CIVIC ASSOCIATION</p>
            <p>Find us on <a href="https://www.facebook.com/groups/2898360027109749" target="_blank" rel="noopener">Facebook</a></p>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${year} by Blue Ridge Mountain Civic Association. Proudly created for the community.</p>
        </div>
    `;
}

/* Shared submit state: disables the button and clears any prior error,
   returning succeed/fail callbacks for the outcome. */
function beginFormSubmit(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  let errorEl = form.querySelector(".form-error-message");
  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.className = "form-error-message";
    submitBtn.insertAdjacentElement("beforebegin", errorEl);
  }
  errorEl.textContent = "";
  errorEl.style.display = "none";

  return {
    succeed() {
      window.location.href = "thank-you.html";
    },
    fail(message) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    },
  };
}

function enableAjaxFormSubmit() {
  document
    .querySelectorAll("form.contact-form:not([data-mailchimp])")
    .forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const submit = beginFormSubmit(form);

        try {
          const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });

          if (!response.ok) throw new Error("Form submission failed");

          submit.succeed();
        } catch {
          submit.fail(
            "Something went wrong sending this — please try again, or email us directly.",
          );
        }
      });
    });
}

/* Mailchimp's subscribe endpoint has no CORS support; JSONP against the
   post-json variant is its supported client-side path. Success redirects
   to the same thank-you page as the other forms. */
function enableMailchimpFormSubmit() {
  document.querySelectorAll("form[data-mailchimp]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const submit = beginFormSubmit(form);

      const params = new URLSearchParams(new FormData(form));
      const callbackName = `mailchimpCallback${Date.now()}`;
      params.set("c", callbackName);

      const script = document.createElement("script");
      let done = false;
      const finish = (handler) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        delete window[callbackName];
        script.remove();
        handler();
      };

      /* Fallback: Mailchimp's throttle response concatenates two JSONP
         calls into one script, a parse error that fires neither the
         callback nor script.onerror — without this the button would
         stay stuck on "Sending…". */
      const timer = setTimeout(
        () =>
          finish(() =>
            submit.fail(
              "Something went wrong sending this — please wait a few minutes and try again.",
            ),
          ),
        10000,
      );

      window[callbackName] = (response) => {
        finish(() => {
          if (response.result === "success") {
            submit.succeed();
            return;
          }
          // Mailchimp error messages can contain HTML links; show text only
          const scratch = document.createElement("div");
          scratch.innerHTML = response.msg || "";
          submit.fail(
            scratch.textContent ||
              "Something went wrong — please try again, or email us directly.",
          );
        });
      };
      script.onerror = () =>
        finish(() =>
          submit.fail(
            "Something went wrong sending this — please try again, or email us directly.",
          ),
        );
      script.src = `${form.action.replace("/post?", "/post-json?")}&${params}`;
      document.body.append(script);
    });
  });
}

/* A checkbox marked data-exclusive (e.g. "I would prefer not to receive
   emails") can't be combined with any other checkbox in the same form:
   checking it clears the rest, and checking any other clears it. */
function enableExclusiveCheckboxes() {
  document.querySelectorAll("form input[data-exclusive]").forEach((excl) => {
    const form = excl.closest("form");
    form.addEventListener("change", (event) => {
      const box = event.target;
      if (box.type !== "checkbox" || !box.checked) return;
      if (box === excl) {
        form.querySelectorAll('input[type="checkbox"]').forEach((other) => {
          if (other !== excl) other.checked = false;
        });
      } else {
        excl.checked = false;
      }
    });
  });
}

ensureSkipLink();
renderHeader();
renderFooter();
enableAjaxFormSubmit();
enableMailchimpFormSubmit();
enableExclusiveCheckboxes();
