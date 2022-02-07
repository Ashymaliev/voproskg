// text
txt = "Здравствуйте пишу вам по гражданскому иску";

//shared array
var instructions = [];

// typeWriter
var i = 0; //
var j = 0;
var elem = "";
var elem_value = "";
var speed = 100;

var new_date = 0;
function typeWriter() {
  if (j < instructions.length) {
    if (typeof instructions[j][1] == "string") {
      if (i < txt.length) {
        instructions[j][0].innerHTML += instructions[j][1].charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        j = j + 1;
        i = 0;
        setTimeout(typeWriter, speed);
      }
    } else if (typeof instructions[j][1] == "object") {
      instructions[j][0].appendChild(instructions[j][1]);
      j = j + 1;
      i = 0;
      typeWriter();
    }
  }
}
//

// recreateNode
parser = new DOMParser();

function recreateNode(list, container) {
  doc = parser.parseFromString(list, "text/html");
  doc.body.childNodes.forEach(function (a) {
    if (a.nodeName == "#text") {
      instructions.push([container, a.nodeValue]);
    } else {
      // if there is element to create
      b = a.cloneNode(true); // handle deep elements
      c = a.cloneNode(false); // this way I can get ONLY the element with attributes and classes // I append only element

      /* container.appendChild(c) */ instructions.push([container, c]);
      recreateNode(b.innerHTML, c); // b will be appended to c
    }
  });
}

jQuery(function($){
   $.mask.definitions["9"] = false;
   $.mask.definitions["5"] = "[0-9]";
   $(".phone").mask("+(996) 555 555 555");
});

// init

parent = document.getElementById("content_html");
recreateNode(txt, parent);
typeWriter();

(function stepsControl() {
  const stepLabels = document.querySelectorAll(".steps li");

  const steps = document.querySelectorAll(".controls");
  const formMessage = document.querySelector("#form_message");

  document.querySelector(".first-step-button").addEventListener("click", () => {
    if (formMessage.value.length < 10) {
      document
        .querySelector(".help-block.with-errors")
        .append("Слишком короткое сообщение, минимум 10 символов!");
      return;
    }
    document.querySelector(".help-block.with-errors").innerHTML = "";
    steps.forEach((step) => {
      step.classList.remove("active");
    });
    stepLabels.forEach((label) => {
      label.classList.remove("active");
    });
    document.querySelector("#step2").classList.add("active");
    stepLabels[1].classList.add("active");
  });

  document.querySelectorAll(".second-step-button").forEach((button) => {
    button.addEventListener("click", () => {
      steps.forEach((step) => {
        step.classList.remove("active");
      });
      document.querySelector("#step3").classList.add("active");
    });
  });

  document.querySelectorAll(".five-step-button").forEach((button) => {
    button.addEventListener("click", () => {
      steps.forEach((step) => {
        step.classList.remove("active");
      });
      document.querySelector("#step5").classList.add("active");
    });
  });

  document.querySelector(".third-step-button").addEventListener("click", () => {
    steps.forEach((step) => {
      step.classList.remove("active");
    });
    document.querySelector("#step4").classList.add("active");
  });
})();













