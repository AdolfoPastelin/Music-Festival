export default function scrollNav(){document.querySelectorAll(".principal-navigation a").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();const t=e.target.attributes.href.value;document.querySelector(t).scrollIntoView({alignToTop:!0,behavior:"smooth"})})})}
//# sourceMappingURL=scrollNavigation.js.map
