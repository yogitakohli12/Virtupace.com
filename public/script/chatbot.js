// !function(){var e=0;let t=document.createElement("div");t.classList.add("chat-container");let a=document.createElement("div");a.classList.add("chat-history"),a.classList.add("custom-scrollbar"),a.id="chat-history",t.appendChild(a);let i=document.createElement("div");function l(e){let t=/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,a=e.replace(t,e=>`<a href="mailto:${e}">${e}</a>`);return a.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/g,e=>{let t=e.startsWith("http")?e:`http://${e}`;return`<a href="${t}" target="_blank" rel="noopener noreferrer">${e}</a>`})}i.classList.add("chat-history-header"),i.id="chat-history-header",i.innerHTML='<img class="avatar-for-chatbot" style="border-radius: 50%; margin-right: 20px;" src="https://tawk.link/521727297ca1334016000005/var/trigger-images/3248e471c4b3881b35c5d0d0b1315433bcaf2ade.jpg" alt="Agent profile image"><div style="display: flex; justify-items: center; align-items: center; flex-direction: column"><div class="chatbot-header-title">Meta Droom</div><div class="chatbot-header-desc">AI Assistant</div></div>',a.appendChild(i),console.log(l("Hi, this is team@virtupace.com. Our platform is virtupace.com and our Instagram is https://www.instagram.com/aureal_one/."));let _=document.createElement("div");_.classList.add("message-item");let r=document.createElement("div");r.classList.add("flexItem");let $=document.createElement("div");$.innerHTML=l("Hello! How can I assist you today?");let o=document.createElement("div");o.innerHTML='<img class="avatar-for-chatbot" src="https://tawk.link/521727297ca1334016000005/var/trigger-images/3248e471c4b3881b35c5d0d0b1315433bcaf2ade.jpg" alt="Agent profile image">',$.classList.add("bot-message"),_.appendChild(o),_.appendChild($),_.appendChild(r),a.appendChild(_);let d=document.createElement("div");d.classList.add("chat-input");let n=document.createElement("div");n.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" height="32px" width="32px" role="img" alt="Chat icon" class="tawk-min-chat-icon">  
//     <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"></path>  
//   </svg>`,n.classList.add("popup-button");let s=document.createElement("input");s.type="text",s.id="user-input",s.placeholder="Type and press [enter] ..";let c=document.createElement("button");function p(e,t){let i=document.createElement("div"),_=0;if(i.classList.add("message-item"),0==t){let r=document.createElement("div");r.classList.add("flexItem");let $=document.createElement("div");$.textContent=e,$.classList.add("user-message"),i.appendChild(r),i.appendChild($)}else if(1==t){var o;clearInterval(_);let d=document.getElementsByClassName("chatbot-loading-msg");a.removeChild(d[0]);let n=document.createElement("div");n.classList.add("flexItem");let s=document.createElement("div"),c=document.createElement("div");c.innerHTML='<img class="avatar-for-chatbot" src="https://tawk.link/521727297ca1334016000005/var/trigger-images/3248e471c4b3881b35c5d0d0b1315433bcaf2ade.jpg" alt="Agent profile image">',s.classList.add("bot-message"),i.appendChild(c),i.appendChild(s),i.appendChild(n);let p;o=l(e),p=0,_=setInterval(()=>{p<o.length?(s.innerHTML=o.slice(0,p+1),p++):clearInterval(_)},10)}else{let h=document.createElement("div");h.classList.add("flexItem");let g=document.createElement("div");g.innerHTML=`<div style="display: flex"><div class="dot tawk-agent-chat-bubble-dots"></div>
//         <div class="dot tawk-agent-chat-bubble-dots"></div>
//         <div class="dot tawk-agent-chat-bubble-dots"></div></div>`;let b=document.createElement("div");b.innerHTML='<img class="avatar-for-chatbot" src="https://tawk.link/521727297ca1334016000005/var/trigger-images/3248e471c4b3881b35c5d0d0b1315433bcaf2ade.jpg" alt="Agent profile image">',g.classList.add("bot-message"),i.appendChild(b),i.appendChild(g),i.appendChild(h),i.classList.add("chatbot-loading-msg")}a.appendChild(i),a.scrollTop=a.scrollHeight}async function h(e){p("...",2);let t=await fetch("https://chatbot-api.virtupace.com/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:e})});if(t.ok){let a=await t.json();p(a.answer,1)}else p("Bot: Sorry, there was an error.")}c.id="send-button",c.innerText="Send",d.appendChild(s),d.appendChild(c),t.appendChild(d),document.body.appendChild(t),document.body.appendChild(n),c.addEventListener("click",()=>{let e=s.value.trim();e&&(p(e,0),s.value="",h(e))}),s.addEventListener("keypress",e=>{"Enter"===e.key&&c.click()}),n.addEventListener("click",()=>{1==(e=!e)?(t.style.display="block",n.innerHTML=`
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" height="25px" width="25px" role="img" alt="Close icon" class="tawk-min-chat-icon">  
//         <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M466.24042,400.4053l272.927-275.99463c6.94586-8.76452,11.13092-20.00501,11.13092-32.20959 s-4.18506-23.42317-11.21857-32.29724l0.08765,0.10955c-8.76453-6.94588-20.005-11.13094-32.20959-11.13094 c-12.20453,0-23.42316,4.18505-32.29724,11.21858l0.10956-0.08765L401.84311,336.008L125.84851,60.0134 c-8.76452-6.94588-20.00501-11.13094-32.2096-11.13094s-23.42316,4.18506-32.29724,11.21858l0.10955-0.08765 C54.50535,68.77792,50.32029,80.01842,50.32029,92.223s4.18505,23.42317,11.21858,32.29724l-0.08764-0.10956l275.9946,275.99463 L61.45122,673.33234c-6.94588,8.76453-11.13094,20.005-11.13094,32.20959s4.18506,23.42316,11.21858,32.29724l-0.08765-0.1095 c8.19483,7.64703,19.2162,12.33606,31.33314,12.33606c0.83263,0,1.68717-0.02191,2.49789-0.06573h-0.10957 c0.54779,0.02191,1.20512,0.04382,1.86246,0.04382c11.32813,0,21.5388-4.71094,28.79144-12.29224l0.0219-0.02191 l275.99463-272.92703l272.92703,272.92703c7.2746,7.58136,17.48523,12.31415,28.81335,12.31415 c0.65735,0,1.29279-0.02191,1.95013-0.04382h-0.08765c0.72308,0.04382,1.55573,0.06573,2.38831,0.06573 c12.11694,0,23.16022-4.68903,31.37695-12.35797l-0.02185,0.02191c6.94586-8.76447,11.13092-20.005,11.13092-32.20959 c0-12.20453-4.18506-23.42316-11.21857-32.29724l0.08765,0.10956L466.24042,400.4053z"></path>  
//     </svg>
//         `):(t.style.display="none",n.innerHTML=`
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" height="32px" width="32px" role="img" alt="Chat icon" class="tawk-min-chat-icon">  
//       <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"></path>  
//   </svg>
//         `)});let g=document.createElement("style");g.textContent=`
//           .chat-container {  
//               display: none;
//               width: 350px;  
//               margin: 20px auto;  
//               border-radius: 5px;  
//               background-color: #fff;  
//               box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);  
//               position: fixed;
//               right: 20px;
//               bottom: 60px;
//               font-family: Raleway;
//               z-index: 9999;
//           }  
//           .chat-history {  
//               height: 350px;
//               border-bottom: 1px solid #ccc;  
//               background-color: #f9f9f9;
//               overflow: auto;
//           }  
//           .custom-scrollbar::-webkit-scrollbar {  
//               width: 8px; /* Width of the scrollbar */  
//           }  
          
