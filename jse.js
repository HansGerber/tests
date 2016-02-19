/*
 *
 *	JSE v0.1
 *
 *	#
 *	# direct onpage html editor
 *	#
 *
 *
 */

(function(d, id, styleFileBase){

	var chElems = d.getElementById(id).getElementsByTagName("*");
	var chElemLen = chElems.length;
	var jseCss = d.createElement("link");
	jseCss.setAttribute("rel", "stylesheet");
	jseCss.setAttribute("type", "text/css");
	jseCss.setAttribute("href", styleFileBase + "jse.css");
	d.getElementsByTagName("head")[0].appendChild(jseCss);
	for(var i = 0;i<chElemLen;i++){
		chElemLen = chElems.length;
		if(!chElems[i].className.match(/^jse-edit-/)){
			var editPannel = d.createElement("div");
			editPannel.setAttribute("class", "jse-edit-panel");
			var ePTitle = chElems[i].tagName.toLowerCase();
			if(chElems[i].className && chElems[i].className.replace(" ", "").length > 0){
				ePTitle += "." + chElems[i].className;
			}
			if(chElems[i].id && chElems[i].id.replace(" ", "").length > 0){
				ePTitle += "#" + chElems[i].id;
			}
			editPannel.setAttribute("title", ePTitle);
			var editButton = d.createElement("button");
			editButton.className = "jse-edit-button";
			editButton.innerHTML = "edit";
			editButton.onclick = function(event) {
				if(event){
					event.preventDefault();
				}
				var _elem = this.parentNode.parentNode;
				if(_elem.className.match(/jse-edit-activeElem/)){
					_elem.className = _elem.className.replace(" jse-edit-activeElem", "");
				} else {
					_elem.className += " jse-edit-activeElem";
				}
			}
			editPannel.appendChild(editButton);
			
			if(chElems[i].getElementsByTagName("*").length > 0){
				chElems[i].insertBefore(editPannel, chElems[i].firstChild);
			} else {
				chElems[i].appendChild(editPannel);
			}
		}
	}

})(document, "jse-container", "");