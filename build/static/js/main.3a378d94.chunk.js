(this["webpackJsonpinsulin-calculator"]=this["webpackJsonpinsulin-calculator"]||[]).push([[0],{11:function(e,t,a){e.exports=a(16)},16:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),l=a.n(o),c=a(10),u=a(5),i=a(2),m=a(7),s=a(1);a(3);function d(e){var t=e.id,a=e.name,n=void 0===a?"":a,o=e.value,l=void 0===o?"":o,c=e.onChange,u=void 0===c?"":c,i=e.description,m=void 0===i?"":i,s=e.placeholder,d=void 0===s?"":s,g=e.unit,h=void 0===g?"":g;return r.a.createElement("div",null,r.a.createElement("label",null,m),r.a.createElement("br",null),r.a.createElement("input",{id:t,name:n,placeholder:d,value:l,onChange:""===u?function(){return 0}:function(e){return u(e)}}),r.a.createElement("label",null,h))}function g(e){var t=e.setBloodSugar,a=e.setTargetBloodSugar,n=e.setCorrectionFactor,o=e.setCarbohydrateFactor,l=e.bloodSugar,c=e.targetBloodSugar,u=e.correctionFactor,i=e.carbohydrateFactor;return r.a.createElement("div",null,r.a.createElement(d,{name:"BloodSugar",value:l.toString(),description:"Blutzucker",unit:"mg/dl",onChange:function(e){return t(e.target.value)}}),r.a.createElement(d,{name:"TargetBloodSugar",value:c,description:"Blutzucker Zielwert",unit:"mg/dl",onChange:function(e){return a(e.target.value)}}),r.a.createElement(d,{name:"CorrectionFactor",value:u,description:"Korrektur-Faktor",unit:"mg/dl",onChange:function(e){return n(e.target.value)}}),r.a.createElement(d,{name:"CarbohydrateFactor",value:i,description:"KE-Faktor",onChange:function(e){return o(e.target.value)}}))}function h(e){var t=e.suggestionText,a=e.handleSuggestionClick;return r.a.createElement("li",{onClick:function(){return a(t)}},t)}function b(e){var t=e.allSuggestions,a=e.searchingText,n=e.handleSuggestionClick;return r.a.createElement("div",null,""!==a&&r.a.createElement("ul",null,t.filter((function(e){return e.slice(0,a.length)===a.toLowerCase()})).map((function(e){return r.a.createElement(h,{key:Math.random(),suggestionText:e,handleSuggestionClick:n})}))))}function f(e){var t=e.id,a=e.name,n=void 0===a?"":a,o=e.grams,l=void 0===o?"":o,c=e.carbohydratesPer100Grams,u=void 0===c?"":c,i=e.isIntermeal,m=void 0!==i&&i,s=e.handleIsIntermealChange,g=e.handleChange,h=e.deleteFoodItem,f=e.suggestions,v=void 0!==f&&f,E=e.handleSuggestionClick;return r.a.createElement("div",null,r.a.createElement("button",{className:"delete-food-item-button",onClick:function(){return h(t)}}),r.a.createElement("label",{className:"intermeal-checkbox"},r.a.createElement("input",{type:"checkbox",checked:m,onChange:function(){return s(t)}})," ZM?"),r.a.createElement(d,{id:t,name:"name",description:"Name",value:n,onChange:function(e){return g(e)}}),v&&r.a.createElement(b,{allSuggestions:["banane","bambus","br\xf6tchen","apfel","ananas"],searchingText:n,handleSuggestionClick:function(e){return E(e,t)}}),r.a.createElement(d,{id:t,name:"grams",description:"Gramm",value:l,onChange:function(e){return g(e)}}),r.a.createElement(d,{id:t,name:"carbohydratesPer100Grams",description:"Kohlenhydrate pro 100g",value:u,onChange:function(e){return g(e)}}),r.a.createElement("hr",null))}function v(e){var t=e.foodItems,a=void 0===t?[]:t,n=e.addNewFoodItem,o=e.handleIsIntermealChange,l=e.handleChange,c=e.deleteFoodItem,u=e.handleSuggestionClick;return r.a.createElement("div",null,r.a.createElement("h3",null,"Elemente"),a.map((function(e){return r.a.createElement(f,{key:e.key,id:e.id,name:e.name,grams:e.grams,carbohydratesPer100Grams:e.carbohydratesPer100Grams,isIntermeal:e.isIntermeal,handleIsIntermealChange:o,handleChange:l,deleteFoodItem:c,handleSuggestionClick:u})})),r.a.createElement("p",null,r.a.createElement("button",{className:"add-new-food-item-button",onClick:function(){return n()}})))}function E(e){var t=e.totalIE,a=e.totalMainMealKE,n=e.totalIntermealKE,o=e.totalKE,l=e.totalCorrectionInsulin,c=e.outputRef;return r.a.createElement("div",{ref:c},""===t||void 0==t||t<=0?"":r.a.createElement("p",{className:"output"},"Hauptmahlzeit-KE : ",a," KE ",r.a.createElement("br",null),"Zwischenmahlzeit-KE : ",n," KE ",r.a.createElement("br",null),"Gesamt-KE: ",o," KE ",r.a.createElement("br",null),r.a.createElement("br",null),"Korrektur-Insulin: ",l," IE  ",r.a.createElement("br",null),"Gesamt-Insulin: ",t," IE"))}function I(e,t){var a="insulin-calculator-"+e,r=Object(n.useState)((function(){var e=localStorage.getItem(a);return null!=e?JSON.parse(e):"function"===typeof t?t():t})),o=Object(s.a)(r,2),l=o[0],c=o[1];return Object(n.useEffect)((function(){null!=l&&localStorage.setItem(a,JSON.stringify(l))}),[a,l]),[l,c]}function C(){var e=I("lastSavedData"),t=Object(s.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)(""),d=Object(s.a)(l,2),h=d[0],b=d[1],f=I("".concat(ae(),"-targetBloodSugar")),C=Object(s.a)(f,2),S=C[0],p=C[1],O=I("".concat(ae(),"-correctionFactor")),j=Object(s.a)(O,2),k=j[0],y=j[1],F=I("".concat(ae(),"-carbohydrateFactor")),N=Object(s.a)(F,2),K=N[0],w=N[1],G=Object(n.useState)([]),M=Object(s.a)(G,2),B=M[0],P=M[1],T=Object(n.useState)(""),x=Object(s.a)(T,2),J=x[0],z=x[1],D=Object(n.useState)(""),L=Object(s.a)(D,2),R=L[0],Z=L[1],A=Object(n.useState)(""),H=Object(s.a)(A,2),V=H[0],W=H[1],q=Object(n.useState)(""),Q=Object(s.a)(q,2),U=Q[0],X=Q[1],Y=Object(n.useState)(""),$=Object(s.a)(Y,2),_=$[0],ee=$[1],te=Object(n.useRef)();function ae(){var e=(new Date).toLocaleTimeString().split(":"),t=Object(s.a)(e,2),a=t[0]+t[1]/60;return a<=11.5?"morning":a<=16?"midday":"evening"}function ne(e){var t=e.target,a=t.name,n=t.value,r=t.id,o=B.map((function(e){if(r==e.id){if("name"===a){var t="".concat("insulin-calculator-","foodItem-").concat(n.toLowerCase(),"-carbohydratesPer100Grams"),o=localStorage.getItem(t);if(null!=o){var l,c=JSON.parse(o);return Object(i.a)(Object(i.a)({},e),{},(l={},Object(u.a)(l,a,n),Object(u.a)(l,"carbohydratesPer100Grams",c),l))}}if("carbohydratesPer100Grams"===a&&""!==e.name&&"."!==e.name[0]){var m="".concat("insulin-calculator-","foodItem-").concat(e.name.toLowerCase(),"-carbohydratesPer100Grams");""!==n?localStorage.setItem(m,JSON.stringify(n)):localStorage.removeItem(m)}return Object(i.a)(Object(i.a)({},e),{},Object(u.a)({},a,n))}return e}));P(o)}function re(){var e="ein oder mehrere Werte sind nicht g\xfcltig";function t(e){var t=e.slice();t=t.replace(",",".");var a=parseFloat(t);return Number.isNaN(a)?-1:a}function a(){for(var e=arguments.length,a=new Array(e),n=0;n<e;n++)a[n]=arguments[n];for(var r=0,o=a;r<o.length;r++){var l=o[r];if(-1===t(l))return!1}return!0}function n(n){return a(n.grams,n.carbohydratesPer100Grams)?t(n.grams)*(t(n.carbohydratesPer100Grams)/100)/10:(alert(e),0)}var r=function(n,r,o){return a(n,r,o)?(t(n)-t(r))/t(o):(""!==n&&alert(e),0)}(h,S,k);W(Math.round(10*r)/10);var o,l=0,u=0,i=Object(c.a)(B);try{for(i.s();!(o=i.n()).done;){var m=o.value;l+=n(m),u+=m.isIntermeal?n(m):0}}catch(d){i.e(d)}finally{i.f()}if(Z(Math.round(10*l)/10),X(Math.round(10*u)/10),ee(Math.round(10*(l-u))/10),!a(K))return alert(e),-1;var s=l*t(K);s+=r,s=Math.round(10*s)/10,z(s),te.current.scrollIntoView({smooth:!0})}return r.a.createElement("div",null,r.a.createElement("h1",null,"Insulin Rechner"),r.a.createElement("p",null,r.a.createElement("button",{className:"load-data-button",onClick:function(){if(null!=a){var e=a.foodItems;P(e),re()}}},"Daten laden"),r.a.createElement("button",{className:"save-data-button",onClick:function(){o({foodItems:B})}},"Daten speichen")),r.a.createElement(g,{setBloodSugar:b,setTargetBloodSugar:p,setCorrectionFactor:y,setCarbohydrateFactor:w,bloodSugar:h,targetBloodSugar:S,correctionFactor:k,carbohydrateFactor:K}),r.a.createElement(v,{foodItems:B,addNewFoodItem:function(){var e=[].concat(Object(m.a)(B),[{key:Math.random(),id:Math.random(),isIntermeal:!1}]);P(e)},handleIsIntermealChange:function(e){var t=B.map((function(t){return e==t.id?Object(i.a)(Object(i.a)({},t),{},{isIntermeal:!t.isIntermeal}):t}));P(t)},handleChange:ne,deleteFoodItem:function(e){for(var t,a=0;a<B.length;a++)if(e==B[a].id){t=a;break}var n=Object(m.a)(B);n.splice(t,1),P(n)},handleSuggestionClick:function(e,t){ne({target:{name:"name",value:e,id:t}})}}),r.a.createElement("button",{className:"calculateIE-button",onClick:re},"berechne IE"),r.a.createElement(E,{totalIE:J,totalMainMealKE:_,totalIntermealKE:U,totalKE:R,totalCorrectionInsulin:V,outputRef:te}))}l.a.render(r.a.createElement(C,null),document.getElementById("root"))},3:function(e,t,a){}},[[11,1,2]]]);
//# sourceMappingURL=main.3a378d94.chunk.js.map