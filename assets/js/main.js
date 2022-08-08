// Header Function
const stylesheet = document.styleSheets[0];
autoColor();
headerSelect();
backgroundChanger();
loadSection();
portfolioChanger();

//*****************************//
//          Functions          //
//*****************************//

//Color Changer Auto
function autoColor() {
  let colors = [
    "0,150,136",
    "244,67,54",
    "156,39,176",
    "33,150,243",
    "63,81,181",
  ];
  let randomColor = Math.floor(Math.random() * colors.length);
  let mainColor;
  for (let i = 0; i < stylesheet.cssRules.length; i++) {
    if (stylesheet.cssRules[i].selectorText === ":root") {
      mainColor = stylesheet.cssRules[i];
    }
  }
  mainColor.style.setProperty("--mainColor", `${colors[randomColor]}`);
}
// Section Selector
function headerSelect() {
  let links = document.querySelectorAll("header .header .links ul li"),
    linksArray = Array.from(links),
    menuSpan = document.querySelector("span.menu i"),
    ulLinks = document.querySelector("header .header .links");
  linksArray.forEach((ele) => {
    if (location.href.match(/#\w+/)) {
      ele.classList.remove("active");
      document
        .querySelector(`[data-select~="${location.href.match(/#\w+/)}"]`)
        .classList.add("active");
    }
    ele.addEventListener("click", function (e) {
      linksArray.forEach((ele) => {
        ele.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      if (menuSpan.classList.contains("fa-x")) {
        menuSpan.classList.replace("fa-x", "fa-bars");
        ulLinks.classList.add("hidden");
      }
    });
  });
  menuSpan.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("fa-bars-staggered")) {
      e.currentTarget.classList.replace("fa-bars-staggered", "fa-x");
      ulLinks.classList.remove("hidden");
    } else if (e.currentTarget.classList.contains("fa-x")) {
      e.currentTarget.classList.replace("fa-x", "fa-bars-staggered");
      ulLinks.classList.add("hidden");
    }
  });
  menuSpan.addEventListener("mouseover", (e) => {
    if (e.currentTarget.classList.contains("fa-bars")) {
      e.currentTarget.classList.replace("fa-bars", "fa-bars-staggered");
    }
  });
  menuSpan.addEventListener(
    "mouseout",
    (e) => {
      if (e.currentTarget.classList.contains("fa-bars-staggered")) {
        e.currentTarget.classList.replace("fa-bars-staggered", "fa-bars");
      }
    },
    false
  );
}
// Landing Bacground Changer
function backgroundChanger() {
  setInterval(() => {
    let backgrounds = ["landing01.webp", "landing02.webp", "landing03.webp"];
    let randomNumber = Math.floor(Math.random() * backgrounds.length);
    let landingRules;
    for (let i = 0; i < stylesheet.cssRules.length; i++) {
      if (stylesheet.cssRules[i].selectorText === "#home .landing") {
        landingRules = stylesheet.cssRules[i];
      }
    }

    // modifying the rule in the stylesheet
    landingRules.style.setProperty(
      "background-image",
      `url(../images/${backgrounds[randomNumber]})`
    );
  }, 5000);
}
//Sections Load
function loadSection() {
  let skillsSec = document.querySelector("#myskills");
  let section = document.querySelectorAll(".main");

  window.onscroll = () => {
    let windowHeight = this.innerHeight;
    //console.log(windowHeight); //3720
    let windowScrollTop = this.scrollY;
    //console.log(windowScrollTop); //930
    section.forEach((e) => {
      let secOffsetTopa = e.offsetTop;
      //console.log(secOffsetTopa); //3720
      let secOuterHeighta = e.offsetHeight;
      //console.log(secOuterHeighta); //930
      if (
        windowScrollTop + 450 >
        secOuterHeighta + secOffsetTopa - windowHeight
      ) {
        e.classList.replace("main", "show");
      }
    });

    let skillsSecOffsetTop = skillsSec.offsetTop;
    let skillsSecOuterHeight = skillsSec.offsetHeight;
    let progressRulesI, progressRulesB, progressRulesM;
    for (
      let i = 0, b = 0, m = -0;
      i < stylesheet.cssRules.length;
      i++, b++, m++
    ) {
      if (
        stylesheet.cssRules[i].selectorText ===
        ".skill:nth-child(1) .skillprogress span"
      ) {
        progressRulesI = stylesheet.cssRules[i];
      }
      if (
        stylesheet.cssRules[b].selectorText ===
        ".skill:nth-child(2) .skillprogress span"
      ) {
        progressRulesB = stylesheet.cssRules[b];
      }
      if (
        stylesheet.cssRules[m].selectorText ===
        ".skill:nth-child(3) .skillprogress span"
      ) {
        progressRulesM = stylesheet.cssRules[m];
      }
    }
    setTimeout(() => {
      if (
        windowScrollTop + 250 >=
        skillsSecOffsetTop + skillsSecOuterHeight - windowHeight
      ) {
        let progressSkillHTML = document.querySelector(
          ".skill:nth-child(1) .skillprogress span"
        );
        let progressSkillCSS = document.querySelector(
          ".skill:nth-child(2) .skillprogress span"
        );
        let progressSkillJS = document.querySelector(
          ".skill:nth-child(3) .skillprogress span"
        );
        progressSkillHTML.textContent = progressSkillHTML.dataset.progress;
        progressSkillCSS.textContent = progressSkillCSS.dataset.progress;
        progressSkillJS.textContent = progressSkillJS.dataset.progress;
        progressRulesI.style.setProperty(
          "width",
          progressSkillHTML.dataset.progress
        );
        progressRulesB.style.setProperty(
          "width",
          progressSkillCSS.dataset.progress
        );
        progressRulesM.style.setProperty(
          "width",
          progressSkillJS.dataset.progress
        );
      }
    }, 550);
  };
}
// Portfolio Change
function portfolioChanger() {
  let works = document.querySelectorAll(".work"),
    buttonLeft = document.querySelector(".left"),
    buttonRight = document.querySelector(".right"),
    points = document.querySelector(".points"),
    worksArray = [...works],
    index = Math.floor(Math.random() * worksArray.length),
    workName = document.querySelector(
      ".portfolio .works .work .caption h4"
    ).textContent,
    contentAfter;
  worksArray[index].classList.add("showed", "op");
  for (let i = 0; i < stylesheet.cssRules.length; i++) {
    if (
      stylesheet.cssRules[i].selectorText === ".portfolio .works .work::after"
    ) {
      contentAfter = stylesheet.cssRules[i];
    }
  }
  for (i = 0; i < worksArray.length; i++) {
    let point = document.createElement("div");
    point.className = "point";
    points.appendChild(point);
  }
  let point = document.querySelectorAll(".point"),
    pointArray = [...point],
    newIndex;
  point[index].classList.add("active");
  if (index < worksArray.length - 1) {
    pointArray.forEach((ele, ind) => {
      ele.addEventListener("click", (e) => {
        newIndex = ind;
        if (newIndex > index) {
          pointArray.map((Element, ind) => {
            Element.classList.remove("active");
            worksArray[ind].classList.replace("op", "h-l");
            setTimeout(() => {
              worksArray[ind].classList.remove("showed");
              setTimeout(() => {
                worksArray[ind].classList.remove("h-l");
              }, 50);
            }, 250);
          });
          e.target.classList.add("active");
          worksArray[ind].classList.add("s-l");
          setTimeout(() => {
            worksArray[ind].classList.add("showed");
            setTimeout(() => {
              contentAfter.style.setProperty("content", `"${workName}"`);
              worksArray[ind].classList.add("op");
              worksArray[ind].classList.remove("s-l");
            }, 50);
          }, 250);
          index = ind;
        } else if (newIndex < index) {
          pointArray.map((Element, ind) => {
            Element.classList.remove("active");
            worksArray[ind].classList.replace("op", "h-r");
            setTimeout(() => {
              worksArray[ind].classList.remove("showed");
              setTimeout(() => {
                worksArray[ind].classList.remove("h-r");
              }, 50);
            }, 250);
          });
          e.target.classList.add("active");
          worksArray[ind].classList.add("s-r");
          setTimeout(() => {
            worksArray[ind].classList.add("showed");
            setTimeout(() => {
              contentAfter.style.setProperty("content", `"${workName}"`);
              worksArray[ind].classList.add("op");
              worksArray[ind].classList.remove("s-r");
            }, 50);
          }, 250);
          index = ind;
        }
      });
    });
  }
  contentAfter.style.setProperty("content", `"${workName}"`);
  buttonRight.onclick = () => {
    if (index < worksArray.length - 1) {
      buttonRight.setAttribute("disabled", "");
      worksArray[index].classList.replace("op", "h-l");
      index++;
      worksArray[index].classList.add("s-l");
      setTimeout(() => {
        worksArray[index].classList.add("showed");
        setTimeout(() => {
          worksArray[index].classList.add("op");
          worksArray[index].classList.remove("s-l");
          point[index].classList.add("active");
          contentAfter.style.setProperty("content", `"${workName}"`);
          buttonRight.removeAttribute("disabled");
        }, 50);
        worksArray[index - 1].classList.remove("showed", "h-l");
        point[index - 1].classList.remove("active");
      }, 250);
    } else if ((index = worksArray.length - 1)) {
      buttonRight.setAttribute("disabled", "");
      worksArray[index].classList.replace("op", "h-l");
      index = 0;
      worksArray[index].classList.add("s-l");
      setTimeout(() => {
        worksArray[index].classList.add("showed");
        setTimeout(() => {
          worksArray[index].classList.add("op");
          worksArray[index].classList.remove("s-l");
          point[index].classList.add("active");
          contentAfter.style.setProperty("content", `"${workName}"`);
          buttonRight.removeAttribute("disabled");
        }, 50);
        worksArray[worksArray.length - 1].classList.remove("showed", "h-l");
        point[worksArray.length - 1].classList.remove("active");
      }, 250);
    }
  };
  buttonLeft.onclick = () => {
    contentAfter.style.setProperty("content", `"${workName}"`);
    if (index != 0) {
      buttonLeft.setAttribute("disabled", "");
      worksArray[index].classList.replace("op", "h-r");
      index--;
      worksArray[index].classList.add("s-r");
      setTimeout(() => {
        worksArray[index].classList.add("showed");
        setTimeout(() => {
          worksArray[index].classList.add("op");
          worksArray[index].classList.remove("s-r");
          point[index].classList.add("active");
          contentAfter.style.setProperty("content", `"${workName}"`);
          buttonLeft.removeAttribute("disabled");
        }, 50);
        worksArray[index + 1].classList.remove("showed", "h-r");
        point[index + 1].classList.remove("active");
      }, 250);
    } else if (index === 0) {
      buttonLeft.setAttribute("disabled", "");
      worksArray[index].classList.replace("op", "h-r");
      index = worksArray.length - 1;
      worksArray[index].classList.add("s-r");
      setTimeout(() => {
        worksArray[index].classList.add("showed");
        setTimeout(() => {
          worksArray[index].classList.add("op");
          worksArray[index].classList.remove("s-r");
          point[index].classList.add("active");
          contentAfter.style.setProperty("content", `"${workName}"`);
          buttonLeft.removeAttribute("disabled");
        }, 50);
        worksArray[0].classList.remove("showed", "h-r");
        point[0].classList.remove("active");
      }, 250);
    }
  };
}