//           .custom-scrollbar::-webkit-scrollbar-track {  
//               background: #f1f1f1; /* Background of the track */  
//           }  
          
//           .custom-scrollbar::-webkit-scrollbar-thumb {  
//               background-color: #888; /* Scrollbar color */  
//               border-radius: 10px; /* Roundness */  
//               border: 2px solid #f1f1f1; /* Space around the thumb */  
//           }  
          
//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {  
//               background: #555; /* Color when hovering */  
//           }    
//           .chat-input {  
//               display: flex;  
//               padding: 10px;  
//           }  
//           .chat-input input {  
//               flex: 1;  
//               padding: 10px;  
//               border: none;  
//               border-radius: 5px;  
//               color: black;
//           }  
//           .chat-input button {  
//               padding: 10px 15px;  
//               border: 1px solid rgb(17, 0, 64);  
//               background-color: rgb(17, 0, 64);  
//               color: white;  
//               border-radius: 5px;  
//               cursor: pointer;  
//               margin-left: 5px;  
//               font-family: Raleway;
//               font-size: 16px;
//           }  
//           .chat-input button:hover {  
//               background-color: white;
//               color: rgb(17, 0, 64); 
//           }  
//           .popup-button{
//               color: white;
//               position: fixed;
//               right: 20px;
//               bottom: 20px;
//               width: 50px;
//               height: 50px;
//               background-color: rgb(17, 0, 64);
//               border-radius: 50%;
//               border: 2px solid white;
//               cursor: pointer;
//               display: flex;
//               justify-content: center;
//               align-items: center;
              
