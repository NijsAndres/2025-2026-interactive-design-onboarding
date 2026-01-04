let progress = 0;
let currentAnimation = null;

const steps = [
  {
    screen: 1,
    title: "Sign in Seconds",
    description: "Sign documents electronically from anywhere, anytime.",
    animation: "../assets/lottie/sign.json",
  },
  {
    screen: 2,
    title: "Your Digital Signature",
    description: "Log in to view, track, and sign your documents instantly.",
    animation: "../assets/lottie/login.json",
  },
  {
    screen: 3,
    title: "Never Miss a Request",
    description: "Enable notifications to know exactly when a document needs your attention.",
    animation: "../assets/lottie/docs.json",
  },
  {
    screen: 4,
    title: "Easily Fill in Forms",
    description: "Use easy to use drag and drop to fill in forms quickly.",
    animation: "../assets/lottie/fill.json",
  },
  {
    screen: 5,
    title: "You're All Caught Up",
    description: "No pending documents. Time to relax.",
    animation: "../assets/lottie/done.json",
  },
];

renderOnboardingStep = () => {
  console.log(`Rendering step ${progress + 1}`);

  const titleEl = document.querySelector(".js-title");
  const descriptionEl = document.querySelector(".js-description");
  const animationContainer = document.querySelector(".js-animation-container");
  const progressBtn = document.querySelector(".js-progress-btn");
  const backBtn = document.querySelector(".js-back-btn");
  const skipBtn = document.querySelector(".js-skip-btn");

  const currentStep = steps[progress];

  titleEl.innerHTML = currentStep.title;
  descriptionEl.innerHTML = currentStep.description;

  const percentage = (progress / 4) * 100;
  console.log(`Progress percentage: ${percentage}%`);
  progressBtn.style.setProperty("--progress", `${percentage}%`);

  // Clear previous animation
  if (currentAnimation) {
    currentAnimation.destroy();
  }
  animationContainer.innerHTML = "";

  // Load new Lottie animation
  currentAnimation = lottie.loadAnimation({
    container: animationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: currentStep.animation,
  });

  // Update button visibility
  if (progress === 0) {
    backBtn.classList.add("u-hide");
  } else {
    backBtn.classList.remove("u-hide");
  }

  if (progress === steps.length - 1) {
    skipBtn.classList.add("u-invisible");
  } else {
    skipBtn.classList.remove("u-invisible");
  }
};

const listToProgressButton = () => {
  const progressBtn = document.querySelector(".js-progress-btn");
  progressBtn.addEventListener("click", () => {
    if (progress < steps.length - 1) {
      progress++;
      renderOnboardingStep();
    }
  });
};

const listenToBackButton = () => {
  const backBtn = document.querySelector(".js-back-btn");
  backBtn.addEventListener("click", () => {
    if (progress > 0) {
      progress--;
      renderOnboardingStep();
    }
  });
};

const listenToSkipButton = () => {
  const skipBtn = document.querySelector(".js-skip-btn");
  skipBtn.addEventListener("click", () => {
    progress = steps.length - 1;
    renderOnboardingStep();
  });
};

const init = () => {
  console.log("App initialized");
  renderOnboardingStep();
  listToProgressButton();
  listenToBackButton();
  listenToSkipButton();
};

document.addEventListener("DOMContentLoaded", init);
