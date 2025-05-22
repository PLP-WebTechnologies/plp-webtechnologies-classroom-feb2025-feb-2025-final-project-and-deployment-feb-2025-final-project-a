const slider = document.getElementById("ratingrange");
const slidervalue = document.getElementById("rate");

slider.addEventListener('input', function (){
      slidervalue.textContent = slider.value;
});

