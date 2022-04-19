export default function fixedNavigation(){const e=document.querySelector("main"),t=document.querySelector(".header"),n=t.getBoundingClientRect().height;new IntersectionObserver(e=>{const[n]=e;n.isIntersecting?t.classList.remove("sticky"):t.classList.add("sticky")},{root:null,rootMargin:`-${n}px`,threshold:0}).observe(e)}
//# sourceMappingURL=fixedNavigation.js.map
