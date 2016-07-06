const ready = (func) => {
  if (typeof func !== 'function') return;
  
  if (document.readyState === "interactive") {
    func();
    return;
  }
  
  document.addEventListener("DOMContentLoaded", func, false);
};

export { ready as default };
