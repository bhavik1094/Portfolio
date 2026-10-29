import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import '../assets/Dialog.css';

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/** A viewport-level dialog shared by overlays without inheriting page transforms. */
const AccessibleDialog = ({ isOpen, onClose, titleId, children }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const reduceMotion = useReducedMotion();
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const siblings = Array.from(document.body.children)
      .filter((element) => element !== overlayRef.current)
      .map((element) => ({ element, inert: element.hasAttribute('inert') }));

    // Move focus before hiding the page from keyboard navigation.
    const panel = panelRef.current;
    (panel?.querySelector('[data-dialog-close]') || panel)?.focus();
    siblings.forEach(({ element }) => element.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';

    const getFocusable = () => Array.from(panel?.querySelectorAll(focusableSelector) || [])
      .filter((element) => !element.closest('[hidden], [inert]'));

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
      } else if (event.key === 'Tab') {
        const focusable = getFocusable();
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first) {
          event.preventDefault();
          panel?.focus();
        } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const containFocus = (event) => {
      if (panel && !panel.contains(event.target)) {
        (getFocusable()[0] || panel).focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', containFocus);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', containFocus);
      document.body.style.overflow = previousOverflow;
      siblings.forEach(({ element, inert }) => {
        if (!inert) element.removeAttribute('inert');
      });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="portfolio-dialog-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) onCloseRef.current();
          }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <motion.div
            ref={panelRef}
            className="portfolio-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default AccessibleDialog;
