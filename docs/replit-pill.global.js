"use strict";var ReplitPill=(()=>{(function(){if(typeof window>"u"||typeof document>"u")return;let h=window.self!==window.top;if(h&&document.referrer.startsWith("https://replit-com.web-sandbox.oaiusercontent.com"))return;let x=(()=>{let d=window.location.origin;return!!(d.endsWith(".replit.dev")||d.endsWith(".repl.co"))})(),a=!0,L=document.currentScript?.getAttribute("data-referral-code"),S=()=>{try{let d=!1;try{d=window.localStorage?.getItem("replit-pill-preference")==="hidden"}catch{}if(d||document.getElementById("replit-pill-host"))return;let v=document.createElement("div");v.id="replit-pill-host";let R=v.attachShadow({mode:"closed"}),_=`
        <path d="M25 19.995C25 20.0375 25 20.0575 25 20.085C25.015 21.34 25.5475 22.6275 26.425 23.525C26.445 23.545 26.4475 23.5475 26.45 23.55C26.485 23.585 26.5025 23.6025 26.54 23.6375C27.4225 24.485 28.6775 25.005 29.9025 25.03C29.9525 25.03 29.9975 25.03 30.0825 25.03H42C44.8 25.03 46.2 25.03 47.27 25.575C48.21 26.055 48.975 26.82 49.455 27.76C50 28.83 50 30.23 50 33.03V42.03C50 44.83 50 46.23 49.455 47.3C48.975 48.24 48.21 49.005 47.27 49.485C46.2 50.03 44.8 50.03 42 50.03H29.9275C28.6425 50.0325 27.3225 50.58 26.4125 51.485C26.4075 51.49 26.4775 51.42 26.45 51.4475C26.445 51.4525 26.4425 51.4525 26.4225 51.475C25.545 52.3725 25.0125 53.6575 24.9975 54.9125C24.9975 54.94 24.9975 54.9625 24.9975 55.0025V67.0575C24.9975 69.8575 24.9975 71.2575 24.4525 72.3275C23.9725 73.2675 23.2075 74.0325 22.2675 74.5125C21.1975 75.0575 19.7975 75.0575 16.9975 75.0575H7.9975C5.1975 75.0575 3.7975 75.0575 2.7275 74.5125C1.7875 74.0325 1.0225 73.2675 0.542498 72.3275C-0.00250244 71.2575 -0.00250244 69.8575 -0.00250244 67.0575V58.0575C-0.00250244 55.2575 -0.00250244 53.8575 0.542498 52.7875C1.0225 51.8475 1.7875 51.0825 2.7275 50.6025C3.7975 50.0575 5.1975 50.0575 7.9975 50.0575H19.7225C19.9 50.0575 19.9875 50.0575 20.08 50.055C21.2475 50.0125 22.4375 49.52 23.295 48.7225C23.3625 48.66 23.4125 48.61 23.5125 48.51C23.55 48.4725 23.5675 48.455 23.6025 48.42C24.455 47.5325 24.9725 46.2825 24.9975 45.0525C24.9975 45.0025 24.9975 44.96 24.9975 44.875V30.12C24.9975 30.0325 24.9975 29.99 24.9975 29.94C24.9725 28.71 24.455 27.46 23.6025 26.575C23.5675 26.54 23.55 26.52 23.5125 26.4825C23.475 26.445 23.4575 26.4275 23.42 26.3925C22.5325 25.54 21.2825 25.0225 20.0525 24.9975C20.0025 24.9975 19.96 24.9975 19.875 24.9975H7.9975C5.1975 24.9975 3.7975 24.9975 2.7275 24.4525C1.7875 23.9725 1.0225 23.2075 0.542498 22.2675C-0.00250244 21.1975 -0.00250244 19.7975 -0.00250244 16.9975V7.9975C-2.44146e-06 5.2 -2.44379e-06 3.8 0.544998 2.73C1.025 1.79 1.79 1.025 2.73 0.545C3.8 0 5.2 0 8 0H17C19.8 0 21.2 0 22.27 0.545C23.21 1.025 23.975 1.79 24.455 2.73C25 3.8 25 5.2 25 8V19.995Z" fill="currentColor"/>
      `,T=`
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      `,W=document.createElement("style");W.textContent=`
        #replit-pill {
          position: fixed;
          bottom: 48px;
          right: 48px;
          border-radius: 120px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          z-index: 1000000;
          white-space: nowrap;
          cursor: pointer;
          overflow: hidden;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #f0f2f6;
          box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.05), 1px 1px 1px 0px rgba(255, 255, 255, 0.1);
          transition:
            transform 0.2s ease,
            background-color 400ms cubic-bezier(0.2, 0.6, 0.2, 1),
            box-shadow 400ms cubic-bezier(0.2, 0.6, 0.2, 1);
        }
        #replit-pill[data-state="cta"] {
          background-color: rgba(38, 20, 12, 0.55);
          color: #faf6f1;
          box-shadow:
            0 8px 24px rgba(255, 90, 30, 0.28),
            1px 1px 1px 0px rgba(0, 0, 0, 0.05),
            inset 0 0 0 1px rgba(255, 140, 70, 0.18);
        }
        #replit-pill:hover {
          transform: scale(1.05);
        }
        #replit-pill .shimmer {
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          transition: transform 0.7s ease-in-out;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
          pointer-events: none;
        }
        #replit-pill:hover .shimmer {
          transform: translateX(100%);
        }
        #replit-pill .badge-content {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          position: relative;
          flex: 0 0 auto;
        }
        #replit-pill .replit-logo {
          color: currentColor;
        }
        #replit-pill .flip {
          position: relative;
          display: inline-block;
          height: 20px;
          overflow: hidden;
          font-weight: 500;
          line-height: 20px;
          color: currentColor;
        }
        #replit-pill .flip.ready {
          transition: width 300ms cubic-bezier(0.2, 0.6, 0.2, 1);
        }
        #replit-pill .row {
          position: absolute;
          inset: 0 auto 0 0;
          display: flex;
          align-items: center;
          white-space: nowrap;
          will-change: transform, opacity;
          transform: translateY(-110%);
          opacity: 0;
          line-height: 1;
        }
        #replit-pill .row.in {
          animation: replit-pill-roll-in 380ms cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }
        #replit-pill .row.out {
          animation: replit-pill-roll-out 380ms cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
        }
        @keyframes replit-pill-roll-in {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes replit-pill-roll-out {
          from { transform: translateY(0);     opacity: 1; }
          to   { transform: translateY(-110%); opacity: 0; }
        }
        #replit-pill .close-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          flex: 0 0 auto;
          border-radius: 64px;
          width: 12px;
          height: 12px;
          min-width: 0;
          cursor: pointer;
          border: none;
          box-sizing: border-box;
          background-color: transparent;
          transition: background-color 0.2s ease;
        }
        #replit-pill .close-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        #replit-pill .close-button:focus-visible {
          outline: 1px solid #e6e9ef;
          outline-offset: 1px;
        }
        #replit-pill .close-icon {
          width: 8px;
          height: 8px;
          color: #e6e9ef;
        }
        #replit-pill[data-state="cta"] .close-icon {
          color: #faf6f1;
        }
        #replit-pill[data-state="cta"] .close-button:focus-visible {
          outline-color: #faf6f1;
        }
        @media (prefers-reduced-motion: reduce) {
          #replit-pill,
          #replit-pill .flip,
          #replit-pill .row,
          #replit-pill .shimmer {
            transition: none;
          }
          #replit-pill .row.in,
          #replit-pill .row.out {
            animation: none;
          }
        }
      `;let I=(i,e,r,k,g)=>{let n=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setAttribute("width",i),n.setAttribute("height",e),n.setAttribute("viewBox",r),n.setAttribute("fill","none"),g&&(n.className.baseVal=g),n.innerHTML=k,n},t=document.createElement("div");t.id="replit-pill",t.setAttribute("data-state","brand");let H=document.createElement("div");H.className="shimmer";let E=document.createElement("div");E.className="badge-content";let B=I("10.67","16","0 0 50 75",_,"replit-logo"),c=document.createElement("span");c.className="flip";let o=document.createElement("span");o.className="row",o.setAttribute("data-key","brand"),o.setAttribute("aria-hidden","false"),o.textContent="Made with Replit";let l=document.createElement("span");l.className="row",l.setAttribute("data-key","cta"),l.setAttribute("aria-hidden","true"),l.textContent="Build yours free \u2192",c.append(o,l);let s=document.createElement("button");s.className="close-button",s.setAttribute("aria-label","Close");let u=I("24","24","0 0 24 24",T,"close-icon");u.setAttribute("stroke","currentColor"),u.setAttribute("stroke-width","2"),u.setAttribute("stroke-linecap","round"),u.setAttribute("stroke-linejoin","round"),s.appendChild(u),E.append(B,c),t.append(H,E,s);let w,f=()=>{w!==void 0&&(window.clearTimeout(w),w=void 0)};t.onclick=i=>{if(i.target!==s&&i.target!==s.firstChild){let e=L?`https://replit.com/referral-code/${L}?source=badge&referrer=${encodeURIComponent(window.location.origin)}`:"https://join.replit.com/badge_v3";if(h&&x&&window.parent){let r={type:"CLICKED_MADE_WITH_REPLIT_BADGE"};window.parent.postMessage(r,"*")}else window.open(e,"_blank")}},s.onclick=i=>{i.stopPropagation(),t.style.display="none",a=!1,f();try{window.localStorage.setItem("replit-pill-preference","hidden")}catch{}},R.appendChild(W),R.appendChild(t),document.body.appendChild(v);let V=!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!(h&&x),D=3200,z=380,C={brand:0,cta:0},m="brand",b=!1,A=!1,M=!1,y=()=>A||M,p=()=>{},N=()=>{let i=m==="brand"?"cta":"brand",e=m==="brand"?o:l,r=m==="brand"?l:o;c.style.width=`${C[i]}px`,e.style.transform="",e.style.opacity="",e.classList.remove("in"),e.classList.add("out"),e.setAttribute("aria-hidden","true"),r.classList.remove("out"),r.offsetWidth,r.classList.add("in"),r.setAttribute("aria-hidden","false"),t.setAttribute("data-state",i),m=i,b=!0,window.setTimeout(()=>{e.classList.remove("out"),b=!1,a&&!y()&&p()},z)};p=()=>{!V||!a||y()||b||(f(),w=window.setTimeout(N,D))},(()=>{C.brand=o.scrollWidth,C.cta=l.scrollWidth,c.style.width=`${C[m]}px`,o.style.transform="translateY(0)",o.style.opacity="1",requestAnimationFrame(()=>{c.classList.add("ready"),p()})})(),t.addEventListener("mouseenter",()=>{A=!0,f()}),t.addEventListener("mouseleave",()=>{A=!1,!y()&&!b&&p()}),t.addEventListener("focusin",()=>{M=!0,f()}),t.addEventListener("focusout",()=>{M=!1,!y()&&!b&&p()}),h&&x?window.addEventListener("message",i=>{let e=i.origin,r=new URL(e),k=r.hostname==="replit.com"||r.hostname.endsWith(".replit.com")||r.hostname.endsWith(".replit.dev")||r.hostname.endsWith(".repl.co"),g=!1;if(document.referrer)try{let P=new URL(document.referrer).origin;g=e===P}catch{}if(!k&&!g)return;let n=i.data;if(!(!n||typeof n!="object"||!n.type)){if(n.type==="SHOW_MADE_WITH_REPLIT_BADGE"){if(a)return;t.style.display="inline-flex",a=!0,p()}else if(n.type==="HIDE_MADE_WITH_REPLIT_BADGE"){if(!a)return;t.style.display="none",a=!1,f()}}}):a=!0}catch{}};document.readyState==="complete"||document.readyState==="interactive"?setTimeout(S,100):document.addEventListener("DOMContentLoaded",S)})();})();