//           }
//           .chat-history-header{
//               height: 100px;
//               width: 100%;
//               background-color: rgb(17, 0, 64);
//               margin-bottom: 20px;
//               color: white;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//           }
//           .user-message{
//               margin : 0px 10px;
//               text-align: right;
//               padding : 10px;
//               background-color: rgb(17, 0, 64);
//               border-radius: 10px;
//               color: white;
//               max-width: 200px;
//               font-size: 16px;
//               line-height: 1.5;
//           }
//           .bot-message{
//             word-wrap: break-word; /* Break long words or links */
//               margin : 0px 10px;
//               text-align: left;
//               padding : 10px;
//               background-color: #e5e5e5;
//               border-radius: 10px;
//               max-width: 200px;
//               font-size: 16px;
//               line-height: 1.5;
//               color: black;
//           }
//           .message-item{
//               display: flex;
//               margin: 5px 10px 15px 10px;
//               justify-content: center;
//               align-items: flex-end;
//           }
//           .flexItem {
//               flex: 1;
//           }
//           .avatar-for-chatbot{
//             width: 40px;
//             height: 40px;
//           }
//           .chatbot-header-title{
//             font-size: 20px;
//             margin-bottom: 15px;
//           }
//           .chatbot-header-desc{
//             font-size: 16px;
//           }
//           .tawk-agent-chat-bubble-dots{
//             width: 10px;
//             height: 10px;
//             background-color: gray;
//             border-radius: 50%;
//             animation: moveCircle 1s ease-in-out infinite; /* Continuous animation */  
//             margin-right: 5px;
//           }
//           @keyframes moveCircle {  
//             0% {  
//                 transform: translateY(5px); /* Starting at the bottom */  
//             }  
//             50% {  
//                 transform: translateY(-5px);
//             }  
//             100% {  
//                 transform: translateY(5px);
//             }  
//           } 
          
//           .tawk-agent-chat-bubble-dots:nth-child(1) {  
//             animation-delay: 0s; /* No delay for the first circle */  
//           }  
//           .tawk-agent-chat-bubble-dots:nth-child(2) {  
//               animation-delay: 0.2s; /* Delay for the second circle */  
//           }  
//           .tawk-agent-chat-bubble-dots:nth-child(3) {  
//               animation-delay: 0.4s; /* Delay for the third circle */  
//           }  
//       `,document.head.appendChild(g)}();