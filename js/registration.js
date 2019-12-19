
console.log("We are here")

document.getElementById('buttonTrig').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});


document.getElementById('buttonReg').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});


document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});