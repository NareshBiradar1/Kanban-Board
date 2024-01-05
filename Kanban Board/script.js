let mainBody = document.querySelector(".main-cont");

let add = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");

let addTask = document.querySelector(".modal-cont");
let addModal = true;
let textArea = document.querySelector(".textarea-cont");
let isDeleteActive = false;

let allFilterColor = document.querySelector(".toolbox-priority-cont");
let allTasks=[];

function loadDataFromLocalStorage(){
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(savedTasks);

    // for(let x=0;x<savedTasks.length;x++){
    //     allTasks.push(savedTasks[x]);
    // }
    
    // for(let x=0;x<allTasks.length;x++){
    //     console.log(allTasks[x]);
    // }
}

loadDataFromLocalStorage();


add.addEventListener('click', function (e) {
    if (addModal) {
        addTask.style.display = "flex";
        textArea.focus();
    }
    else
        addTask.style.display = "none";
    addModal = !addModal;
})

let pColor = "red";
let prioritySelector = document.querySelector(".priority-color-cont");

prioritySelector.addEventListener('click', function (e) {
    if (e.target.classList[0] != 'priority-color-cont') {
        let allBtns = document.querySelectorAll(".priority-color");

        for (let i = 0; i < allBtns.length; i++) {
            if (allBtns[i].classList.contains("active")) allBtns[i].classList.remove("active");
        }
        pColor = (e.target.classList[1]);
        e.target.classList.add("active");
        textArea.focus();
    }
})

textArea.addEventListener('keydown', function (e) {
    let key = e.key;

    if (key === 'Enter') {
        if (textArea.value == "") {
            alert("please enter some task");
            return;
        }
        generateTicket(textArea.value)
        textArea.value = "";
        addModal = true;
        addTask.style.display = "none";
    }
})

function generateTicket(task) {
    let ticketCont = document.createElement("div");
    ticketCont.className = "ticket-cont";
    let ID;
    // if(id){
    //     ID=id;
    // }
    // else{
    //     var uid = new ShortUniqueId();
    //     ID = "#" + uid.rnd();
    // }
    var uid = new ShortUniqueId();
    ID = "#" + uid.rnd();
    
    ticketCont.innerHTML = `<div class="ticket-color ${pColor}"></div>
                                <div class="ticket-id">${ID}</div>
                                <div class="ticket-area contenteditable='true'">${task}</div>
                                <div class="lock-unlock"><i class="fa-solid fa-lock"></i></div>`
    mainBody.append(ticketCont);

    allTasks.push({id:ID,color:pColor,task:task});
    

    let colorArray = ["red", "blue", "green", "pink"];
    let taskBoxesHeaders = ticketCont.querySelectorAll(".ticket-color");

    for (let k = 0; k < taskBoxesHeaders.length; k++) {
        taskBoxesHeaders[k].addEventListener('click', function () {

            let indexOfTicketColor = colorArray.indexOf(taskBoxesHeaders[k].classList[1]);

            let oldClass = taskBoxesHeaders[k].classList[1];
            let newClass = colorArray[(indexOfTicketColor + 1) % 4];
            taskBoxesHeaders[k].classList.replace(oldClass, newClass);
        })
    }



    let lockBtn = ticketCont.querySelector(".lock-unlock i");
    lockBtn.addEventListener('click', function () {
        let lockBtnClass = lockBtn.classList[1];
        let taskInputArea = ticketCont.querySelector(".ticket-area");
        if (lockBtnClass == "fa-lock-open") {
            lockBtn.classList.replace("fa-lock-open", "fa-lock");
            taskInputArea.contentEditable = 'false';
        }
        else {
            lockBtn.classList.replace("fa-lock", "fa-lock-open");
            taskInputArea.contentEditable = 'true';
        }
    })

    ticketCont.addEventListener('click', function () {
        if (isDeleteActive) ticketCont.remove();
    })

    allFilterColor.addEventListener('click',function(e){
        if(e.target.classList[0]=="color"){
            let filteredColor = e.target.classList[1];

            for(let j=0;j<taskBoxesHeaders.length;j++){
                taskBoxesHeaders[j].parentElement.style.display="block";
            }

            for(let j=0;j<taskBoxesHeaders.length;j++){
                if(taskBoxesHeaders[j].classList[1]!=filteredColor){
                    taskBoxesHeaders[j].parentElement.style.display="none";
                }
            }
        }
        else{
            for(let j=0;j<taskBoxesHeaders.length;j++){
                taskBoxesHeaders[j].parentElement.style.display="block";
            }
        }
    })
}

removeBtn.addEventListener('click', function () {
    if (isDeleteActive) {
        isDeleteActive = false;
        removeBtn.style.color = "black";
    }
    else {
        isDeleteActive = true;
        removeBtn.style.color = "red";
    }
})

window.addEventListener('beforeunload', function() {
    localStorage.setItem("tasks",JSON.stringify(allTasks));
});













