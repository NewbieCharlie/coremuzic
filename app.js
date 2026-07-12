document.addEventListener('DOMContentLoaded', () => {

  // 1. Scrolled Navbar Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // 2. Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburgerToggle');
  const mobileNavPanel = document.getElementById('mobileNavPanel');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const toggleMobileMenu = () => {
    mobileNavPanel.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileNavPanel.classList.contains('open') ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    mobileNavPanel.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on clicking any navigation link
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. FAQ Accordion Interactivity
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const content = trigger.nextElementSibling;
      const isActive = trigger.classList.contains('active');

      // Close all other open FAQ items first
      document.querySelectorAll('.faq-trigger').forEach(el => {
        el.classList.remove('active');
        el.nextElementSibling.style.maxHeight = null;
      });

      if (!isActive) {
        trigger.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 4. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const commentsText = document.getElementById('commentsText');
  const formBanner = document.getElementById('formBanner');

  const nameGroup = document.getElementById('nameGroup');
  const emailGroup = document.getElementById('emailGroup');
  const messageGroup = document.getElementById('messageGroup');

  const setError = (group, show) => {
    if (group) {
      if (show) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
    }
  };

  const showBanner = (text, status) => {
    if (formBanner) {
      formBanner.textContent = text;
      formBanner.className = `form-banner ${status}`;
    }
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;

      // Validate Name
      if (!contactName.value.trim()) {
        setError(nameGroup, true);
        isValid = false;
      } else {
        setError(nameGroup, false);
      }

      // Validate Email
      const emailValue = contactEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue || !emailRegex.test(emailValue)) {
        setError(emailGroup, true);
        isValid = false;
      } else {
        setError(emailGroup, false);
      }

      // Validate Message
      if (!commentsText.value.trim()) {
        setError(messageGroup, true);
        isValid = false;
      } else {
        setError(messageGroup, false);
      }

      if (!isValid) {
        showBanner('Please correct the highlighted errors before submitting.', 'error');
        return;
      }

      // Mock submit action
      showBanner('Sending your message...', 'success');
      
      setTimeout(() => {
        showBanner('Your message was sent successfully. Thanks!', 'success');
        contactForm.reset();
        
        // Remove success banner after 4 seconds
        setTimeout(() => {
          if (formBanner) {
            formBanner.style.display = 'none';
            formBanner.className = 'form-banner';
            formBanner.textContent = '';
          }
        }, 4000);
      }, 1000);
    });
  }

  // 5. Fade-up Scroll Animations via IntersectionObserver
  const animateElements = document.querySelectorAll('[data-animate="fade-up"]');
  const animationObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };
  
  const animationObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  };

  if (animateElements.length > 0) {
    const animationObserver = new IntersectionObserver(animationObserverCallback, animationObserverOptions);
    animateElements.forEach(el => animationObserver.observe(el));
  }

});
