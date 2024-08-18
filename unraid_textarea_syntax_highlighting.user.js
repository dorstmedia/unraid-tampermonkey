// ==UserScript==
// @name         unraid_textarea_syntax_highlighting
// @namespace    https://github.com/dorstmedia/unraid-tampermonkey
// @version      1.0.0.0
// @description  
// @match        *://unraid-nuc.local/*
// @match        *://unraid-itx.local/*
// @match        *://unraid-xeon.local/*
// @match        *://unraid-epyc.local/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM.xmlHttpRequest
// @connect      github.com
// @downloadURL  https://raw.githubusercontent.com/dorstmedia/unraid-tampermonkey/master/unraid_textarea_syntax_highlighting.user.js
// @updateURL    https://raw.githubusercontent.com/dorstmedia/unraid-tampermonkey/master/unraid_textarea_syntax_highlighting.user.js
// @run-at       document-end
// ==/UserScript==
(function() {
  'use strict';
  //http://unraid-nuc.local/plugins/user.scripts/javascript/ace/theme-tomorrow_night.js  
  //http://unraid-nuc.local/plugins/user.scripts/javascript/ace/mode-sh.js  
  //http://unraid-nuc.local/plugins/user.scripts/javascript/ace/ace.js 

  // Hook up ACE editor to all textareas with data-editor attribute
  /*
  jQuery.loadScript = function (url, callback) {
      jQuery.ajax({
          url: url,
          dataType: 'script',
          success: callback,
          async: true
      });
  }  
  if (typeof someObject == 'undefined') $.loadScript('url_to_someScript.js', function(){
      //Stuff to do after someScript has loaded
  });  
  jQuery.pluginSafe = function (name, url, callback) { 
  	if(jQuery[name]){ 
  		callback;
  	} else { 
  		jQuery.ajax({
          url: url,
          dataType: 'script',
          success: callback,
          async: true
      });
    }
  }
  */
  var loadJS = function(url, location, implementationCode){
      //url is URL of external file, implementationCode is the code
      //to be called from the file, location is the location to 
      //insert the <script> element
  
      var scriptTag = document.createElement('script');
      scriptTag.src = url;
      scriptTag.onload = implementationCode;
      scriptTag.onreadystatechange = implementationCode;
      location.appendChild(scriptTag);
  };  
  var aceInit = function(){
  	var aceTheme="ace\/theme\/tomorrow_night";
    $('textarea').each(function() {
      var textarea = $(this);
      if(
      	textarea.hasClass("data-editor") || 
      	textarea.hasClass("highlight-code") || 
      	textarea.hasClass("code") ||
      	textarea.hasClass("ace") || 
      	textarea.height() > 200
      ){
  	    var mode = textarea.data('editor');
  	    var editDiv = $('<div>', {
  	      position: 'absolute',
  	      width: textarea.width(),
  	      height: textarea.height(),
  	      'class': textarea.attr('class')
  	    }).insertBefore(textarea);
  	    textarea.css('display', 'none');
  	    var editor = ace.edit(editDiv[0]);
  	 //   editor.renderer.setShowGutter(textarea.data('gutter'));
  	    editor.getSession().setValue(textarea.val());
  	    editor.getSession().setMode("ace/mode/" + mode);
  	//    editor.setTheme("ace/theme/idle_fingers");
  	    editor.setTheme(aceTheme);
  	    editor.setShowPrintMargin(false);  	
  	/*  
  	    editor.setOptions({
  		     enableLiveAutocompletion: true,
  		     enableSnippets: true
  		  });
  	 */   
  	    // copy back to textarea on form submit...
  	    textarea.closest('form').submit(function() {
  	      textarea.val(editor.getSession().getValue());
  	    })
      }
    });
  }
  /*
  loadUrls=[
  	"https://my.living-apps.de/static/ace-builds/1.4.14/src/ace.js",
  	"https://my.living-apps.de/static/ace-builds/1.4.14/src/ext-language_tools.js"	
  ]
  */
  loadUrls=[
  	"/plugins/user.scripts/javascript/ace/ace.js",
  	"/plugins/user.scripts/javascript/ace/ext-language_tools.js"	
  ]
  $(function() {
  	if(typeof ace == 'undefined' || typeof ace.version != 'string'){
  		loarUrls="/plugins/user.scripts/javascript/ace/ace.js"
  		//loarUrl="https://my.living-apps.de/static/ace-builds/1.4.14/src/ace.js"
  	
  		loadJS(loadUrls[0], document.body,function(){
  			loadJS(loadUrls[1], document.body,function(){
  				aceInit();
  			});
  		});
  	}  	
  	/*
  	// AYS jquery 
  	loadJS(
  		"https://raw.githubusercontent.com/codedance/jquery.AreYouSure/master/jquery.are-you-sure.js",
  		 document.body,function(){  		 	
  		 }
  	);
  	*/
  	/*
  	// AYS jquery 
  	loadJS(
  		"https://raw.githubusercontent.com/codedance/jquery.AreYouSure/master/jquery.are-you-sure.js",
  		 document.body,function(){  		 	
  		 }
  	);
  	*/  
  })  
  //var aceTheme=<?php echo (in_array($theme,['black','gray']) ? json_encode('ace/theme/tomorrow_night') : json_encode('ace/theme/tomorrow')); ?>;
  /*
  $(function() {
    var editor = ace.edit("itemEditor");
    editor.setTheme(aceTheme);
    editor.setShowPrintMargin(false);
  })  
  $(function() {
  });
  <p><script src="/plugins/user.scripts/javascript/ace/ace.js" type= "text/javascript"></script></p>
  var aceTheme="ace\/theme\/tomorrow_night";
  $(function() {
    var editor = ace.edit("itemEditor");
    editor.setTheme(aceTheme);
    editor.setShowPrintMargin(false);
  })
  $("textarea.highlight-code").each(function(){
  	
  })
  function editScript(myID) {
    var origID = myID;
    $("#"+myID).tooltipster("close");
    var script = $("#"+myID).attr("data-scriptname");
    $.post(caURL,{action:'getScript',script:script},function(data) {
      if (data) {
        $("#editScriptName").html(script);
        var editor = ace.edit("itemEditor");
        editor.getSession().setValue(data);
        editor.getSession().setMode(getModeForShebang(data));
        $(".editing").show();
              window.scrollTo(0, 0);
      }
    });
  } 
  function cancelEdit() {
    $(".editing").hide();
  }
  function saveEdit() {
    var script = $("#editScriptName").html();
    var editor = ace.edit("itemEditor");
    var scriptContents = editor.getValue();
    $.post(caURL,{action:'saveScript',script:script,scriptContents:scriptContents},function(data) {
      if (data) {
        $(".editing").hide();
      }
    }); 
  }
  <div id='itemEditor' style='width:90%; height:500px; position: relative;'></div>
  */
});
