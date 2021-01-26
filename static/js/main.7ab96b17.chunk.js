(this["webpackJsonpinsulin-calculator"]=this["webpackJsonpinsulin-calculator"]||[]).push([[0],{36:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),o=a.n(c),i=a(21),l=a(3),u=a(4),s=a(1),d=a(2),m=a(12);a(5);function g(e){var t=e.id,a=e.type,n=void 0===a?"text":a,c=e.name,o=void 0===c?"":c,i=e.value,l=void 0===i?"":i,u=e.onChange,s=void 0===u?"":u,d=e.onFocus,m=void 0===d?"":d,g=e.description,b=void 0===g?"":g,f=e.placeholder,h=void 0===f?"":f,S=e.unit,p=void 0===S?"":S;return r.a.createElement("div",null,r.a.createElement("label",null,b),r.a.createElement("br",null),r.a.createElement("input",{type:n,autoComplete:"off",id:t,name:o,placeholder:h,value:l,onChange:""===s?function(){return 0}:function(e){return s(e)},onFocus:""===m?function(){return 0}:function(){return m()}}),r.a.createElement("label",null,p))}function b(e){var t=e.setBloodSugar,a=e.setDayTimeChoice,n=e.setTargetBloodSugar,c=e.setCorrectionFactor,o=e.setCarbohydrateFactor,i=e.bloodSugar,l=e.dayTimeChoice,u=e.targetBloodSugar,s=e.correctionFactor,d=e.carbohydrateFactor,m=e.refreshPage;return r.a.createElement("div",{className:"space-around"},r.a.createElement(g,{name:"BloodSugar",type:"number",value:i.toString(),description:"Blutzucker",unit:"mg/dl",onChange:function(e){return t(e.target.value)}}),r.a.createElement("p",{className:"center-elements day-time-choice-buttons"},r.a.createElement("button",{className:"automatic-day-time-choice-button \n                    ".concat("automatic"===l&&"active-button"),onClick:function(){a("automatic"),m()}},"Automatic"),r.a.createElement("button",{className:"morning-day-time-choice-button \n                    ".concat("morning"===l&&"active-button"),onClick:function(){a("morning"),m()}},"Morgens"),r.a.createElement("button",{className:"midday-day-time-choice-button \n                    ".concat("midday"===l&&"active-button"),onClick:function(){a("midday"),m()}},"Mittags"),r.a.createElement("button",{className:"evening-day-time-choice-button \n                    ".concat("evening"===l&&"active-button"),onClick:function(){a("evening"),m()}},"Abends")),r.a.createElement(g,{name:"TargetBloodSugar",type:"number",value:u,description:"Blutzucker Zielwert",unit:"mg/dl",onChange:function(e){return n(e.target.value)}}),r.a.createElement(g,{name:"CorrectionFactor",type:"number",value:s,description:"Korrektur-Faktor",unit:"mg/dl",onChange:function(e){return c(e.target.value)}}),r.a.createElement(g,{name:"CarbohydrateFactor",type:"number",value:d,description:"KE-Faktor",onChange:function(e){return o(e.target.value)}}))}function f(e){var t=e.suggestionText,a=e.handleSuggestionClick;return r.a.createElement("li",{onClick:function(){return a(t)}},t)}function h(e){var t=e.allSuggestions,a=e.searchingText,n=e.handleSuggestionClick,c=e.hideSuggestionList,o=""===a?[]:t.filter((function(e){return e.slice(0,a.length).toLowerCase()===a.toLowerCase()}));return r.a.createElement("div",null,0!==o.length&&r.a.createElement("ul",{className:"suggestion-list"},r.a.createElement("button",{className:"hide-suggestion-list-button",onClick:function(){return c()}}),o.map((function(e){return r.a.createElement(f,{key:Math.random(),suggestionText:e,handleSuggestionClick:n})}))))}function S(e){var t=e.id,a=e.isPer100gSlideActive,n=void 0===a||a,c=e.per100gSlide,o=void 0===c?{}:c,i=e.perPieceSlide,l=void 0===i?{}:i,u=e.foodNameSuggestionsForPer100gSlide,s=e.foodNameSuggestionsForPerPieceSlide,d=e.handleIsIntermealChange,m=e.handlePer100gSlideValueChange,b=e.handlePerPieceSlideValueChange,f=e.deleteFoodItem,S=e.handleSuggestionClick,p=e.handleSlideChange,v=e.hideSuggestionList,E=e.scrollFoodItemUp,O=r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{className:"intermeal-checkbox"},r.a.createElement("input",{type:"checkbox",checked:o.isIntermeal,onChange:function(){return d(t,1)}})," ZM?"),r.a.createElement(g,{id:"".concat(t,"-per100gSlideName"),name:"name",description:"Name",value:o.name,onChange:function(e){return m(e)},onFocus:function(){return E(t,!0)}}),o.shouldDisplaySuggestions&&r.a.createElement(h,{allSuggestions:u,searchingText:o.name,handleSuggestionClick:function(e){return S(e,t,!0)},hideSuggestionList:function(){return v(t,!0)}}),r.a.createElement(g,{id:"".concat(t,"-grams"),name:"grams",type:"number",description:"Gramm",value:o.grams,onChange:function(e){return m(e)}}),r.a.createElement(g,{id:"".concat(t,"-carbohydratesPer100Grams"),name:"carbohydratesPer100Grams",type:"number",description:"Kohlenhydrate pro 100g",value:o.carbohydratesPer100Grams,onChange:function(e){return m(e)}}),"number"===typeof o.KE&&r.a.createElement("label",{className:"food-item-ke-label"},"".concat(o.KE," KE"))),P=r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{className:"intermeal-checkbox"},r.a.createElement("input",{type:"checkbox",checked:l.isIntermeal,onChange:function(){return d(t,2)}})," ZM?"),r.a.createElement(g,{id:"".concat(t,"-perPieceSlideName"),name:"name",description:"Name",value:l.name,onChange:function(e){return b(e)},onFocus:function(){return setTimeout((function(){E(t,!1)}),100)}}),l.shouldDisplaySuggestions&&r.a.createElement(h,{allSuggestions:s,searchingText:l.name,handleSuggestionClick:function(e){return S(e,t,!1)},hideSuggestionList:function(){return v(t,!1)}}),r.a.createElement(g,{id:"".concat(t,"-numberOfPieces"),name:"numberOfPieces",type:"number",description:"Anzahl",value:l.numberOfPieces,onChange:function(e){return b(e)}}),r.a.createElement(g,{id:"".concat(t,"-carbohydratesPerPiece"),name:"carbohydratesPerPiece",type:"number",description:"Kohlenhydrate pro St\xfcck",value:l.carbohydratesPerPiece,onChange:function(e){return b(e)}}),"number"===typeof l.KE&&r.a.createElement("label",{className:"food-item-ke-label"},"".concat(l.KE," KE")));return r.a.createElement("div",null,r.a.createElement("p",{className:"center-elements"},r.a.createElement("button",{className:"per-100g-button ".concat(n&&"active-button"),onClick:function(){return p(t,!0)}},"pro 100g"),r.a.createElement("button",{className:"per-piece-button ".concat(!n&&"active-button"),onClick:function(){return p(t,!1)}},"pro St\xfcck")),r.a.createElement("div",{className:"space-around"},r.a.createElement("button",{className:"delete-food-item-button",onClick:function(){return f(t)}}),n?O:P),r.a.createElement("hr",null))}function p(e){var t=e.foodItems,a=void 0===t?[]:t,n=e.foodNameSuggestionsForPer100gSlide,c=void 0===n?[]:n,o=e.foodNameSuggestionsForPerPieceSlide,i=void 0===o?[]:o,l=e.addNewFoodItem,u=e.handleIsIntermealChange,s=e.handlePer100gSlideValueChange,d=e.handlePerPieceSlideValueChange,m=e.deleteFoodItem,g=e.handleSuggestionClick,b=e.handleSlideChange,f=e.hideSuggestionList,h=e.scrollFoodItemUp;return r.a.createElement("div",null,r.a.createElement("h3",null,"Elemente"),a.map((function(e){return r.a.createElement(S,{key:e.key,id:e.id,isPer100gSlideActive:e.isPer100gSlideActive,per100gSlide:e.per100gSlide,perPieceSlide:e.perPieceSlide,foodNameSuggestionsForPer100gSlide:c,foodNameSuggestionsForPerPieceSlide:i,handleIsIntermealChange:u,handlePer100gSlideValueChange:s,handlePerPieceSlideValueChange:d,deleteFoodItem:m,handleSuggestionClick:g,handleSlideChange:b,hideSuggestionList:f,scrollFoodItemUp:h})})),r.a.createElement("p",null,r.a.createElement("button",{className:"add-new-food-item-button",onClick:function(){return l()}})))}function v(e){var t=e.totalIE,a=e.totalMainMealKE,n=e.totalIntermealKE,c=e.totalKE,o=e.totalCorrectionInsulin,i=e.outputRef;return r.a.createElement("div",{ref:i},""===t||null==t||t<=0?"":r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("div",{className:"space-around"},r.a.createElement("p",{className:"output"},"Hauptmahlzeit-KE : ",a," KE ",r.a.createElement("br",null),"Zwischenmahlzeit-KE : ",n," KE ",r.a.createElement("br",null),"Gesamt-KE: ",c," KE ",r.a.createElement("br",null),r.a.createElement("br",null),"Korrektur-Insulin: ",o," IE  ",r.a.createElement("br",null),r.a.createElement("span",{style:{fontWeight:"bold"}}," Gesamt-Insulin: ",t," IE ")))))}function E(e,t){var a="insulin-calculator-"+e,r=Object(n.useState)((function(){var e=localStorage.getItem(a);return null!=e?JSON.parse(e):"function"===typeof t?t():t})),c=Object(d.a)(r,2),o=c[0],i=c[1];return Object(n.useEffect)((function(){null!=o&&localStorage.setItem(a,JSON.stringify(o))}),[o]),[o,i]}var O="insulin-calculator-",P="";function y(){var e=E("dayTimeChoice","automatic"),t=Object(d.a)(e,2),a=t[0],c=t[1],o=E("lastSavedData",{foodItems:[]}),g=Object(d.a)(o,2),f=g[0],h=g[1],S=E("foodNameSuggestions-per100gSlide",[]),y=Object(d.a)(S,2),j=y[0],C=y[1],I=E("foodNameSuggestions-perPieceSlide",[]),N=Object(d.a)(I,2),k=N[0],F=N[1],K=Object(n.useState)(""),w=Object(d.a)(K,2),B=w[0],M=w[1],T=E("".concat(Se(),"-targetBloodSugar")),D=Object(d.a)(T,2),A=D[0],L=D[1],G=E("".concat(Se(),"-correctionFactor")),x=Object(d.a)(G,2),J=x[0],V=x[1],z=E("".concat(Se(),"-carbohydrateFactor")),R=Object(d.a)(z,2),U=R[0],Z=R[1],H=E("foodItems",[]),W=Object(d.a)(H,2),q=W[0],Q=W[1],X=Object(n.useState)(""),Y=Object(d.a)(X,2),$=Y[0],_=Y[1],ee=Object(n.useState)(""),te=Object(d.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)(""),ce=Object(d.a)(re,2),oe=ce[0],ie=ce[1],le=Object(n.useState)(""),ue=Object(d.a)(le,2),se=ue[0],de=ue[1],me=Object(n.useState)(""),ge=Object(d.a)(me,2),be=ge[0],fe=ge[1],he=Object(n.useRef)();function Se(){return"automatic"===a?Oe():a}function pe(){window.location.reload()}function ve(e,t){var a="".concat(e,t?"-per100gSlideName":"-perPieceSlideName"),n=document.getElementById(a).getBoundingClientRect().y,r=.45*window.innerHeight;m.animateScroll.scrollMore(n-r)}function Ee(e){return"string"!==typeof e?"":"".concat(e[0].toUpperCase()).concat(e.slice(1))}function Oe(){var e=(new Date).toLocaleTimeString().split(":"),t=Object(d.a)(e,2),a=t[0],n=t[1],r=je(a)+je(n)/60;return r<=11.5?"morning":r<=16?"midday":"evening"}function Pe(e){var t=e.target,a=t.name,n=t.value,r=e.target.id;if("string"===typeof r&&(r=je(r=r.split("-")[0])),"-"!==n[n.length-1]){var c=q.map((function(e){var t;if(r!==e.id)return e;if("name"===a){ve(r,!0);var c="".concat(O,"foodItem-").concat(n.toLowerCase(),"-carbohydratesPer100Grams"),o=localStorage.getItem(c);if(null!=o){var i,d=JSON.parse(o),m=Object(s.a)(Object(s.a)({},e.per100gSlide),{},(i={},Object(l.a)(i,a,n),Object(l.a)(i,"shouldDisplaySuggestions",!1),Object(l.a)(i,"carbohydratesPer100Grams",d),i));return Object(s.a)(Object(s.a)({},e),{},{per100gSlide:m})}}var g=""!==e.per100gSlide.name&&null!=e.per100gSlide.name&&"."!==e.per100gSlide.name[0];if("carbohydratesPer100Grams"===a&&g){var b="".concat(O,"foodItem-").concat(e.per100gSlide.name.toLowerCase(),"-carbohydratesPer100Grams"),f=Ee(e.per100gSlide.name.toLowerCase());""!==n?(localStorage.setItem(b,JSON.stringify(n)),function(e){var t=e;Array.isArray(e)||(t=[e]),0!==(t=t.filter((function(e){return!j.some((function(t){return e===t}))}))).length&&(t=[].concat(Object(u.a)(j),Object(u.a)(t)),C(t))}(f)):(localStorage.removeItem(b),function(e){for(var t,a=0;a<j.length;a++)if(e===j[a]){t=a;break}if(null!=t){var n=Object(u.a)(j);n.splice(t,1),C(n)}}(f))}var h="name"===a,S=Object(s.a)(Object(s.a)({},e.per100gSlide),{},(t={},Object(l.a)(t,a,n),Object(l.a)(t,"shouldDisplaySuggestions",h),t));return Object(s.a)(Object(s.a)({},e),{},{per100gSlide:S})}));Q(c)}}function ye(e){var t=e.target,a=t.name,n=t.value,r=e.target.id;if("string"===typeof r&&(r=je(r=r.split("-")[0])),"-"!==n[n.length-1]){var c=q.map((function(e){var t;if(r!==e.id)return e;if("name"===a){ve(r,!1);var c="".concat(O,"foodItem-").concat(n.toLowerCase(),"-carbohydratesPerPiece"),o=localStorage.getItem(c);if(null!=o){var i,d=JSON.parse(o),m=Object(s.a)(Object(s.a)({},e.perPieceSlide),{},(i={},Object(l.a)(i,a,n),Object(l.a)(i,"shouldDisplaySuggestions",!1),Object(l.a)(i,"carbohydratesPerPiece",d),i));return Object(s.a)(Object(s.a)({},e),{},{perPieceSlide:m})}}var g=""!==e.perPieceSlide.name&&null!=e.perPieceSlide.name&&"."!==e.perPieceSlide.name[0];if("carbohydratesPerPiece"===a&&g){var b="".concat(O,"foodItem-").concat(e.perPieceSlide.name.toLowerCase(),"-carbohydratesPerPiece"),f=Ee(e.perPieceSlide.name.toLowerCase());""!==n?(localStorage.setItem(b,JSON.stringify(n)),function(e){var t=e;Array.isArray(e)||(t=[e]),0!==(t=t.filter((function(e){return!k.some((function(t){return e===t}))}))).length&&(t=[].concat(Object(u.a)(k),Object(u.a)(t)),F(t))}(f)):(localStorage.removeItem(b),function(e){for(var t,a=0;a<k.length;a++)if(e===k[a]){t=a;break}if(null!=t){var n=Object(u.a)(k);n.splice(t,1),F(n)}}(f))}var h="name"===a,S=Object(s.a)(Object(s.a)({},e.perPieceSlide),{},(t={},Object(l.a)(t,a,n),Object(l.a)(t,"shouldDisplaySuggestions",h),t));return Object(s.a)(Object(s.a)({},e),{},{perPieceSlide:S})}));Q(c)}}function je(e){if("number"===typeof e)return e;if("string"!==typeof e)return-1;var t=e.slice();t=t.replace(",",".");var a=parseFloat(t);return Number.isNaN(a)?-1:a}return Object(n.useEffect)((function(){P=Oe(),setInterval((function(){P!==Oe()&&pe()}),6e4)}),[]),r.a.createElement("div",null,r.a.createElement("h1",null,"Insulin Rechner"),r.a.createElement("p",null,r.a.createElement("button",{className:"clear-data-button space-around",onClick:function(){Q([]),_(0)}},"Daten l\xf6schen"),r.a.createElement("button",{className:"load-data-button",onClick:function(){if(null!=f){var e=f.foodItems;Q(e)}}},"Daten laden")),r.a.createElement("hr",{className:"destop-hr new-section-hr"}),r.a.createElement(b,{setBloodSugar:M,setDayTimeChoice:c,setTargetBloodSugar:L,setCorrectionFactor:V,setCarbohydrateFactor:Z,bloodSugar:B,dayTimeChoice:a,targetBloodSugar:A,correctionFactor:J,carbohydrateFactor:U,refreshPage:pe}),r.a.createElement("hr",{className:"destop-hr new-section-hr"}),r.a.createElement(p,{foodItems:q,foodNameSuggestionsForPer100gSlide:j,foodNameSuggestionsForPerPieceSlide:k,addNewFoodItem:function(){var e=Math.random(),t=[].concat(Object(u.a)(q),[{key:Math.random(),id:e,isPer100gSlideActive:!0,per100gSlide:{name:"",grams:"",carbohydratesPer100Grams:"",KE:"",isIntermeal:!1,shouldDisplaySuggestions:!0},perPieceSlide:{name:"",numberOfPieces:"",carbohydratesPerPiece:"",KE:"",isIntermeal:!1,shouldDisplaySuggestions:!0}}]);Q(t),setTimeout((function(){m.animateScroll.scrollMore(255)}),100)},handleIsIntermealChange:function(e,t){var a=q.map((function(a){if(e===a.id){if(1===t){var n=Object(s.a)(Object(s.a)({},a.per100gSlide),{},{isIntermeal:!a.per100gSlide.isIntermeal});return Object(s.a)(Object(s.a)({},a),{},{per100gSlide:n})}var r=Object(s.a)(Object(s.a)({},a.perPieceSlide),{},{isIntermeal:!a.perPieceSlide.isIntermeal});return Object(s.a)(Object(s.a)({},a),{},{perPieceSlide:r})}return a}));Q(a)},handlePer100gSlideValueChange:Pe,handlePerPieceSlideValueChange:ye,deleteFoodItem:function(e){for(var t,a=0;a<q.length;a++)if(e===q[a].id){t=a;break}var n=Object(u.a)(q);n.splice(t,1),Q(n)},handleSuggestionClick:function(e,t,a){a?document.getElementById("".concat(t,"-grams")).focus():document.getElementById("".concat(t,"-numberOfPieces")).focus();var n={target:{name:"name",value:e,id:t}};a?Pe(n):ye(n)},handleSlideChange:function(e,t){var a=q.map((function(a){return e===a.id?Object(s.a)(Object(s.a)({},a),{},{isPer100gSlideActive:t}):a}));Q(a)},hideSuggestionList:function(e,t){var a=q.map((function(a){if(e===a.id){var n=Object(s.a)(Object(s.a)({},a.per100gSlide),{},{shouldDisplaySuggestions:!1}),r=Object(s.a)(Object(s.a)({},a.perPieceSlide),{},{shouldDisplaySuggestions:!1});return t?Object(s.a)(Object(s.a)({},a),{},{per100gSlide:n}):Object(s.a)(Object(s.a)({},a),{},{perPieceSlide:r})}return a}));Q(a)},scrollFoodItemUp:ve}),r.a.createElement("p",{style:{marginBottom:"20px"}},r.a.createElement("button",{className:"save-data-button space-around",onClick:function(){h({foodItems:q})}},"Daten speichen"),r.a.createElement("button",{className:"calculateIE-button",onClick:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a="ein oder mehrere Werte sind nicht g\xfcltig";function n(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.every((function(e){return-1!==je(e)}))}function r(e){if(e.isPer100gSlideActive){var r=e.per100gSlide.grams,c=e.per100gSlide.carbohydratesPer100Grams;return n(r,c)?je(r)*(je(c)/100)/10:(t&&alert(a),0)}var o=e.perPieceSlide.numberOfPieces,i=e.perPieceSlide.carbohydratesPerPiece;return n(o,i)?je(o)*je(i)/10:(t&&alert(a),0)}function c(e,r,c){return n(e,r,c)?(je(e)-je(r))/je(c):(""!==e&&t&&alert(a),0)}var o=c(B,A,J);ie(Math.round(10*o)/10);var l,u=0,d=0,g=[],b=Object(i.a)(q);try{for(b.s();!(l=b.n()).done;){var f=l.value,h=r(f);u+=h,g.push(h),f.isPer100gSlideActive?d+=f.per100gSlide.isIntermeal?h:0:d+=f.perPieceSlide.isIntermeal?h:0}}catch(v){b.e(v)}finally{b.f()}ne(Math.round(10*u)/10),de(Math.round(10*d)/10),fe(Math.round(10*(u-d))/10);var S=q.map((function(e,t){var a=Math.round(10*g[t])/10;return e.isPer100gSlideActive?Object(s.a)(Object(s.a)({},e),{},{per100gSlide:Object(s.a)(Object(s.a)({},e.per100gSlide),{},{KE:a})}):Object(s.a)(Object(s.a)({},e),{},{perPieceSlide:Object(s.a)(Object(s.a)({},e.perPieceSlide),{},{KE:a})})}));if(Q(S),!n(U))return t&&alert(a),-1;var p=u*je(U);p+=o,p=Math.round(10*p)/10,_(p),e&&setTimeout((function(){m.animateScroll.scrollToBottom()}),5)}},"Berechne IE")),r.a.createElement(v,{totalIE:$,totalMainMealKE:be,totalIntermealKE:se,totalKE:ae,totalCorrectionInsulin:oe,outputRef:he}))}o.a.render(r.a.createElement(y,null),document.getElementById("root"))},5:function(e,t,a){}},[[36,1,2]]]);
//# sourceMappingURL=main.7ab96b17.chunk.js.map