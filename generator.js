document.getElementById('generate').addEventListener('click',Generate);
document.getElementById('copy').addEventListener('click',Copy);

function Generate(){
	var randomstring = (Math.random() * 1000).toString(36);
	document.getElementById('output').value = randomstring;
}


function Copy() {
  /* Get the text field */
  var copyText = document.getElementById("output");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  
} 